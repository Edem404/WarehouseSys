#include "WarehouseSys/routers/employee_account_router.h"

void EmployeeAccountRouter::register_routes(crow::App<crow::CORSHandler>& app) {
    BaseRouter<EmployeeAccount>::register_routes(app);

    model_register_routes(app);
}

void EmployeeAccountRouter::model_register_routes(crow::App<crow::CORSHandler>& app) {
    auto controller = _specific_controller;

    if (!controller) {
        return; 
    }

    app.route_dynamic(_base_path + "/login").methods("POST"_method)
        ([controller](const crow::request& req) {
        json request_body;

        try {
            request_body = json::parse(req.body);
        }
        catch (std::exception& e) {
            json err = { {"error", "Invalid JSON format: " + std::string(e.what())} };
            return crow::response(400, err.dump(4));
        }

        if (!request_body.contains("email") || !request_body.contains("password")) {
            json err = { {"message", "Email and password are required"} };
            return crow::response(400, err.dump(4));
        }

        std::string email = request_body["email"];
        std::string password = request_body["password"];

        auto [code, response_body] = controller->login(email, password);

        return crow::response(code, response_body.dump(4));
            });
}