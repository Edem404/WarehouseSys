#pragma once

#include "i_stock_observer.h"
#include <vector>
#include <memory>

class StockEventDispatcher {
    std::vector<std::weak_ptr<IStockObserver>> observers;

public:
    void subscribe(std::shared_ptr<IStockObserver> observer) {
        observers.push_back(observer);
    }

    void notify_low_stock(const LowStockEvent& event) {
        for (auto it = observers.begin(); it != observers.end(); ) {
            if (auto obs = it->lock()) {
                obs->on_low_stock(event);
                ++it;
            }
            else {
                it = observers.erase(it);
            }
        }
    }
};