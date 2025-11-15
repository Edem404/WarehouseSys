#include "WarehouseSys/database/soci_session.h"

void SociSession::execute(const std::string& query) {
	db_ << query;
}

//void SociSession::fetch(const std::string& query, std::function<void(const std::shared_ptr<IDBRow>&)> callback) {
//	soci::rowset<soci::row> rs = (db_.prepare << query);
//    for (const auto& row : rs) {
//        auto db_row = std::make_shared<SociRow>(&row);
//        callback(db_row);
//    }
//}

void SociSession::fetch(const std::string& query, std::function<void(const IDBRow&)> callback) {
    soci::rowset<soci::row> rs = (db_.prepare << query);
    for (const auto& row : rs) {
        //auto db_row = std::make_shared<SociRow>(&row);
        SociRow db_row(&row);
        callback(db_row);
    }
}