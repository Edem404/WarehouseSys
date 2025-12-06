#pragma once

#include "base_router.h"
#include "models/inventory_transaction.h"
#include "controllers/inventory_transaction_controller.h"

class InventoryTransactionRouter : public BaseRouter<InventoryTransaction> {
private:
    std::shared_ptr<InventoryTransactionController> _specific_controller;

public:
    explicit InventoryTransactionRouter(std::shared_ptr<IController<InventoryTransaction>> controller)
        : BaseRouter<InventoryTransaction>(std::move(controller))
    {
        _specific_controller = std::dynamic_pointer_cast<InventoryTransactionController>(_controller);
        if (!_specific_controller) {
            CROW_LOG_ERROR << "InventoryTransactionRouter: Controller is not of type InventoryTransactionController!";
        }
    }

    void register_routes(crow::App<crow::CORSHandler>& app) override;

    void model_register_routes(crow::App<crow::CORSHandler>& app);
};
