#pragma once

#include "base_controller.h"
#include "models/inventory_transaction.h"
#include "WarehouseSys/services/inventory_transaction_service.h"

class InventoryTransactionController : public BaseController<InventoryTransaction> {
private:
	std::shared_ptr<InventoryTransactionService> _inventory_service;
protected:
public:
	InventoryTransactionController(std::shared_ptr<IService<InventoryTransaction>> service)
		: BaseController<InventoryTransaction>(std::move(service)) {

		_inventory_service = std::dynamic_pointer_cast<InventoryTransactionService>(this->_service);
		if (!_inventory_service)
			throw std::runtime_error("InventoryTransactionController requires InventoryTransactionService");
	}

	std::pair<int, json> create_with_notification(json item_as_json);
};