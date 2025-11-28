#pragma once

#include "base_router.h"
#include "models/supplier.h"

class SupplierRouter : public BaseRouter<Supplier> {
private:
protected:
public:
	SupplierRouter(std::shared_ptr<IController<Supplier>> controller)
		: BaseRouter<Supplier>(std::move(controller)) {}
};