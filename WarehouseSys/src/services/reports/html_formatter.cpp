#include "WarehouseSys/services/reports/html_formatter.h"

void HTMLFormatter::start_document() {
	ss << "<html><head><style>table{border-collapse:collapse;width:100%;} th,td{border:1px solid black;padding:5px;}</style></head><body>";
}

void HTMLFormatter::end_document() {
	ss << "</body></html>";
}

void HTMLFormatter::add_header(const std::string& title) {
	ss << "<div style='display:flex;justify-content:space-between;'>";
	ss << "<h1>" << title << "</h1>";
	ss << "</div><hr/>";
}

void HTMLFormatter::add_paragraph(const std::string& text) {
	ss << "<p>" << text << "</p>";
}

void HTMLFormatter::add_table(std::vector<std::string> headers, std::vector<std::string> rows) {
	ss << "<table><thead><tr>";
	for (const auto& h : headers) ss << "<th>" << h << "</th>";
	ss << "</tr></thead><tbody>";
	for (const auto& row : rows) {
		ss << "<tr>";
		for (const auto& cell : row) ss << "<td>" << cell << "</td>";
		ss << "</tr>";
	}
	ss << "</tbody></table>";
}

void HTMLFormatter::add_footer(std::string employee_sign) {
	ss << "<p>Sign: ________________ (" << employee_sign << ")</p>";
}

std::string HTMLFormatter::get_result() {
	return ss.str();
}
