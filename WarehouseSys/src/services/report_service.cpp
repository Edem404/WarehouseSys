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
    if (format == ReportFormat::HTML) {
        return std::make_shared<HTMLFormatter>();
    }

    throw std::runtime_error("Unsuportable file format");
}

IReportTemplate& ReportService::resolve_template(ReportType type) {
    if (type == ReportType::INVOICE) {
        static InvoiceReport invoice_template;
        return invoice_template;
    }
    else if (type == ReportType::ACT) {
        static ActReport act_template;
        return act_template;
    }
    else if (type == ReportType::FINANCIAL_REPORT) {
        static FinancialReport financial_template;
        return financial_template;
    }

    throw std::runtime_error("Unsuportable report type");
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

std::string ReportService::generate_report_for_multi_product(ReportType type, ReportFormat format, const DocumentQuery& query) {
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