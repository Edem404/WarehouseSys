#include "WarehouseSys/models/employee.h"

void Employee::from_db_row(const IDBRow& row) {
	return;
}

nlohmann::json Employee::to_json() const {
	return {
		{"id", id},
		{"name", name},
		{"surname", surname},
		{"position", position.to_json()}
	};
}