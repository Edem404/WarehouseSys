#pragma once

#include "base_repository.h"
#include "models/supplier.h"

class SupplierRepository : public BaseRepository<Supplier> {
public:
	SupplierRepository(std::shared_ptr<IDBSession> session)
		: BaseRepository<Supplier>(std::move(session)) {}
};