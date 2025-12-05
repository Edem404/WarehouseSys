#pragma once

#include "low_stock_event.h"

class IStockObserver {
public:
    virtual void on_low_stock(const LowStockEvent& event) = 0;
    virtual ~IStockObserver() = default;
};
