#include "WarehouseSys/services/report_service.h"

inline std::string now_as_string()
{
    using namespace std::chrono;

    auto now = system_clock::now();
    std::time_t tt = system_clock::to_time_t(now);

    std::tm tm{};
#ifdef _WIN32
    localtime_s(&tm, &tt);
#else
    localtime_r(&tt, &tm);
#endif

    std::ostringstream oss;
    oss << std::put_time(&tm, "%Y-%m-%d %H:%M:%S");
    return oss.str();
}

std::shared_ptr<IFormatter> ReportService::create_formatter(ReportFormat format) {
    return _formatter_factory->create(format);
}

IReportTemplate& ReportService::resolve_template(ReportType type) {
    return _report_template_registry->resolve(type);
}

DocumentData ReportService::prepare_document_data(int transaction_id) {
    auto trx_opt = _transaction_repository->get_by_id(transaction_id);
    if (!trx_opt.has_value())
        throw std::runtime_error("Transaction not founded");
    const auto& trx = trx_opt.value();

    auto product_opt = _product_repository->get_by_id(trx.get_product_id());
    if (!product_opt.has_value())
        throw std::runtime_error("Product not founded");

    auto employee_opt = _employee_repository->get_by_id(trx.get_employee_id());
    if (!employee_opt.has_value())
        throw std::runtime_error("Employee not founded");

    std::optional<Supplier> supplier_opt;
    if (trx.get_supplier_id())
        supplier_opt = _supplier_repository->get_by_id(*trx.get_supplier_id());

    DocumentData data;
    data.set_generated_date(trx.get_timestamp_as_str());
    data.add_transaction(trx);
    data.add_product(product_opt.value());
    data.set_employee(employee_opt.value());
    //if (supplier_opt.has_value())
    //    data.set_supplier(supplier_opt.value());

    return data;
}

std::string ReportService::generate_report_for_single_product(ReportType type, ReportFormat format, int transaction_id)
{
    auto formatter = create_formatter(format);
    auto& template_strategy = resolve_template(type);
    auto data = prepare_document_data(transaction_id);

    return template_strategy.generate(formatter, data);
}

std::string ReportService::generate_financial_report(ReportType type, ReportFormat format, const DocumentQuery& query) {
    DocumentData data;
    data.set_generated_date(now_as_string());

    auto employee_opt = _employee_repository->get_by_id(query.responsible_employee_id.value());
    if (!employee_opt.has_value())
        throw std::runtime_error("Employee not founded");

    if (employee_opt.has_value()) {
        data.set_employee(employee_opt.value());
    }

    std::vector<Product> products = _product_repository->get_all();

    for (const auto& product : products) {
        data.add_product(product);
        std::cout << product.to_json() << "\n";
    }

    auto formatter = create_formatter(format);
    auto& template_strategy = resolve_template(type);

    return template_strategy.generate(formatter, data);
}

std::string ReportService::generate_dynamic_report(ReportType type, ReportFormat format, const DocumentQuery& query) {
    if (!query.product_id.has_value()) {
        throw std::runtime_error("product_id is required for dynamic report");
    }

    if (!query.date_from.has_value() || !query.date_to.has_value()) {
        throw std::runtime_error("date_from and date_to are required for dynamic report");
    }

    int product_id = query.product_id.value();
    const std::string& date_from = query.date_from.value();
    const std::string& date_to = query.date_to.value();

    std::vector<InventoryTransaction> transactions =
        _transaction_repository->find_by_product_and_date_range(
            product_id,
            date_from,
            date_to
        );

    if (transactions.empty()) {
        throw std::runtime_error("No transactions found for given parameters");
    }

    auto product_opt = _product_repository->get_by_id(product_id);
    if (!product_opt.has_value()) {
        throw std::runtime_error("Product not found");
    }

    DocumentData data;

    data.set_title("Product movement dynamics report");
    data.set_generated_date(now_as_string());

    data.add_product(product_opt.value());

    for (const auto& t : transactions) {
        data.add_transaction(t);
    }

    if (query.responsible_employee_id.has_value()) {
        auto emp = _employee_repository->get_by_id(
            query.responsible_employee_id.value()
        );

        if (emp.has_value()) {
            data.set_employee(emp.value());
        }
    }

    auto formatter = create_formatter(format);
    auto& template_strategy = resolve_template(type);

    return template_strategy.generate(formatter, data);
}

std::string ReportService::generate_warehouse_state_report(ReportType type, ReportFormat format, const DocumentQuery& query)
{
    if (!query.date_to.has_value()) {
        throw std::runtime_error("Missing required field: date_to");
    }

    DocumentData data;

    data.set_title("Warehouse state report");
    data.set_generated_date(query.date_to.value());

    const std::vector<Product> products = _product_repository->get_all();

    for (const auto& product : products) {
        data.add_product(product);

        std::optional<InventoryTransaction> last_tx =
            _transaction_repository->find_last_before_date(
                product.get_id(),
                query.date_to.value()
            );

        if (last_tx.has_value()) {
            data.add_transaction(last_tx.value());
        }
    }

    auto formatter = create_formatter(format);
    auto& template_strategy = resolve_template(type);

    return template_strategy.generate(formatter, data);
}
