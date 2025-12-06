#pragma once

#include "i_stock_observer.h"
#include <iostream>

class LoggingStockObserver : public IStockObserver {
private:
public:
    void on_low_stock(const LowStockEvent& event) override {
        std::cout << "[LOG] Low stock -> " << event.message << "\n";
    }
};