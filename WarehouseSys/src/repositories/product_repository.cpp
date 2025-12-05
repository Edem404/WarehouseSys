#include "WarehouseSys/repositories/product_repository.h"

void ProductRepository::update_quantity_atomic(int product_id, int quantity_diff)
{
    std::stringstream query;
    query << "UPDATE " << Product::TABLE_NAME
        << " SET quantity = quantity + (" << quantity_diff << ") "
        << "WHERE id = " << product_id << ";";

    _session->execute(query.str());
}