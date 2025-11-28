#pragma once

#include "base_router.h"
#include "models/product_type.h"

class ProductTypeRouter : public BaseRouter<ProductType> {
private:
protected:
public:
	ProductTypeRouter(std::shared_ptr<IController<ProductType>> controller)
		: BaseRouter<ProductType>(std::move(controller)) {}
};