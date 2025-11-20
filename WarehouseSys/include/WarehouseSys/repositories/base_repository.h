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
    std::optional<T> get_by_id(size_t id) override;
    T create(T& item) override;
    std::optional<T> delete_by_id(size_t id) override;
    T edit_by_id(size_t id, T& item) override;
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

template<typename T>
std::optional<T> BaseRepository<T>::get_by_id(size_t id) {
    std::string query = "SELECT * FROM " + T::TABLE_NAME + " WHERE id = " + std::to_string(id);

    std::optional<T> item;
    bool founded = false;

    try {
        _session->fetch(query,
            [&item, &founded](const IDBRow& row) {
                if (founded) {
                    return;
                }

                T temp_item;
                temp_item.from_db_row(row);

                item = temp_item;

                founded = true;
            }
        );
    }
    catch (const std::exception& e) {
        std::cerr << "Error in generic get_by_id(id) for table '"
            << T::TABLE_NAME << "': " << e.what() << std::endl;
        throw;
    }

    return item;
}

template<typename T>
T BaseRepository<T>::create(T& item) {
    auto map_representation = item.as_map();
    map_representation.erase("id");

    std::vector<std::string> columns, values;

    for (const auto& [key, value] : map_representation) {
        columns.push_back(key);

        std::string to_sql_value;

        std::visit([&to_sql_value](auto&& v) {
            using V = std::decay_t<decltype(v)>;
            if constexpr (std::is_same_v<V, std::string>)
                to_sql_value = "'" + v + "'";
            else if constexpr (std::is_same_v<V, std::nullptr_t>)
                to_sql_value = "NULL";
            else if constexpr (std::is_same_v<V, bool>)
                to_sql_value = v ? "1" : "0";
            else
                to_sql_value = std::to_string(v);
        }, value);

        values.push_back(to_sql_value);
    }

    std::string columns_str, values_str;

    for (size_t i = 0; i < columns.size(); i++) {
        columns_str += columns[i];
        values_str += values[i];

        if (i != columns.size() - 1) {
            columns_str += ", ";
            values_str += ", ";
        }
    }

    std::string query = "INSERT INTO " + T::TABLE_NAME + " ( " + columns_str
        + ") VALUES (" + values_str + ");";

    std::cout << "query: \n" << query << std::endl;
    try {
        _session->execute(query);
    }
    catch (std::exception& e) {
        std::cerr << "Error in create() for table: '" << T::TABLE_NAME << "': " << e.what() << "" << std::endl;
        throw;
    }

    return item;
}

template<typename T>
std::optional<T> BaseRepository<T>::delete_by_id(size_t id) {
    std::optional<T> item_to_delete = get_by_id(id);

    if (item_to_delete) {
        std::string query = "DELETE FROM " + T::TABLE_NAME + " WHERE id = " + std::to_string(id) + ";";

        try {
            _session->execute(query);
        }
        catch (std::exception& e) {
            std::cerr << "Error in create() for table: '" << T::TABLE_NAME << "': " << e.what() << "" << std::endl;
            throw;
        }

        return item_to_delete.value();
    }
    
    return item_to_delete;
}

template<typename T>
T BaseRepository<T>::edit_by_id(size_t id, T& item) {
    auto map_representation = item.as_map();
    map_representation.erase("id");

    std::vector<std::string> columns, values;

    for (const auto& [key, value] : map_representation) {
        columns.push_back(key);

        std::string to_sql_value;

        std::visit([&to_sql_value](auto&& v) {
            using V = std::decay_t<decltype(v)>;
            if constexpr (std::is_same_v<V, std::string>)
                to_sql_value = "'" + v + "'";
            else if constexpr (std::is_same_v<V, std::nullptr_t>)
                to_sql_value = "NULL";
            else if constexpr (std::is_same_v<V, bool>)
                to_sql_value = v ? "1" : "0";
            else
                to_sql_value = std::to_string(v);
            }, value);

        values.push_back(to_sql_value);
    }

    std::string set_query_part;

    for (size_t i = 0; i < columns.size(); i++) {
        set_query_part += columns[i] + "=" + values[i];
        if (i != columns.size() - 1) {
            set_query_part += ", ";
        }
    }

    std::string query = "UPDATE " + T::TABLE_NAME + " SET "
        + set_query_part + " WHERE id=" + std::to_string(id) + ";";

    std::cout << "\n final query:\n" << query << std::endl;
    _session->execute(query);
    return item;
}