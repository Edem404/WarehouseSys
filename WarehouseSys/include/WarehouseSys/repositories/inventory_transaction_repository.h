#pragma once

#pragma once

#include "base_repository.h"
#include "models/inventory_transaction.h"

class InventoryTransactionRepository : public BaseRepository<InventoryTransaction> {
public:
	InventoryTransactionRepository(std::shared_ptr<IDBSession> session)
		: BaseRepository<InventoryTransaction>(std::move(session)) {}
};