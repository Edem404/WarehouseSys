#include "WarehouseSys/models/product.h"

const std::string Product::TABLE_NAME = "products";

void Product::from_db_row(const IDBRow& row) {
	if (auto val = row.get<int>("id")) id = *val;
	if (auto val = row.get<std::string>("name")) name = *val;
	if (auto val = row.get<std::string>("article")) article = *val;
	if (auto val = row.get<int>("quantity")) quantity = *val;
	if (auto val = row.get<double>("price")) price = *val;
	if (auto val = row.get<int>("product_type_id")) product_type_id = *val;
	if (auto val = row.get<int>("supplier_id")) supplier_id = *val;
	if (auto val = row.get<int>("min_quantity_threshold")) min_quantity_threshold = *val;
}

nlohmann::json Product::to_json() const {
	return {
		{"id", id},
		{"name", name},
		{"article", article},
		{"quantity", quantity},
		{"price", price},
		{"product_type_id", product_type_id},
		{"supplier_id", supplier_id},
		{"min_quantity_threshold", min_quantity_threshold}
	};
}

void Product::from_json(nlohmann::json json_data) {
	name = json_data.at("name").get<std::string>();
	article = json_data.at("article").get<std::string>();
	quantity = json_data.at("quantity").get<int>();
	price = json_data.at("price").get<double>();
	product_type_id = json_data.at("product_type_id").get<int>();
	supplier_id = json_data.at("supplier_id").get<int>();
	min_quantity_threshold = json_data.at("min_quantity_threshold").get<int>();
}

std::map<std::string, DBValue> Product::as_map() const {
	return {
		{"id", id},
		{"name", name},
		{"article", article},
		{"quantity", quantity},
		{"price", price},
		{"product_type_id", product_type_id},
		{"supplier_id", supplier_id},
		{"min_quantity_threshold", min_quantity_threshold}
	};
}