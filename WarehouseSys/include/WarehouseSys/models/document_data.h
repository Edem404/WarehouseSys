#pragma once

#include <vector>
#include "i_dto.h"
#include "models/product.h"
#include "models/inventory_transaction.h"
#include "models/supplier.h"
#include "models/employee.h"

class DocumentData : public IDTO {
private:
    std::string document_title;
    std::string generated_date;
    std::optional<Employee> responsible_employee;

    std::vector<Product> products;
    std::vector<InventoryTransaction> transactions;

public:
    void set_title(const std::string& title) { document_title = title; }
    void set_generated_date(const std::string& d) { generated_date = d; }
    void set_employee(const Employee& e) { responsible_employee = e; }

    const std::string& get_title() const { return document_title; }
    const std::string& get_generated_date() const { return generated_date; }
    const std::optional<Employee>& get_employee() const { return responsible_employee; }

    void add_product(const Product& p) { products.push_back(p); }
    void add_transaction(const InventoryTransaction& t) { transactions.push_back(t); }

    const std::vector<Product>& get_products() const { return products; }
    const std::vector<InventoryTransaction>& get_transactions() const { return transactions; }
    const Product* find_product_by_id(int id) const {
        auto it = std::find_if(products.begin(), products.end(), [id](const Product& p){
            return p.get_id() == id;
        });
        if (it != products.end()) return &(*it);
        return nullptr;
    }

    void from_db_row(const IDBRow& row) override {}
    nlohmann::json to_json() const override { return {}; }
    void from_json(nlohmann::json json_data) override {}
    std::map<std::string, DBValue> as_map() const override { return {}; }
};
