#include "WarehouseSys/models/inventory_transaction.h"

const std::string InventoryTransaction::TABLE_NAME = "inventory_transactions";

namespace {
    inline std::string time_point_to_string(const std::chrono::system_clock::time_point& tp) {
        std::time_t t = std::chrono::system_clock::to_time_t(tp);
        std::tm tm_utc{};
        gmtime_s(&tm_utc, &t); // MSVC, UTC

        char buffer[25];

        std::strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S+00", &tm_utc);
        return std::string(buffer);
    }

    inline std::chrono::system_clock::time_point string_to_time_point(const std::string& s) {
        std::tm tm = {};
        std::istringstream iss(s);
        iss >> std::get_time(&tm, "%Y-%m-%d %H:%M:%S");
        std::time_t t = _mkgmtime(&tm); // UTC
        return std::chrono::system_clock::from_time_t(t);
    }
}

void InventoryTransaction::from_db_row(const IDBRow& row) {
    if (auto val = row.get<int>("id")) id = *val;
    if (auto val = row.get<int>("product_id")) product_id = *val;
    if (auto val = row.get<int>("supplier_id")) supplier_id = *val;
    else supplier_id = std::nullopt;
    if (auto val = row.get<int>("transaction_type_id")) transaction_type_id = *val;
    if (auto val = row.get<int>("employee_id")) employee_id = *val;
    if (auto val = row.get<int>("quantity_change")) quantity_change = *val;
    if (auto val = row.get<int>("quantity_after")) quantity_after = *val;
    if (auto val = row.get<std::chrono::system_clock::time_point>("timestamp")) timestamp = *val;
}

nlohmann::json InventoryTransaction::to_json() const {
    nlohmann::json j = {
        {"id", id},
        {"product_id", product_id},
        {"transaction_type_id", transaction_type_id},
        {"employee_id", employee_id},
        {"quantity_change", quantity_change},
        {"quantity_after", quantity_after},
        {"timestamp", time_point_to_string(timestamp)}
    };
    if (supplier_id.has_value()) {
        j["supplier_id"] = *supplier_id;
    }
    else {
        j["supplier_id"] = nullptr;
    }
    return j;
}

void InventoryTransaction::from_json(nlohmann::json json_data) {
    product_id = json_data.at("product_id").get<int>();
    if (json_data.contains("supplier_id") && !json_data["supplier_id"].is_null()) {
        supplier_id = json_data["supplier_id"].get<int>();
    }
    else {
        supplier_id = std::nullopt;
    }
    transaction_type_id = json_data.at("transaction_type_id").get<int>();
    employee_id = json_data.at("employee_id").get<int>();
    quantity_change = json_data.at("quantity_change").get<int>();
    quantity_after = json_data.at("quantity_after").get<int>();
    if (json_data.contains("timestamp")) {
        timestamp = string_to_time_point(json_data.at("timestamp").get<std::string>());
    }
    else {
        timestamp = std::chrono::system_clock::now();
    }
}

std::map<std::string, DBValue> InventoryTransaction::as_map() const {
    std::map<std::string, DBValue> m{
        {"id", id},
        {"product_id", product_id},
        {"transaction_type_id", transaction_type_id},
        {"employee_id", employee_id},
        {"quantity_change", quantity_change},
        {"quantity_after", quantity_after},
        {"timestamp", time_point_to_string(timestamp)}
    };
    if (supplier_id.has_value()) {
        m["supplier_id"] = *supplier_id;
    }
    else {
        m["supplier_id"] = nullptr;
    }
    return m;
}