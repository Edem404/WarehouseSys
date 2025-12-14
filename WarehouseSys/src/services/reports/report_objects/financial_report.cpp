#include "WarehouseSys/services/reports/report_objects/financial_report.h"

void FinancialReport::set_title(DocumentData& data) {
	data.set_title("Financial Report");
}

void FinancialReport::compose_body(std::shared_ptr<IFormatter> formatter, DocumentData& data) {
    std::vector<std::string> headers = { "ID", "Product", "Article", "Count", "Price", "Sum" };
    std::vector<std::vector<std::string>> rows;

    double all_products_sum{};
    bool is_product_in_document{};

    for (const auto& p : data.get_products()) {
        std::vector<std::string> row;

        row.push_back(std::to_string(p.get_id()));
        row.push_back(p.get_name());
        row.push_back(p.get_article());

        int qty = p.get_quantity();
        double sum = qty * p.get_price();

        row.push_back(std::to_string(qty));
        row.push_back(std::to_string(p.get_price()));
        row.push_back(std::to_string(sum));
        all_products_sum += sum;
        rows.push_back(row);
    }

    formatter->add_table(headers, rows);
}