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
	int quantity_after{};
	std::chrono::system_clock::time_point timestamp{};
public:
	static const std::string TABLE_NAME;

	//dto methods
	void from_db_row(const IDBRow& row) override;
	nlohmann::json to_json() const override;
	void from_json(nlohmann::json json_data) override;
	std::map<std::string, DBValue> as_map() const override;

    int get_id() const { return id; }
    int get_product_id() const { return product_id; }
    const std::optional<int>& get_supplier_id() const { return supplier_id; }
    int get_transaction_type_id() const { return transaction_type_id; }
    int get_employee_id() const { return employee_id; }
    int get_quantity_change() const { return quantity_change; }
    int get_quantity_after() const { return quantity_after; }
	std::string get_timestamp_as_str() const {
		std::time_t t = std::chrono::system_clock::to_time_t(timestamp);
		std::tm tm_utc{};
		gmtime_s(&tm_utc, &t); // MSVC, UTC

		char buffer[25];
		std::strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S+00", &tm_utc);
		return std::string(buffer);
	}
protected:
};