#include "WarehouseSys/models/inventory_transaction_type.h"

const std::string InventoryTransactionType::TABLE_NAME = "inventory_transaction_types";

void InventoryTransactionType::from_db_row(const IDBRow& row) {
	if (auto val = row.get<int>("id")) id = *val;
	if (auto val = row.get<std::string>("type_name")) type_name = *val;
}

nlohmann::json InventoryTransactionType::to_json() const {
	return {
		{"id", id},
		{"type_name", type_name}
	};
}

void InventoryTransactionType::from_json(nlohmann::json json_data) {
	type_name = json_data.at("type_name").get<std::string>();
}

std::map<std::string, DBValue> InventoryTransactionType::as_map() const {
	return {
		{"id", id},
		{"type_name", type_name}
	};
}