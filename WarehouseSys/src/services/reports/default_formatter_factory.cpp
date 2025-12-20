#include "WarehouseSys/services/reports/default_formatter_factory.h"

#include <stdexcept>

void DefaultFormatterFactory::register_formatter(ReportFormat format, std::function<std::shared_ptr<IFormatter>()> factory) {
    if (!factory) {
        throw std::invalid_argument("Formatter factory must not be empty");
    }

    _factories[format] = std::move(factory);
}

std::shared_ptr<IFormatter> DefaultFormatterFactory::create(ReportFormat format)
{
    auto it = _factories.find(format);
    if (it == _factories.end()) {
        throw std::runtime_error("Unsupported report format");
    }

    return it->second();
}