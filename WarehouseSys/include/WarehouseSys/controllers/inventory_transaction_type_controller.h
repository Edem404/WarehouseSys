#pragma once

#include "base_controller.h"
#include "models/inventory_transaction_type.h"

class InventoryTransactionTypeController : public BaseController<InventoryTransactionType> {
private:
protected:
public:
	InventoryTransactionTypeController(std::shared_ptr<IService<InventoryTransactionType>> service)
		: BaseController<InventoryTransactionType>(std::move(service)) {}
};