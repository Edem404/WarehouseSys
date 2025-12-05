#pragma once

#include "base_router.h"
#include "models/inventory_transaction.h"

class InventoryTransactionRouter : public BaseRouter<InventoryTransaction> {
private:
protected:
public:
	InventoryTransactionRouter(std::shared_ptr<IController<InventoryTransaction>> controller)
		: BaseRouter<InventoryTransaction>(std::move(controller)) {}
};