#include "WarehouseSys/controllers/invoice_controller.h"

std::string InvoiceController::generate_invoice(int transaction_id) {
    try {
        return _report_service->generate_report_for_single_product(
            ReportType::INVOICE,
            ReportFormat::HTML,
            transaction_id
        );
    }
    catch (const std::exception& ex) {
        return std::string("Invoice generation error: ") + ex.what();
    }
}