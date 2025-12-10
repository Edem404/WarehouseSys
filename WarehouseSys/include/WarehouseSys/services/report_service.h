#pragma once
#include <memory>
#include <string>
#include <stdexcept>

#include "WarehouseSys/models/document_enum_metadata.h"
#include "WarehouseSys/models/inventory_transaction.h"
#include "WarehouseSys/models/product.h"
#include "WarehouseSys/models/supplier.h"
#include "WarehouseSys/models/employee.h"

#include "WarehouseSys/repositories/inventory_transaction_repository.h"
#include "WarehouseSys/repositories/product_repository.h"
#include "WarehouseSys/repositories/supplier_repository.h"
#include "WarehouseSys/repositories/employee_repository.h"

#include "reports/report_objects/i_report_template.h"
#include "reports/report_objects/base_report.h"
#include "reports/report_objects/invoice_report.h"
#include "reports/i_formatter.h"
#include "reports/html_formatter.h"
#include "WarehouseSys/models/document_data.h"

struct DocumentQuery {
    std::optional<int> invoice_id;
    std::optional<std::vector<int>> transaction_ids;
    std::optional<std::string> product_id;
    std::optional<std::string> date_from;
    std::optional<std::string> date_to;
};

class ReportService {
private:
    std::shared_ptr<InventoryTransactionRepository> _transaction_repository;
    std::shared_ptr<ProductRepository> _product_repository;
    std::shared_ptr<SupplierRepository> _supplier_repository;
    std::shared_ptr<EmployeeRepository> _employee_repository;

    std::shared_ptr<IFormatter> create_formatter(ReportFormat format);
    IReportTemplate& resolve_template(ReportType type);

    DocumentData prepare_document_data(int transactionId);

public:
    ReportService(
        std::shared_ptr<InventoryTransactionRepository> transRepo,
        std::shared_ptr<ProductRepository> prodRepo,
        std::shared_ptr<SupplierRepository> supRepo,
        std::shared_ptr<EmployeeRepository> empRepo
    ) : _transaction_repository(transRepo), _product_repository(prodRepo),
        _supplier_repository(supRepo), _employee_repository(empRepo) {
    }

    std::string generate_report_for_single_product(ReportType type, ReportFormat format, int transaction_id);
    std::string generate_report_for_multi_product(ReportType type, ReportFormat format, const DocumentQuery& query);
};