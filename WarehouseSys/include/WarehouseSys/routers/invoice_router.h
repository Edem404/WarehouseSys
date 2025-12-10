#pragma once

#include "base_router.h"
#include "WarehouseSys/models/document_data.h"
#include "WarehouseSys/models/document_enum_metadata.h"
#include "WarehouseSys/controllers/invoice_controller.h"
#include <crow.h>

class InvoiceRouter {
private:
    std::shared_ptr<InvoiceController> invoice_controller_;

public:
    explicit InvoiceRouter(std::shared_ptr<InvoiceController> controller)
        : invoice_controller_(std::move(controller)) {
    }

    void register_routes(crow::App<crow::CORSHandler>& app);
};