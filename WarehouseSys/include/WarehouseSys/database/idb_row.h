#pragma once
#include <any>
#include <optional>
#include <string>
#include <variant>

// universal interface for different data types
using DBValue = std::variant<int, double, std::string, bool, std::nullptr_t, size_t>;

class IDBRow {
public:
    virtual ~IDBRow() = default;

    // public type-safe methods
    template<typename T>
    std::optional<T> get(const std::string& column_name) const {
        auto val = get_any(column_name);
        if (!val.has_value())
            return std::nullopt;

        try {
            return std::any_cast<T>(*val);
        }
        catch (...) {
            return std::nullopt;
        }
    }

    template<typename T>
    std::optional<T> get(std::size_t index) const {
        auto val = get_any(index);
        if (!val.has_value())
            return std::nullopt;

        try {
            return std::any_cast<T>(*val);
        }
        catch (...) {
            return std::nullopt;
        }
    }

protected:
    // abstract methods to realize concrete get_any
    virtual std::optional<std::any> get_any(const std::string& column_name) const = 0;
    virtual std::optional<std::any> get_any(std::size_t index) const = 0;
};
