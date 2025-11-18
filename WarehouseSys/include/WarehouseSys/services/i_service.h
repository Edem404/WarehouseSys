#pragma once

#include <vector>
#include <iostream>
#include <memory>
#include <optional>

template<typename T>
class IService {
public:
	virtual ~IService() = default;
	virtual std::vector<T> get_all() = 0;
	virtual std::optional<T> get_by_id(size_t id) = 0;
	virtual T create(T& item) = 0;
	virtual std::optional<T> delete_by_id(size_t id) = 0;

};