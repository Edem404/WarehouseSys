#pragma once

#include "base_repository.h"
#include "models/product.h"
#include <sstream>

class ProductRepository : public BaseRepository<Product> {
public:
	ProductRepository(std::shared_ptr<IDBSession> session)
		: BaseRepository<Product>(std::move(session)) {}

	void update_quantity_atomic(int product_id, int quantity_diff);
};