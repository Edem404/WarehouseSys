#pragma once

#include "base_report.h"

class FinancialReport : public BaseReport {
private:
protected:
public:
	void set_title(DocumentData& data) override;
	void compose_body(std::shared_ptr<IFormatter> formatter, DocumentData& data) override;
};