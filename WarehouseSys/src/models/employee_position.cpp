#include "WarehouseSys/models/employee_position.h"

const std::string EmployeePosition::TABLE_NAME = "employee_positions";

void EmployeePosition::from_db_row(const IDBRow& row) {
	//works fine for all values, but null
	if (auto val = row.get<int>("id")) id = *val;
	if (auto val = row.get<std::string>("position_name")) position_name = *val;
	if (auto val = row.get<int>("access_level")) access_level = *val;
}

nlohmann::json EmployeePosition::to_json() const {
	return {
		{"id", id},
		{"position_name", position_name},
		{"access_level", access_level}
	};
}

void EmployeePosition::from_json(nlohmann::json json_data) {
	position_name = json_data.at("position_name").get<std::string>();
	access_level = json_data.at("access_level").get<int>();
}

std::map<std::string, DBValue> EmployeePosition::as_map() const {
	return {
		{"id", id},
		{"position_name", position_name},
		{"access_level", access_level}
	};
}
