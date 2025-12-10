#include "WarehouseSys/routers/invoice_router.h"

void InvoiceRouter::register_routes(crow::App<crow::CORSHandler>& app) {
    CROW_ROUTE(app, "/invoice/create/<int>")
        ([this](int transaction_id) {
        try {
            std::string html = invoice_controller_->generate_invoice(transaction_id);
            crow::response res;
            res.code = 200;
            res.set_header("Content-Type", "text/html; charset=utf-8");
            res.write(html);
            return res;
        }
        catch (const std::exception& ex) {
            crow::response res;
            res.code = 500;
            res.write(std::string("Invoice generation error: ") + ex.what());
            return res;
        }
            });
}