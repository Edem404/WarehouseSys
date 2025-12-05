#pragma once

#include "i_dto.h"

class InventoryTransactionType : public IDTO {
private:
	int id{};
	std::string type_name;
public:
	static const std::string TABLE_NAME;

	//dto methods
	void from_db_row(const IDBRow& row) override;
	nlohmann::json to_json() const override;
	void from_json(nlohmann::json json_data) override;
	std::map<std::string, DBValue> as_map() const override;
protected:
};