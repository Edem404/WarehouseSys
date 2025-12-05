#include "WarehouseSys/services/inventory_transaction_service.h"

InventoryTransaction InventoryTransactionService::create(InventoryTransaction& transaction)
{
    auto map_data = transaction.as_map();

    int product_id = std::get<int>(map_data.at("product_id"));
    int quantity_change = std::get<int>(map_data.at("quantity_change"));

    _product_service->update_quantity_atomic(product_id, quantity_change);

    return BaseService<InventoryTransaction>::create(transaction);
}