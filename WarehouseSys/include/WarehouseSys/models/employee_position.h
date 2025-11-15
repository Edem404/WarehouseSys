#pragma once

#include "i_dto.h"

class EmployeePosition : public IDTO {
private:
	int id{};
	std::string position_name;
	int access_level{};
public:
	static const std::string TABLE_NAME;

	//dto methods
	void from_db_row(const IDBRow& row) override;
	nlohmann::json to_json() const override;
protected:
};