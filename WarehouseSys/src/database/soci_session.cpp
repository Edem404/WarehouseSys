#include "WarehouseSys/database/soci_session.h"

std::shared_ptr<IDBSession> SociSession::local_session() const {
    soci::session local = local_soci_session();
    return std::make_shared<SociSession>(local, connection_string);
}

void SociSession::execute(const std::string& query) {
    soci::session local = local_soci_session();
	local << query;
}

void SociSession::fetch(const std::string& query, std::function<void(const IDBRow&)> callback) {
    soci::session local = local_soci_session();
    soci::rowset<soci::row> rs = (local.prepare << query);
    for (const auto& row : rs) {
        SociRow db_row(&row);
        callback(db_row);
    }
}