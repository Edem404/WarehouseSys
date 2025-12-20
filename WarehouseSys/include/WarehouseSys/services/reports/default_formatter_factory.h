#pragma once

#include "i_formatter_factory.h"

class DefaultFormatterFactory : public IFormatterFactory {
private:
    std::map<ReportFormat, std::function<std::shared_ptr<IFormatter>()>> _factories;
protected:
public:
    void register_formatter(ReportFormat, std::function<std::shared_ptr<IFormatter>()>);

    std::shared_ptr<IFormatter> create(ReportFormat format) override;
};