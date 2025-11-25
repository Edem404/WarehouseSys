#include "WarehouseSys/models/product_type.h"

const std::string ProductType::TABLE_NAME = "product_types";

void ProductType::from_db_row(const IDBRow& row) {
	if (auto val = row.get<int>("id")) id = *val;
	if (auto val = row.get<std::string>("type_name")) type_name = *val;
}

nlohmann::json ProductType::to_json() const {
	return {
		{"id", id},
		{"type_name", type_name}
	};
}

void ProductType::from_json(nlohmann::json json_data) {
	type_name = json_data.at("type_name").get<std::string>();
}

std::map<std::string, DBValue> ProductType::as_map() const {
	return {
		{"id", id},
		{"type_name", type_name}
	};
}