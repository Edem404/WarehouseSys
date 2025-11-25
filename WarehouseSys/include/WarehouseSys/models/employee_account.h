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
};