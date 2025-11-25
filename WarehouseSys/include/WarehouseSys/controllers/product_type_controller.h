#pragma once

#include "base_controller.h"
#include "models/product_type.h"

class ProductTypeController : public BaseController<ProductType> {
private:
protected:
public:
	ProductTypeController(std::shared_ptr<IService<ProductType>> service)
		: BaseController<ProductType>(std::move(service)) {}
};