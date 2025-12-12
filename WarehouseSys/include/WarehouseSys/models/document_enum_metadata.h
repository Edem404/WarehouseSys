#pragma once
#include <string>
#include <algorithm>
#include <stdexcept>

enum class ReportType {
    INVOICE,
    ACT,
    PRODUCT_MOVE_DYNAMIC,
    FINANCIAL_REPORT,
    WAREHOUSE_STATE
};

enum class ReportFormat {
    HTML,
    TEXT
};

inline ReportType parse_report_type(const std::string& value) {
    std::string v = value;
    std::transform(v.begin(), v.end(), v.begin(), ::tolower);

    if (v == "invoice") return ReportType::INVOICE;
    if (v == "act") return ReportType::ACT;
    if (v == "product_move_dynamic") return ReportType::PRODUCT_MOVE_DYNAMIC;
    if (v == "financial_report") return ReportType::FINANCIAL_REPORT;
    if (v == "warehouse_state") return ReportType::WAREHOUSE_STATE;

    throw std::invalid_argument("Unknown report_type: " + value);
}

inline ReportFormat parse_report_format(const std::string& value) {
    std::string v = value;
    std::transform(v.begin(), v.end(), v.begin(), ::tolower);

    if (v == "html") return ReportFormat::HTML;
    if (v == "text") return ReportFormat::TEXT;

    throw std::invalid_argument("Unknown report_format: " + value);
}