#pragma once

#include "base_router.h"
#include "WarehouseSys/models/document_data.h"
#include "WarehouseSys/models/document_enum_metadata.h"
#include "WarehouseSys/controllers/report_controller.h"
#include <crow.h>

class ReportRouter {
private:
	std::shared_ptr<ReportController> _report_controller;

public:
    explicit ReportRouter(std::shared_ptr<ReportController> controller)
        : _report_controller(std::move(controller)) {
    }

    void register_routes(crow::App<crow::CORSHandler>& app);
};