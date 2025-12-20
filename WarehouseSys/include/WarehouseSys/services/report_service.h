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
#include "reports/report_objects/act_report.h"
#include "reports/report_objects/financial_report.h"
#include "reports/report_objects/product_dynamic_report.h"
#include "reports/report_objects/warehouse_state_report.h"
#include "reports/report_objects/report_template_registry.h"
#include "reports/i_formatter.h"
#include "reports/html_formatter.h"
#include "reports/default_formatter_factory.h"
#include "WarehouseSys/models/document_data.h"

struct DocumentQuery {
    std::optional<int> responsible_employee_id;
    std::optional<int> category_id;
    std::optional<int> invoice_id;
    std::optional<std::vector<int>> transaction_ids;
    std::optional<int> product_id;
    std::optional<std::string> date_from;
    std::optional<std::string> date_to;
};

class ReportService {
private:
    std::shared_ptr<InventoryTransactionRepository> _transaction_repository;
    std::shared_ptr<ProductRepository> _product_repository;
    std::shared_ptr<SupplierRepository> _supplier_repository;
    std::shared_ptr<EmployeeRepository> _employee_repository;

    std::shared_ptr<IFormatterFactory> _formatter_factory;
    std::shared_ptr<ReportTemplateRegistry> _report_template_registry;

    std::shared_ptr<IFormatter> create_formatter(ReportFormat format);
    IReportTemplate& resolve_template(ReportType type);

    DocumentData prepare_document_data(int transaction_id);

public:
    ReportService(
        std::shared_ptr<IRepository<InventoryTransaction>> trans_repo_iface,
        std::shared_ptr<IRepository<Product>> prod_repo_iface,
        std::shared_ptr<IRepository<Supplier>> sup_repo_iface,
        std::shared_ptr<IRepository<Employee>> emp_repo_iface,
        std::shared_ptr<IFormatterFactory> formatter_factory,
        std::shared_ptr<ReportTemplateRegistry> report_template_registry
    )
        : _formatter_factory(std::move(formatter_factory))
        , _report_template_registry(std::move(report_template_registry))
    {
        _transaction_repository = std::dynamic_pointer_cast<InventoryTransactionRepository>(trans_repo_iface);
        _product_repository = std::dynamic_pointer_cast<ProductRepository>(prod_repo_iface);
        _supplier_repository = std::dynamic_pointer_cast<SupplierRepository>(sup_repo_iface);
        _employee_repository = std::dynamic_pointer_cast<EmployeeRepository>(emp_repo_iface);

        if (!_transaction_repository ||
            !_product_repository ||
            !_supplier_repository ||
            !_employee_repository)
        {
            throw std::runtime_error(
                "ReportService: provided repositories have wrong type"
            );
        }

        if (!_formatter_factory) {
            throw std::runtime_error(
                "ReportService: formatter factory must not be null"
            );
        }

        if (!_report_template_registry) {
            throw std::runtime_error(
                "ReportService: report template factory must not be null"
            );
        }
    }

    std::string generate_report_for_single_product(ReportType type, ReportFormat format, int transaction_id);
    std::string generate_financial_report(ReportType type, ReportFormat format, const DocumentQuery& query);
    std::string generate_dynamic_report(ReportType type, ReportFormat format, const DocumentQuery& query);
    std::string generate_warehouse_state_report(ReportType type, ReportFormat format, const DocumentQuery& query);
};