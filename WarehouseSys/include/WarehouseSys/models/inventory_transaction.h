#pragma once

#include "i_dto.h"
#include <chrono>
#include <iomanip>
#include <sstream>

class InventoryTransaction : public IDTO {
private:
	int id{};
	int product_id{};
	std::optional<int> supplier_id;
	int transaction_type_id{};
	int employee_id{};
	int quantity_change{};
	std::chrono::system_clock::time_point timestamp{};
public:
	static const std::string TABLE_NAME;

	//dto methods
	void from_db_row(const IDBRow& row) override;
	nlohmann::json to_json() const override;
	void from_json(nlohmann::json json_data) override;
	std::map<std::string, DBValue> as_map() const override;
protected:
};