#include "WarehouseSys/models/supplier.h"

const std::string Supplier::TABLE_NAME = "suppliers";

void Supplier::from_db_row(const IDBRow& row) {
	if (auto val = row.get<int>("id")) id = *val;
	if (auto val = row.get<std::string>("name")) name = *val;
	if (auto val = row.get<std::string>("phone_number")) phone_number = *val;
	if (auto val = row.get<std::string>("email")) email = *val;
}

nlohmann::json Supplier::to_json() const {
	return {
		{"id", id},
		{"name", name},
		{"phone_number", phone_number},
		{"email", email}
	};
}

void Supplier::from_json(nlohmann::json json_data) {
	name = json_data.at("name").get<std::string>();
	phone_number = json_data.at("phone_number").get<std::string>();
	email = json_data.at("phone_number").get<std::string>();
}

std::map<std::string, DBValue> Supplier::as_map() const {
	return {
		{"id", id},
		{"name", name},
		{"phone_number", phone_number},
		{"email", email}
	};
}