#pragma once

#include <memory>
#include <string>
#include "WarehouseSys/services/report_service.h"
#include "WarehouseSys/models/document_enum_metadata.h"

//temprorary class to test document generation
class InvoiceController {
private:
    std::shared_ptr<ReportService> _report_service;

public:
    explicit InvoiceController(std::shared_ptr<ReportService> report_service)
        : _report_service(std::move(report_service)) {
    }

    std::string generate_invoice(int transaction_id);
};
