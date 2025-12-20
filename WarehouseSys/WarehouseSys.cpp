#include "WarehouseSys.h"

using json = nlohmann::json;

int main()
{
    auto dispatcher = std::make_shared<StockEventDispatcher>();

    std::shared_ptr<IRouter<EmployeePosition>> employee_position_router;
    std::shared_ptr<IRouter<Employee>> employee_router;
    std::shared_ptr<IRouter<EmployeeAccount>> employee_account_router;
    std::shared_ptr<IRouter<ProductType>> product_type_router;
    std::shared_ptr<IRouter<Product>> product_router;
    std::shared_ptr<IRouter<Supplier>> supplier_router;
    std::shared_ptr<IRouter<InventoryTransactionType>> inventory_transaction_type_router;
    std::shared_ptr<IRouter<InventoryTransaction>> inventory_transaction_router;
    std::shared_ptr<InvoiceRouter> invoice_router;
    std::shared_ptr<ReportRouter> report_router;

    json config = [&]() {
        std::ifstream file(std::string(CONFIGS_DIR) + "/db_config.json");
        if (!file.is_open())
            throw std::runtime_error("Cannot open configuration file");
        std::stringstream buffer;
        buffer << file.rdbuf();
        return json::parse(buffer.str());
        }();

    const std::string user = config["username"];
    const std::string password = config["password"];
    const std::string dbname = config["database_name"];
    const std::string host = config["host"];

    try
    {   
        // minor checks
        soci::session sys_sql(soci::postgresql,
            "host=" + host + " dbname=postgres user=" + user + " password=" + password);

        int count = 0;
        sys_sql << "SELECT COUNT(*) FROM pg_database WHERE datname=:dbname",
            soci::use(dbname), soci::into(count);

        if (count == 0)
        {
            std::cout << "Database " << dbname << " does not exist. Creating..." << std::endl;
            sys_sql << "CREATE DATABASE " + dbname;
            std::cout << "Database " << dbname << " successfully created." << std::endl;
        }
        else
        {
            std::cout << "Database " << dbname << " already exists." << std::endl;
        }

        std::string connection_string = "host=" + host + " dbname=" + dbname + " user=" + user + " password=" + password;
        soci::session sql(soci::postgresql,
            connection_string);

        // db session adapter
        std::shared_ptr<IDBSession> db_session = std::make_shared<SociSession>(sql, connection_string);

        std::cout << "Connected to " << dbname << " successfully!" << std::endl;

        // --- Crow server ---
        crow::App<crow::CORSHandler> app;

        // /count
        CROW_ROUTE(app, "/count").methods("GET"_method)
            ([db_session]() {
            json result;
            try {
                int table_count = 0;

                db_session->fetch("SELECT COUNT(*) AS cnt FROM test_table",
                    [&table_count](const IDBRow& row) {
                        if (auto val = row.get<int>("cnt")) table_count = *val;
                    });

                result["row_count"] = table_count;
            }
            catch (const std::exception& e) {
                result["error"] = e.what();
            }
            return crow::response(result.dump(4));
                });

        // /all
        CROW_ROUTE(app, "/all").methods("GET"_method)
            ([db_session]() {
            json result = json::array();

            try {
                db_session->fetch("SELECT * FROM test_table",
                    [&result](const IDBRow& row) {
                        json record; 

                        // requested columns
                        if (auto val = row.get<int>("id")) record["id"] = *val;
                        if (auto val = row.get<std::string>("name")) record["name"] = *val;

                        result.push_back(std::move(record));
                    });
            }
            catch (const std::exception& e) {
                json err;
                err["error"] = e.what();
                return crow::response(500, err.dump());
            }

            return crow::response(result.dump(4));
        });

        static InvoiceReport invoice_report;
        static ActReport act_report;
        static FinancialReport financial_report;
        static ProductDynamicReport dynamic_report;
        static WarehouseStateReport warehouse_state_report;

        auto report_template_registry = std::make_shared<ReportTemplateRegistry>();
        report_template_registry->register_template(ReportType::INVOICE, invoice_report);
        report_template_registry->register_template(ReportType::ACT, act_report);
        report_template_registry->register_template(ReportType::FINANCIAL_REPORT, financial_report);
        report_template_registry->register_template(ReportType::PRODUCT_MOVE_DYNAMIC, dynamic_report);
        report_template_registry->register_template(ReportType::WAREHOUSE_STATE, warehouse_state_report);

        auto formatter_factory = std::make_shared<DefaultFormatterFactory>();
        formatter_factory->register_formatter(
            ReportFormat::HTML,
            []() {
                return std::make_shared<HTMLFormatter>();
            }
        );

        //repositories
        std::shared_ptr<IRepository<EmployeePosition>> employee_position_repo =
            std::make_shared<EmployeePositionRepository>(db_session);
        std::shared_ptr<IRepository<Employee>> employee_repo =
            std::make_shared<EmployeeRepository>(db_session);
        std::shared_ptr<IRepository<EmployeeAccount>> employee_account_repo =
            std::make_shared<EmployeeAccountRepository>(db_session);
        std::shared_ptr<IRepository<ProductType>> product_type_repo =
            std::make_shared<ProductTypeRepository>(db_session);
        std::shared_ptr<ProductRepository> product_repo =
            std::make_shared<ProductRepository>(db_session);
        std::shared_ptr<IRepository<Supplier>> supplier_repo =
            std::make_shared<SupplierRepository>(db_session);
        std::shared_ptr<IRepository<InventoryTransactionType>> inventory_transaction_type_repo =
            std::make_shared<InventoryTransactionTypeRepository>(db_session);
        std::shared_ptr<IRepository<InventoryTransaction>> inventory_transaction_repo =
            std::make_shared<InventoryTransactionRepository>(db_session);

        //services
        std::shared_ptr<IService<EmployeePosition>> employee_position_service =
            std::make_shared<BaseService<EmployeePosition>>(employee_position_repo);
        std::shared_ptr<IService<Employee>> employee_service =
            std::make_shared<BaseService<Employee>>(employee_repo);
        std::shared_ptr<IService<EmployeeAccount>> employee_account_service =
            std::make_shared<BaseService<EmployeeAccount>>(employee_account_repo);
        std::shared_ptr<IService<ProductType>> product_type_service =
            std::make_shared<BaseService<ProductType>>(product_type_repo);
        std::shared_ptr<ProductService> product_service =
            std::make_shared<ProductService>(product_repo, dispatcher);
        std::shared_ptr<IService<Supplier>> supplier_service =
            std::make_shared<BaseService<Supplier>>(supplier_repo);
        std::shared_ptr<IService<InventoryTransactionType>> inventory_transaction_type_service =
            std::make_shared<BaseService<InventoryTransactionType>>(inventory_transaction_type_repo);
        std::shared_ptr<IService<InventoryTransaction>> inventory_transaction_service =
            std::make_shared<InventoryTransactionService>(inventory_transaction_repo, product_service);
        std::shared_ptr<ReportService> report_service =
            std::make_shared<ReportService>(inventory_transaction_repo, product_repo, supplier_repo, employee_repo, formatter_factory, report_template_registry);

        //controllers
        std::shared_ptr<IController<EmployeePosition>> employee_position_controller =
            std::make_shared<EmployeePositionController>(employee_position_service);
        std::shared_ptr<IController<Employee>> employee_controller =
            std::make_shared<EmployeeController>(employee_service);
        std::shared_ptr<IController<EmployeeAccount>> employee_account_controller =
            std::make_shared<EmployeeAccountController>(employee_account_service);
        std::shared_ptr<IController<ProductType>> product_type_controller =
            std::make_shared<ProductTypeController>(product_type_service);
        std::shared_ptr<IController<Product>> product_controller =
            std::make_shared<ProductController>(product_service);
        std::shared_ptr<IController<Supplier>> supplier_controller =
            std::make_shared<SupplierController>(supplier_service);
        std::shared_ptr<IController<InventoryTransactionType>> inventory_transaction_type_controller =
            std::make_shared<InventoryTransactionTypeController>(inventory_transaction_type_service);
        std::shared_ptr<IController<InventoryTransaction>> inventory_transaction_controller =
            std::make_shared<InventoryTransactionController>(inventory_transaction_service);
        std::shared_ptr<InvoiceController> invoice_controller =
            std::make_shared<InvoiceController>(report_service);
        std::shared_ptr<ReportController> report_controller =
            std::make_shared<ReportController>(report_service);
          

        auto stock_logger = std::make_shared<LoggingStockObserver>();
        dispatcher->subscribe(stock_logger);

        //routers
        employee_position_router =
            std::make_shared<EmployeePositionRouter>(employee_position_controller);
        employee_router =
            std::make_shared<EmployeeRouter>(employee_controller);
        employee_account_router =
            std::make_shared<EmployeeAccountRouter>(employee_account_controller);
        product_type_router =
            std::make_shared<ProductTypeRouter>(product_type_controller);
        product_router =
            std::make_shared<ProductRouter>(product_controller);
        supplier_router =
            std::make_shared<SupplierRouter>(supplier_controller);
        inventory_transaction_type_router =
            std::make_shared<InventoryTransactionTypeRouter>(inventory_transaction_type_controller);
        inventory_transaction_router =
            std::make_shared<InventoryTransactionRouter>(inventory_transaction_controller);
        invoice_router = 
            std::make_shared<InvoiceRouter>(invoice_controller);
        report_router = std::make_shared<ReportRouter>(report_controller);

        employee_position_router->register_routes(app);
        employee_router->register_routes(app);
        employee_account_router->register_routes(app);
        product_type_router->register_routes(app);
        product_router->register_routes(app);
        supplier_router->register_routes(app);
        inventory_transaction_type_router->register_routes(app);
        inventory_transaction_router->register_routes(app);
        invoice_router->register_routes(app);
        report_router->register_routes(app);

        // run server on port 8080
        app.port(8080).multithreaded().run();
    }
    catch (const std::exception& e)
    {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}