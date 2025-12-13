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

std::string ReportController::generate_report_for_multi_product(json document_generation_params)
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

    return _report_service->generate_report_for_multi_product(report_type, report_format, report_param_query);
}
