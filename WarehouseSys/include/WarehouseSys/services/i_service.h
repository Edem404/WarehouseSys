#pragma once

#include <vector>
#include <iostream>
#include <memory>

template<typename T>
class IService {
public:
	virtual ~IService() = default;
	virtual std::vector<T> get_all() = 0;
};