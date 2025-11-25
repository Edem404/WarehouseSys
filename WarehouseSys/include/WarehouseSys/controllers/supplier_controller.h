#pragma once

#include "base_controller.h"
#include "models/supplier.h"

class SupplierController : public BaseController<Supplier> {
private:
protected:
public:
	SupplierController(std::shared_ptr<IService<Supplier>> service)
		: BaseController<Supplier>(std::move(service)) {}
};