#pragma once

#include "base_service.h"
#include "WarehouseSys/repositories/product_repository.h"
#include "models/product.h"
#include "notifications/stock_event_dispatcher.h"

class ProductService : public BaseService<Product> {
private:
    std::shared_ptr<ProductRepository> _product_repository;
    std::shared_ptr<StockEventDispatcher> _dispatcher;

public:
    ProductService(
        std::shared_ptr<ProductRepository> repository,
        std::shared_ptr<StockEventDispatcher> dispatcher
    )
        : BaseService<Product>(repository),
        _product_repository(repository),
        _dispatcher(std::move(dispatcher))
    {
    }

    std::optional<LowStockEvent> update_quantity_atomic(int product_id, int quantity_diff);
};