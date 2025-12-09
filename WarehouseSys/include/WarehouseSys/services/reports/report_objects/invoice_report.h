#pragma once

#include "base_report.h"

class InvoiceReport : public BaseReport {
private:
protected:
public:
	void compose_body(std::shared_ptr<IFormatter> formatter, const DocumentData& data) override;
};