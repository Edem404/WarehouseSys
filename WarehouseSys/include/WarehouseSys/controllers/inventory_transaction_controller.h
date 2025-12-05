#pragma once

#include "base_controller.h"
#include "models/inventory_transaction.h"

class InventoryTransactionController : public BaseController<InventoryTransaction> {
private:
protected:
public:
	InventoryTransactionController(std::shared_ptr<IService<InventoryTransaction>> service)
		: BaseController<InventoryTransaction>(std::move(service)) {}
};