#pragma once

#include "i_dto.h"

class Supplier : public IDTO {
private:
	int id{};
	std::string name;
	std::string phone_number;
	std::string email;
	bool is_active{};

public:
	static const std::string TABLE_NAME;

	//dto methods
	void from_db_row(const IDBRow& row) override;
	nlohmann::json to_json() const override;
	void from_json(nlohmann::json json_data) override;
	std::map<std::string, DBValue> as_map() const override;
};