#pragma once
#include <string>
#include <optional>

class IDBRow {
public:
	virtual ~IDBRow() = default;

	template<typename T>
	std::optional<T> get(const std::string& column_name) const;

	template<typename T>
	std::optional<T> get(std::size_t index) const;
};