#pragma once
#include <soci/soci.h>
#include "idb_row.h"
#include <any>
#include <optional>
#include <string>
#include <chrono>

class SociRow final : public IDBRow {
private:
    const soci::row* row_;

public:
    explicit SociRow(const soci::row* row)
        : row_(row) {
    }

protected:
    std::optional<std::any> get_any(const std::string& column_name) const override {
        try {
            const auto& props = row_->get_properties(column_name);
            if (row_->get_indicator(column_name) == soci::i_null)
                return std::nullopt;

            switch (props.get_data_type()) {
            case soci::dt_string:
                return row_->get<std::string>(column_name);
            case soci::dt_double:
                return row_->get<double>(column_name);
            case soci::dt_integer:
                return row_->get<int>(column_name);
            case soci::dt_long_long:
                return row_->get<long long>(column_name);
            case soci::dt_unsigned_long_long:
                return row_->get<unsigned long long>(column_name);
            case soci::dt_date: {
                std::tm tm_val = row_->get<std::tm>(column_name);
                std::time_t t = _mkgmtime(&tm_val); // UTC
                return std::chrono::system_clock::from_time_t(t);
            }
            default:
                return std::nullopt;
            }
        }
        catch (...) {
            return std::nullopt;
        }
    }

    std::optional<std::any> get_any(std::size_t index) const override {
        try {
            const auto& props = row_->get_properties(index);
            if (row_->get_indicator(index) == soci::i_null)
                return std::nullopt;

            switch (props.get_data_type()) {
            case soci::dt_string:
                return row_->get<std::string>(index);
            case soci::dt_double:
                return row_->get<double>(index);
            case soci::dt_integer:
                return row_->get<int>(index);
            case soci::dt_long_long:
                return row_->get<long long>(index);
            case soci::dt_unsigned_long_long:
                return row_->get<unsigned long long>(index);
            case soci::dt_date: {
                std::tm tm_val = row_->get<std::tm>(index);
                std::time_t t = _mkgmtime(&tm_val); // UTC
                return std::chrono::system_clock::from_time_t(t);
            }
            default:
                return std::nullopt;
            }
        }
        catch (...) {
            return std::nullopt;
        }
    }
};
