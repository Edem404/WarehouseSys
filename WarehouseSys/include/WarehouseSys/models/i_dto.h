#pragma once

#include "database/idb_row.h"
#include <json.hpp>
#include <map>
#include <optional>

class IDTO {
public:	
	virtual ~IDTO() = default;

	virtual void from_db_row(const IDBRow& row) = 0;
	virtual nlohmann::json to_json() const = 0;
	virtual void from_json(nlohmann::json json_data) = 0;
	virtual std::map<std::string, DBValue> as_map() const = 0;
};