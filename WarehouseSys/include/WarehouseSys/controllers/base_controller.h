#pragma once

#include "i_controller.h"
#include "services/i_service.h"

template<typename T>
class BaseController : public IController<T> {
protected:
	std::shared_ptr<IService<T>> _service;

public:
	BaseController(std::shared_ptr<IService<T>> service)
		: _service(std::move(service)) {}
	
	std::pair<int, json> get_all() override;
};


template<typename T>
std::pair<int, json> BaseController<T>::get_all() {
    try {
        std::vector<T> models = _service->get_all();

        json result = json::array();
        for (const auto& model : models) {
            result.push_back(model.to_json());
        }
        return { 200, result };
    }
    catch (const std::exception& e) {
        json err = { {"error", e.what()} };
        return { 500, err };
    }
}