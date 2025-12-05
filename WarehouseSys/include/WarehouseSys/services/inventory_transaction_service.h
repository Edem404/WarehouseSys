#pragma once

#include "base_service.h"
#include "models/inventory_transaction.h"
#include "product_service.h"

class InventoryTransactionService : public BaseService<InventoryTransaction> {
private:
	std::shared_ptr<ProductService> _product_service;

public:
    InventoryTransactionService(
        std::shared_ptr<IRepository<InventoryTransaction>> repository,
        std::shared_ptr<IService<Product>> product_service_iface
    )
        : BaseService<InventoryTransaction>(std::move(repository))
    {
        _product_service = std::dynamic_pointer_cast<ProductService>(product_service_iface);
    }

	InventoryTransaction create(InventoryTransaction& transaction) override;
};