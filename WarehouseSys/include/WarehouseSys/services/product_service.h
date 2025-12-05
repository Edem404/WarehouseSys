#pragma once

#include "base_service.h"
#include "WarehouseSys/repositories/product_repository.h"
#include "models/product.h"

class ProductService : public BaseService<Product> {
private:
    std::shared_ptr<ProductRepository> _product_repository;
public:
    ProductService(std::shared_ptr<ProductRepository> repository)
        : BaseService<Product>(repository),
        _product_repository(repository)
    {
    }

    void update_quantity_atomic(int product_id, int quantity_diff);
};