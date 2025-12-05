#pragma once

#include "base_repository.h"
#include "models/inventory_transaction_type.h"

class InventoryTransactionTypeRepository : public BaseRepository<InventoryTransactionType> {
public:
	InventoryTransactionTypeRepository(std::shared_ptr<IDBSession> session)
		: BaseRepository<InventoryTransactionType>(std::move(session)) {}
};