#include "WarehouseSys/services/product_service.h"

void ProductService::update_quantity_atomic(int product_id, int quantity_diff) {
    _product_repository->update_quantity_atomic(product_id, quantity_diff);
}