#pragma once

#include "i_router.h"
#include "controllers/i_controller.h"
#include <crow/middlewares/cors.h>

template<typename T>
class BaseRouter : public IRouter<T> {
protected:
    std::shared_ptr<IController<T>> _controller;
    std::string _base_path;

public:
    BaseRouter(std::shared_ptr<IController<T>> controller)
        : _controller(std::move(controller))
    {
        _base_path = "/" + std::string(T::TABLE_NAME);
    }

    void register_routes(crow::App<crow::CORSHandler>& app) override;
};

template<typename T>
void BaseRouter<T>::register_routes(crow::App<crow::CORSHandler>& app) {
    app.route_dynamic(_base_path + "/all").methods("GET"_method)
    ([this]() {
        auto [code, body] = _controller->get_all();
        return crow::response(code, body.dump(4));
    });
}