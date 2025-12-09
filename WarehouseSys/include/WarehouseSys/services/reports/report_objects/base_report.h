#pragma once

#include "i_report_template.h"
#include "models/document_data.h"

class BaseReport : public IReportTemplate {
private:
protected:
	virtual void compose_body(std::shared_ptr<IFormatter> formatter, const DocumentData& data) = 0;
public:
	//template method
	std::string generate(std::shared_ptr<IFormatter> formatter, const DocumentData& data) override;
};