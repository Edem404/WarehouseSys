#pragma once

#include <string>
#include <functional>
#include "idb_row.h"
#include <memory>

class IDBSession {
private:

public:
	virtual ~IDBSession() = default;

	virtual void execute(const std::string& query) = 0;
	
	virtual void fetch(const std::string& query,
		std::function<void(const std::shared_ptr<IDBRow>&)> callback) = 0;
protected:

};