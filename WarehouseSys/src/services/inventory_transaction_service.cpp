#include "WarehouseSys/services/inventory_transaction_service.h"

InventoryTransaction InventoryTransactionService::create(InventoryTransaction& transaction)
{
    auto map_data = transaction.as_map();

    int product_id = std::get<int>(map_data.at("product_id"));
    int quantity_change = std::get<int>(map_data.at("quantity_change"));

    _product_service->update_quantity_atomic(product_id, quantity_change);

    return BaseService<InventoryTransaction>::create(transaction);
}

nlohmann::json InventoryTransactionService::create_with_notification(InventoryTransaction& transaction) {
    auto map_data = transaction.as_map();
    auto created = BaseService<InventoryTransaction>::create(transaction);

    int product_id = std::get<int>(map_data.at("product_id"));
    int quantity_change = std::get<int>(map_data.at("quantity_change"));

    auto notification = _product_service->update_quantity_atomic(product_id, quantity_change);

    nlohmann::json result = created.to_json();
    if (notification.has_value()) {
        result["stock_notification"] = {
            {"type", "low_stock"},
            {"product_id", product_id},
            {"quantity_change", quantity_change}
        };
    }

    return result;
}
