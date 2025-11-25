#pragma once

#include "base_controller.h"
#include "models/product.h"

class ProductController : public BaseController<Product> {
private:
protected:
public:
	ProductController(std::shared_ptr<IService<Product>> service)
		: BaseController<Product>(std::move(service)) {}
};