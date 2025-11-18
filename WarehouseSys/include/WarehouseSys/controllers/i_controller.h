#pragma once

#include <vector>
#include <iostream>
#include <memory>
#include <json.hpp>
#include <utility>
#include <optional>

using json = nlohmann::json;

template<typename T>
class IController {
public:
	virtual ~IController() = default;
	virtual std::pair<int, json> get_all() = 0;
	virtual std::pair<int, json> get_by_id(size_t id) = 0;
	virtual std::pair<int, json> create(json item_as_json) = 0;
	virtual std::pair<int, json> delete_by_id(size_t id) = 0;
};