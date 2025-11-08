#include "WarehouseSys/models/product.h"

void Product::from_db_row(const IDBRow& row) {
	return;
}

nlohmann::json Product::to_json() const {
	return {
		{"id", id},
		{"name", name},
		{"quantity", quantity},
		{"price", price},
		{"product_type_id", product_type_id}
	};
}