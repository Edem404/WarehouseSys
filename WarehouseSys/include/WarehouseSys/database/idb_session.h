#pragma once

#include <string>
#include <functional>
#include "idb_row.h"

class IDBSession {
private:

public:
	virtual ~IDBSession() = default;

	virtual
	virtual void execute(const std::string& query) = 0;
	virtual bool fetch(const std::string& query, std::string& data) = 0;
	virtual void fetch(const std::string& query,
		std::function<void(const IDBRow&)> callback) = 0;
protected:

};