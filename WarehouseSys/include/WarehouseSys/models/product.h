#pragma once

#include "i_dto.h"
#include "product_type.h"

class Product : public IDTO {
private:
	int id{};
	std::string name;
	std::string article;
	int quantity{};
	double price{};
	int product_type_id{};
	int supplier_id{};
	int min_quantity_threshold{};
public:
	static const std::string TABLE_NAME;

	void from_db_row(const IDBRow& row) override;
	nlohmann::json to_json() const override;
	void from_json(nlohmann::json json_data) override;
	std::map<std::string, DBValue> as_map() const override;

	int get_id() const { return id; }
	std::string get_name() const { return name; }
	std::string get_article() const { return article; }
	int get_quantity() const { return quantity; }
	double get_price() const { return price; }
	int get_min_quantity_threshold() const { return min_quantity_threshold; }
protected:
};