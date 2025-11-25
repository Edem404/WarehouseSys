#pragma once

#include "i_dto.h" 
#include "employee_position.h"

class Employee : public IDTO {
private:
	int id{};
	std::string name;
	std::string surname;
	int position_id{};

public:
	static const std::string TABLE_NAME;

	//dto methods
	void from_db_row(const IDBRow& row) override;
	nlohmann::json to_json() const override;
	void from_json(nlohmann::json json_data) override;
	std::map<std::string, DBValue> as_map() const override;
protected:
};