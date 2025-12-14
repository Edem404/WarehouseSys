#include "WarehouseSys\controllers\report_controller.h"

std::string ReportController::generate_report_for_single_product(json document_generation_params) {
    if (!document_generation_params.contains("transaction_id"))
        throw std::runtime_error("Missing required field: transaction_id");
    if (!document_generation_params.contains("report_type"))
        throw std::runtime_error("Missing required field: report_type");
    if (!document_generation_params.contains("report_format"))
        throw std::runtime_error("Missing required field: report_format");

    const int transaction_id =
        document_generation_params.at("transaction_id").get<int>();

    const std::string type_str =
        document_generation_params.at("report_type").get<std::string>();

    const std::string format_str =
        document_generation_params.at("report_format").get<std::string>();

    const ReportType report_type = parse_report_type(type_str);
    const ReportFormat report_format = parse_report_format(format_str);

    return _report_service->generate_report_for_single_product(report_type, report_format, transaction_id);
}

std::string ReportController::generate_financial_report(json document_generation_params)
{   
    if (!document_generation_params.contains("responsible_employee_id"))
        throw std::runtime_error("Missing required field: responsible_employee_id");

    DocumentQuery report_param_query;

    report_param_query.responsible_employee_id = document_generation_params.at("responsible_employee_id").get<int>();
    
    const std::string type_str =
        document_generation_params.at("report_type").get<std::string>();

    const std::string format_str =
        document_generation_params.at("report_format").get<std::string>();

    const ReportType report_type = parse_report_type(type_str);
    const ReportFormat report_format = parse_report_format(format_str);

    return _report_service->generate_financial_report(report_type, report_format, report_param_query);
}

std::string ReportController::generate_dynamic_report(json document_generation_params)
{
    if (!document_generation_params.contains("product_id"))
        throw std::runtime_error("Missing required field: product_id");
    if (!document_generation_params.contains("date_from"))
        throw std::runtime_error("Missing required field: date_from");
    if (!document_generation_params.contains("date_to"))
        throw std::runtime_error("Missing required field: date_to");
    if (!document_generation_params.contains("report_type"))
        throw std::runtime_error("Missing required field: report_type");
    if (!document_generation_params.contains("report_format"))
        throw std::runtime_error("Missing required field: report_format");

    DocumentQuery report_param_query;

    report_param_query.product_id =
        document_generation_params.at("product_id").get<int>();
    report_param_query.date_from =
        document_generation_params.at("date_from").get<std::string>();
    report_param_query.date_to =
        document_generation_params.at("date_to").get<std::string>();
    const std::string type_str =
        document_generation_params.at("report_type").get<std::string>();
    const std::string format_str =
        document_generation_params.at("report_format").get<std::string>();

    const ReportType report_type = parse_report_type(type_str);
    const ReportFormat report_format = parse_report_format(format_str);

    return _report_service->generate_dynamic_report(report_type, report_format, report_param_query);
}
