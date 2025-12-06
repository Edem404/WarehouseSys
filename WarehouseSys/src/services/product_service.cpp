#include "WarehouseSys/services/product_service.h"

std::optional<LowStockEvent> ProductService::update_quantity_atomic(int product_id, int quantity_diff) {
    _product_repository->update_quantity_atomic(product_id, quantity_diff);

    auto product_opt = _product_repository->get_by_id(product_id);
    if (!product_opt.has_value())
        return std::nullopt;

    const auto& product = product_opt.value();

    if (product.get_quantity() < product.get_min_quantity_threshold())
    {
        LowStockEvent event(
            static_cast<size_t>(product.get_id()),
            product.get_quantity(),
            product.get_min_quantity_threshold()
        );

        if (_dispatcher)
            _dispatcher->notify_low_stock(event);

        return event;
    }

    return std::nullopt;
}