#pragma once

#include <string>
#include "services/reports/i_formatter.h"
#include "models/document_data.h"

class IReportTemplate {
public:
	virtual std::string generate(std::shared_ptr<IFormatter> formatter, const DocumentData& data) = 0;
};