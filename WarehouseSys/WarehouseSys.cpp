#include "WarehouseSys.h"


using json = nlohmann::json;

//struct CORS {
//    struct context {};
//
//    void before_handle(crow::request& req, crow::response& res, context&) {
//        // CORS headers for all responses
//        if (req.method == crow::HTTPMethod::OPTIONS) {
//            res.add_header("Access-Control-Allow-Origin", "http://localhost:5173");
//            res.add_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//            res.add_header("Access-Control-Allow-Headers", "Content-Type");
//            res.end();
//        }
//    }
//
//    void after_handle(crow::request&, crow::response& res, context&) {
//        // CORS headers for all responses
//        res.add_header("Access-Control-Allow-Origin", "http://localhost:5173");
//        res.add_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//        res.add_header("Access-Control-Allow-Headers", "Content-Type");
//    }
//};

int main()
{
    std::shared_ptr<IRouter<EmployeePosition>> employee_router;

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

        soci::session sql(soci::postgresql,
            "host=" + host + " dbname=" + dbname + " user=" + user + " password=" + password);

        // db session adapter
        std::shared_ptr<IDBSession> db_session = std::make_shared<SociSession>(sql);

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

        std::shared_ptr<IRepository<EmployeePosition>> repo =
            std::make_shared<EmployeePositionRepository>(db_session);

        std::shared_ptr<IService<EmployeePosition>> service =
            std::make_shared<BaseService<EmployeePosition>>(repo);

        std::shared_ptr<IController<EmployeePosition>> controller =
            std::make_shared<EmployeePositionController>(service);

        employee_router =
            std::make_shared<EmployeePositionRouter>(controller);

        employee_router->register_routes(app);
        // Запуск сервера на порті 8080
        app.port(8080).multithreaded().run();
    }
    catch (const std::exception& e)
    {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}