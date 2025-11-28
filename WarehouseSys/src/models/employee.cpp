#include "WarehouseSys/models/employee.h"

const std::string Employee::TABLE_NAME = "employees";

void Employee::from_db_row(const IDBRow& row) {
	if (auto val = row.get<int>("id")) id = *val;
	if (auto val = row.get<std::string>("name")) name = *val;
	if (auto val = row.get<std::string>("surname")) surname = *val;
	if (auto val = row.get<int>("position_id")) position_id = *val;
}

nlohmann::json Employee::to_json() const {
	return {
		{"id", id},
		{"name", name},
		{"surname", surname},
		{"position_id", position_id}
	};
}

void Employee::from_json(nlohmann::json json_data) {
	name = json_data.at("name").get<std::string>();
	surname = json_data.at("surname").get<std::string>();
	position_id = json_data.at("position_id").get<int>();
}

std::map<std::string, DBValue> Employee::as_map() const {
	return {
		{"id", id},
		{"name", name},
		{"surname", surname},
		{"position_id", position_id}
	};
}