#include "WarehouseSys/database/soci_session.h"

void SociSession::execute(const std::string& query) {
	db_ << query;
}

void SociSession::fetch(const std::string& query, std::function<void(const std::shared_ptr<IDBRow>&)> callback) {
	return;
}