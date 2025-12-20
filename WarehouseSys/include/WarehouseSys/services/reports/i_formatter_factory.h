#pragma once

#include <memory>
#include <map>
#include "i_formatter.h"
#include "./models/document_enum_metadata.h"
#include <functional>

class IFormatterFactory {
public:
    virtual std::shared_ptr<IFormatter>
        create(ReportFormat format) = 0;

    virtual ~IFormatterFactory() = default;
};