#include "WarehouseSys/services/reports/report_objects/act_report.h"

void ActReport::set_title(DocumentData& data) {
    data.set_title("Act");
}

void ActReport::compose_body(std::shared_ptr<IFormatter> formatter, DocumentData& data) {
    // TODO: Add supplier info into invoice document

    std::vector<std::string> headers = { "ID", "Product", "Article", "Count", "Price", "Sum" };
    std::vector<std::vector<std::string>> rows;

    for (const auto& t : data.get_transactions()) {
        std::vector<std::string> row;
        const Product* p = data.find_product_by_id(t.get_product_id());

        row.push_back(std::to_string(t.get_id()));

        if (p) {
            row.push_back(p->get_name());
            row.push_back(p->get_article());

            int qty = std::abs(t.get_quantity_change());
            double sum = qty * p->get_price();

            row.push_back(std::to_string(qty));
            row.push_back(std::to_string(p->get_price()));
            row.push_back(std::to_string(-sum));
        }
        else {
            row.push_back("Deleted Product");
            row.push_back("-");
            row.push_back("-");
            row.push_back("-");
            row.push_back("-");
        }
        rows.push_back(row);
    }

    formatter->add_table(headers, rows);
}
