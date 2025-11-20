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
    // get all
    app.route_dynamic(_base_path + "/all").methods("GET"_method)
    ([this]() {
        auto [code, body] = _controller->get_all();
        return crow::response(code, body.dump(4));
    });

    // get by id
    app.route_dynamic(_base_path + "/<int>").methods("GET"_method)
    ([this](int id) {
        auto [code, body] = _controller->get_by_id(id);
        return crow::response(code, body.dump(4));
    });

    // post one
    app.route_dynamic(_base_path).methods("POST"_method)
    ([this](const crow::request& req) {
        json request_body;

        try {
            request_body = json::parse(req.body.c_str());
        }
        catch (std::exception& e) {
            json err = { {"error", "Invalid JSON format: " + std::string(e.what())} };
            return crow::response(400, err.dump(4));
        }

        auto [code, body] = _controller->create(request_body);

        return crow::response(code, body.dump(4));
    });

    // delete one
    app.route_dynamic(_base_path + "/<int>").methods("DELETE"_method)
    ([this](int id) {
        auto [code, body] = _controller->delete_by_id(id);
        return crow::response(code, body.dump(4));
    });

    // edit by id
    app.route_dynamic(_base_path + "/edit/<int>").methods("POST"_method)
    ([this](const crow::request& req, int id) {
        json request_body;
        T object_from_json;

        try {
            request_body = json::parse(req.body.c_str());
        }
        catch (std::exception& e) {
            json err = { {"error", "Invalid JSON format: " + std::string(e.what())} };
            return crow::response(400, err.dump(4));
        }

        object_from_json.from_json(request_body);
        auto [code, body] = _controller->edit_by_id(id, object_from_json);
        return crow::response(code, body.dump(4));
    });
}