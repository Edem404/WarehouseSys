#pragma once

#include "i_report_template.h"

class BaseReport : public IReportTemplate {
private:
protected:
public:
	std::string generate(std::shared_ptr<IFormatter> formatter/*, const DocumentData*/) override;
};