#include "WarehouseSys/controllers/inventory_transaction_controller.h"

std::pair<int, json> InventoryTransactionController::create_with_notification(json item_as_json) {
    try {
        InventoryTransaction transaction;
        transaction.from_json(item_as_json);

        nlohmann::json result_json = _inventory_service->create_with_notification(transaction);

        return { 200, result_json };
    }
    catch (const std::exception& e) {
        nlohmann::json err = { {"error", e.what()} };
        return { 500, err };
    }
}