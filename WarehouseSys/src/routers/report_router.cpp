#include "WarehouseSys/routers/report_router.h"

void ReportRouter::register_routes(crow::App<crow::CORSHandler>& app) {

    app.route_dynamic("/reports/create").methods("POST"_method)
        ([this](const crow::request& req) {

        json request_body;

        try {
            request_body = json::parse(req.body);
        }
        catch (std::exception& e) {
            json err = { {"error", "Invalid JSON format: " + std::string(e.what())} };
            return crow::response(400, err.dump(4));
        }

        try {
            std::string html =
                _report_controller->generate_report_for_single_product(request_body);

            crow::response res;
            res.code = 200;
            res.set_header("Content-Type", "text/html; charset=utf-8");
            res.write(html);
            return res;
        }
        catch (const std::exception& ex) {
            json err = { {"error", ex.what()} };
            return crow::response(500, err.dump(4));
        }
            });
}