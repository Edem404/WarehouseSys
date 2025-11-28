#pragma once

#include "base_repository.h"
#include "models/product_type.h"

class ProductTypeRepository : public BaseRepository<ProductType> {
public:
	ProductTypeRepository(std::shared_ptr<IDBSession> session)
		: BaseRepository<ProductType>(std::move(session)) {}
};