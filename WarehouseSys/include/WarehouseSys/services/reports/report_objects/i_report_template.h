#pragma once

#include <string>
#include "services/reports/i_formatter.h"

class IReportTemplate {
public:
	virtual std::string generate(std::shared_ptr<IFormatter> formatter/*, const DocumentData*/) = 0;
};