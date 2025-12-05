#pragma once

#include <string>

struct LowStockEvent {
    size_t product_id;
    int current_qty;
    int threshold_qty;
    std::string message;

    LowStockEvent(size_t pid, int current, int threshold)
        : product_id(pid), current_qty(current), threshold_qty(threshold)
    {
        message = "Current product quantity is below the threshold ("
            + std::to_string(current) + " < "
            + std::to_string(threshold) + ")";
    }
};
