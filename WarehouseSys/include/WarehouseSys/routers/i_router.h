#pragma once

#include <crow.h>
#include <crow/middlewares/cors.h>

template<typename T>
class IRouter {
public:
    virtual ~IRouter() = default;

    virtual void register_routes(crow::App<crow::CORSHandler>& app) = 0;
};