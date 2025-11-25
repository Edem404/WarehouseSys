#include "WarehouseSys/models/employee_account.h"

const std::string EmployeeAccount::TABLE_NAME = "employee_accounts";

void EmployeeAccount::from_db_row(const IDBRow& row) {
	if (auto val = row.get<int>("id")) id = *val;
	if (auto val = row.get<int>("employee_id")) employee_id = *val;
	if (auto val = row.get<std::string>("email")) email = *val;
	if (auto val = row.get<std::string>("password_hash")) password_hash = *val;
}

nlohmann::json EmployeeAccount::to_json() const {
	return {
		{"id", id},
		{"employee_id", employee_id},
		{"email", email},
		{"password_hash", password_hash}
	};
}

void EmployeeAccount::from_json(nlohmann::json json_data) {
	employee_id = json_data.at("employee_id").get<int>();
	email = json_data.at("email").get<std::string>();
	password_hash = json_data.at("password_hash").get<std::string>();
}

std::map<std::string, DBValue> EmployeeAccount::as_map() const
{
	return {
		{"id", id},
		{"employee_id", employee_id},
		{"email", email},
		{"password_hash", password_hash}
	};
}
