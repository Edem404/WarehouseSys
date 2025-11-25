#pragma once

#include "base_service.h"
#include "models/product.h"

class ProductService : public BaseService<Product> {
public:
	ProductService(std::shared_ptr<IRepository<Product>> repository)
		: BaseService<Product>(std::move(repository)) {}
};