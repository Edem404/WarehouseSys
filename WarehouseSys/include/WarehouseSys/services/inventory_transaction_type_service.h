#pragma once

#include "base_service.h"
#include "models/inventory_transaction_type.h"

class InventoryTransactionTypeService : public BaseService<InventoryTransactionType> {
	InventoryTransactionTypeService(std::shared_ptr<IRepository<InventoryTransactionType>> repository)
		: BaseService<InventoryTransactionType>(std::move(repository)) {}
};