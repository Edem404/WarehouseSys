#pragma once

#include <vector>
#include <iostream>
#include <memory>
#include <json.hpp>
#include <utility>

using json = nlohmann::json;

template<typename T>
class IController {
public:
	virtual ~IController() = default;
	virtual std::pair<int, json> get_all() = 0;
};