#include "WarehouseSys/services/reports/report_objects/warehouse_state_report.h"

void WarehouseStateReport::set_title(DocumentData& data) {
	data.set_title("Warehouse State");
}

void WarehouseStateReport::compose_body(std::shared_ptr<IFormatter> formatter, DocumentData& data) {
	std::vector<std::string> headers = { "ID", "Product", "Article", "Quantity", "Price", "Sum" };
    std::vector<std::vector<std::string>> rows;

    const auto& transactions = data.get_transactions();

    for (const auto& product : data.get_products()) {

        int quantity = product.get_quantity();

        auto it = std::find_if(
            transactions.begin(),
            transactions.end(),
            [&](const InventoryTransaction& tx) {
                return tx.get_product_id() == product.get_id();
            }
        );

        if (it != transactions.end()) {
            quantity = it->get_quantity_after();
        }

        double price = product.get_price();
        double total = quantity * price;

        rows.push_back({
            std::to_string(product.get_id()),
            product.get_name(),
            product.get_article(),
            std::to_string(quantity),
            std::to_string(price),
            std::to_string(total)
            });
    }

    formatter->add_table(headers, rows);
}
