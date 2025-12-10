#include "WarehouseSys/services/report_service.h"

std::shared_ptr<IFormatter> ReportService::create_formatter(ReportFormat format) {
    if (format == ReportFormat::HTML) {
        return std::make_shared<HTMLFormatter>();
    }

    throw std::runtime_error("Unsuportable file format");
}

IReportTemplate& ReportService::resolve_template(ReportType type) {
    if (type == ReportType::INVOICE) {
        static InvoiceReport invoiceTemplate;
        return invoiceTemplate;
    }

    throw std::runtime_error("Unsuportable report type");
}

DocumentData ReportService::prepare_document_data(int transactionId) {
    auto trx_opt = _transaction_repository->get_by_id(transactionId);
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
    data.set_title("Invoice");
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
    auto& templateStrategy = resolve_template(type);
    auto data = prepare_document_data(transaction_id);

    return templateStrategy.generate(formatter, data);
}
