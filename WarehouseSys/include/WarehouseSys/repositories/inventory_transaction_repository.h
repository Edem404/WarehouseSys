#pragma once

#pragma once

#include "base_repository.h"
#include "models/inventory_transaction.h"

class InventoryTransactionRepository : public BaseRepository<InventoryTransaction> {
public:
	InventoryTransactionRepository(std::shared_ptr<IDBSession> session)
		: BaseRepository<InventoryTransaction>(std::move(session)) {}

	std::vector<InventoryTransaction> find_by_product_and_date_range(int product_id, const std::string& date_from, const std::string& date_to);
	std::optional<InventoryTransaction> find_last_before_date(int product_id, const std::string& date_to);
};