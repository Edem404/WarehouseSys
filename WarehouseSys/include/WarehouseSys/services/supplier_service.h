#pragma once

#include "base_service.h"
#include "models/supplier.h"

class SupplierService : public BaseService<Supplier> {
public:
	SupplierService(std::shared_ptr<IRepository<Supplier>> repository)
		: BaseService<Supplier>(std::move(repository)) {}
};