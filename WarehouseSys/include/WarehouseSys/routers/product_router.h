#pragma once

#include "base_router.h"
#include "models/product.h"

class ProductRouter : public BaseRouter<Product> {
private:
protected:
public:
	ProductRouter(std::shared_ptr<IController<Product>> controller)
		: BaseRouter<Product>(std::move(controller)) {}
};