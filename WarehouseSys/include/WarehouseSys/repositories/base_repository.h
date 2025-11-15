#pragma once

#include "i_repository.h"
#include "database/idb_session.h"

template<typename T>
class BaseRepository : public IRepository<T> {
protected:
    std::shared_ptr<IDBSession> _session;

public:
    BaseRepository(std::shared_ptr<IDBSession> session)
        : _session(std::move(session)) {}

    virtual ~BaseRepository() = default;

    std::vector<T> get_all() override;

};


template<typename T>
std::vector<T> BaseRepository<T>::get_all() {
    std::string query = "SELECT * FROM " + T::TABLE_NAME;

    std::vector<T> results;

    try {
        _session->fetch(query,
            [&results](const IDBRow& row) {
                T model_instance;

                model_instance.from_db_row(row);

                results.push_back(model_instance);
            }
        );
    }
    catch (const std::exception& e) {
        std::cerr << "Error in generic get_all() for table '"
            << T::TABLE_NAME << "': " << e.what() << std::endl;
        throw;
    }

    return results;
}