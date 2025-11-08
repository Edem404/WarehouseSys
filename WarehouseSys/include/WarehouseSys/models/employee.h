#pragma once

#include "i_dto.h" 
#include "employee_position.h"

class Employee : public IDTO {
private:
	int id{};
	std::string name;
	std::string surname;
	EmployeePosition position;

public:


	//dto methods
	void from_db_row(const IDBRow& row) override;
	nlohmann::json to_json() const override;
protected:
};