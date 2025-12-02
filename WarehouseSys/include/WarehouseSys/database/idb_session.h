#pragma once

#include <string>
#include <functional>
#include "idb_row.h"
#include <memory>

class IDBSession {
private:

public:
	virtual ~IDBSession() = default;

	virtual std::shared_ptr<IDBSession> local_session() const = 0;

	virtual void execute(const std::string& query) = 0;
	virtual void fetch(const std::string& query,
		std::function<void(const IDBRow&)> callback) = 0;
protected:

};