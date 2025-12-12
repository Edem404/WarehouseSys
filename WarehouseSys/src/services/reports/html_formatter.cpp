#include "WarehouseSys/services/reports/html_formatter.h"

void HTMLFormatter::start_document() {
    ss.str("");
    ss << "<html><head><style>"
        << "body{font-family:Arial; padding:20px;}"
        << "table{border-collapse:collapse; width:100%; margin-top:15px;}"
        << "th,td{border:1px solid #333; padding:8px; text-align:left;}"
        << "th{background-color:#f4f4f4;}"
        << ".header{display:flex; justify-content:space-between; align-items:center;}"
        << ".footer{margin-top:30px; text-align:right;}"
        << "</style></head><body>";
}

void HTMLFormatter::end_document() {
    ss << "</body></html>";
}

void HTMLFormatter::add_header(const std::string& title, const std::string& date) {
    ss << "<div class='header'>";
    ss << "<h1>" << title << "</h1>";
    ss << "<p>Date: <b>" << date << "</b></p>";
    ss << "</div><hr/>";
}

void HTMLFormatter::add_paragraph(const std::string& text) {
    ss << "<p>" << text << "</p>";
}

void HTMLFormatter::add_table(const std::vector<std::string>& headers,
    const std::vector<std::vector<std::string>>& rows) {

    ss << "<table><thead><tr>";
    for (const auto& h : headers) ss << "<th>" << h << "</th>";
    ss << "</tr></thead><tbody>";

    for (const auto& row : rows) {
        ss << "<tr>";
        for (const auto& cell : row) {

            std::string formatted = cell;

            if (cell.find('.') != std::string::npos || cell.find(',') != std::string::npos) {

                std::istringstream iss(cell);
                double number;

                if (iss >> number) {
                    std::ostringstream tmp;
                    tmp << std::fixed << std::setprecision(2) << number;
                    formatted = tmp.str();
                }
            }

            ss << "<td>" << formatted << "</td>";
        }
        ss << "</tr>";
    }
    ss << "</tbody></table>";
}

void HTMLFormatter::add_footer(const std::string& employee_sign) {
    ss << "<p>Sign: ________________ (" << employee_sign << ")</p>";
}

std::string HTMLFormatter::get_result() {
    return ss.str();
}