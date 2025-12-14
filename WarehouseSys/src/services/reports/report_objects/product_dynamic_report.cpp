#include "WarehouseSys/services/reports/report_objects/product_dynamic_report.h"

void ProductDynamicReport::set_title(DocumentData& data) {
	data.set_title("Product Movement Dynamic");
}

void ProductDynamicReport::compose_body(std::shared_ptr<IFormatter> formatter, DocumentData& data) {
	std::vector<std::string> headers = { "Date", "Product", "Quantity Change", "Quantity After", "Employee" };
	std::vector<std::vector<std::string>> rows;

    for (const auto& t : data.get_transactions()) {
        std::vector<std::string> row;

        row.push_back(t.get_timestamp_as_str());

        const Product* p = data.find_product_by_id(t.get_product_id());
        if (p) {
            row.push_back(p->get_name());
        }
        else {
            row.push_back("Deleted product");
        }

        row.push_back(std::to_string(t.get_quantity_change()));

        row.push_back(std::to_string(t.get_quantity_after()));

        if (t.get_employee_id()) {
            row.push_back("Employee #" + std::to_string(t.get_employee_id()));
        }
        else {
            row.push_back("-");
        }

        rows.push_back(std::move(row));
    }

    formatter->add_table(headers, rows);
}
