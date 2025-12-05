#pragma once

#include "i_stock_observer.h"
#include <vector>

class StockEventDispatcher {
    std::vector<IStockObserver*> observers;

public:
    void subscribe(IStockObserver* observer) {
        observers.push_back(observer);
    }

    void notify_low_stock(const LowStockEvent& event) {
        for (auto* obs : observers)
            obs->on_low_stock(event);
    }
};
