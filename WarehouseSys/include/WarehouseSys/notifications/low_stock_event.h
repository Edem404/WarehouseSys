#pragma once

#include <string>

struct StockNotification {
    std::string type; // "LOW_STOCK", "OVER_STOCK", "NORMAL"
    int product_id;
    int old_qty;
    int new_qty;
    int threshold;
    std::string message;
};

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
