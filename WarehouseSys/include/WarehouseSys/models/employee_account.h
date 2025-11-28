#pragma once

#include "i_dto.h"

class EmployeeAccount : public IDTO {
private:
	int id{};
	int employee_id{};
	std::string email;
	std::string password_hash;

public:
	static const std::string TABLE_NAME;

	//dto methods
	void from_db_row(const IDBRow& row) override;
	nlohmann::json to_json() const override;
	void from_json(nlohmann::json json_data) override;
	std::map<std::string, DBValue> as_map() const override;

	int get_id() const { return id; }
	int get_employee_id() const { return employee_id; }
	const std::string& get_email() const { return email; }
	const std::string& get_password_hash() const { return password_hash; }
};