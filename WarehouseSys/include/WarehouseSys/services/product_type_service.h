#pragma once

#include "base_service.h"
#include "models/product_type.h"

class ProductTypeService : public BaseService<ProductType> {
	ProductTypeService(std::shared_ptr<IRepository<ProductType>> repository)
		: BaseService<ProductType>(std::move(repository)) {}
};