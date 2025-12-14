#pragma once

#include <memory>
#include <string>
#include "WarehouseSys/controllers/base_controller.h"
#include "WarehouseSys/services/report_service.h"
#include "WarehouseSys/models/document_enum_metadata.h"

class ReportController {
private:
	std::shared_ptr<ReportService> _report_service;

public:
	explicit ReportController(std::shared_ptr<ReportService> report_service)
		: _report_service(std::move(report_service)) {
	}

	std::string generate_report_for_single_product(json document_generation_params);
	std::string generate_financial_report(json document_generation_params);
	std::string generate_dynamic_report(json document_generation_params);
};