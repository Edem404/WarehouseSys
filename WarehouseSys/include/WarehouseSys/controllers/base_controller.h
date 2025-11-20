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
    std::pair<int, json> get_by_id(size_t id) override;
    std::pair<int, json> create(json item_as_json) override;
    std::pair<int, json> delete_by_id(size_t id) override;
    std::pair<int, json> edit_by_id(size_t id, T& item) override;
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

template<typename T>
std::pair<int, json> BaseController<T>::get_by_id(size_t id) {
    try {
        std::optional<T> o_item = _service->get_by_id(id);
        if (o_item) {
            T item = o_item.value();
            return { 200, item.to_json() };
        }
        else { // temporary solution. Better to throw NotFoundException
            json err = { {"error", "Not Found"} };
            return { 404, err };
        }
    }
    catch (const std::exception& e) {
        json err = { {"error", e.what()} };
        return { 500, err };
    }
}

template<typename T>
std::pair<int, json> BaseController<T>::create(json item_as_json) {
    try {
        T item_from_json;

        item_from_json.from_json(item_as_json);
        T item = _service->create(item_from_json);
        
        return { 200, item.to_json() };
    }
    catch (const std::exception& e) {
        json err = { {"error", e.what()} };
        return { 500, err };
    }
}

template<typename T>
std::pair<int, json> BaseController<T>::delete_by_id(size_t id) {
    try {
        std::optional<T> o_item = _service->delete_by_id(id);

        if (o_item) {
            T deleted_item = o_item.value();

            return { 200, deleted_item.to_json() };
        }
        else {
            json err = { {"error", "Not Found"} };
            return { 404, err };
        }
    }
    catch (std::exception& e) {
        json err = { {"error", e.what()} };
        return { 500, err };
    }
}

template<typename T>
std::pair<int, json> BaseController<T>::edit_by_id(size_t id, T& item) {
    try {
        T edited_item;
        edited_item = _service->edit_by_id(id, item);
        return { 200, edited_item.to_json() };
    }
    catch (std::exception& e) {
        json err = { {"error", e.what()} };
        return { 500, err };
    }
}