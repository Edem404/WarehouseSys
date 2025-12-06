#include "routers/inventory_transaction_router.h"
#include "crow/json.h"

void InventoryTransactionRouter::register_routes(crow::App<crow::CORSHandler>& app) {
    BaseRouter<InventoryTransaction>::register_routes(app);

    model_register_routes(app);
}

void InventoryTransactionRouter::model_register_routes(crow::App<crow::CORSHandler>& app) {
    auto controller = _specific_controller;
    if (!controller) {
        return;
    }

    app.route_dynamic(_base_path + "/create_w_notify").methods("POST"_method)
        ([controller](const crow::request& req) {
        nlohmann::json request_body;
        try {
            request_body = nlohmann::json::parse(req.body);
        }
        catch (const std::exception& e) {
            nlohmann::json err = { {"error", "Invalid JSON format: " + std::string(e.what())} };
            return crow::response(400, err.dump(4));
        }

        try {
            auto [code, response_body] = controller->create_with_notification(request_body);
            return crow::response(code, response_body.dump(4));
        }
        catch (const std::exception& e) {
            nlohmann::json err = { {"error", e.what()} };
            return crow::response(500, err.dump(4));
        }
            });
}
