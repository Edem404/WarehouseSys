#pragma once

#include "base_router.h"
#include "models/inventory_transaction_type.h"

class InventoryTransactionTypeRouter : public BaseRouter<InventoryTransactionType> {
private:
protected:
public:
	InventoryTransactionTypeRouter(std::shared_ptr<IController<InventoryTransactionType>> controller)
		: BaseRouter<InventoryTransactionType>(std::move(controller)) {}
};