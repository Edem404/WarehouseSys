#pragma once

#include "database/idb_row.h"
#include <json.hpp>

class IDTO {
public:	
	virtual ~IDTO() = default;

	virtual void from_db_row(const IDBRow& row) = 0;
	virtual nlohmann::json to_json() const = 0;
};