#pragma once

#include "base_repository.h"
#include "models/product.h"

class ProductRepository : public BaseRepository<Product> {
public:
	ProductRepository(std::shared_ptr<IDBSession> session)
		: BaseRepository<Product>(std::move(session)) {}
};