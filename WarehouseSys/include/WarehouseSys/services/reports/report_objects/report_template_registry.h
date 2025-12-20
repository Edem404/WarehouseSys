#pragma once

#include <memory>
#include <map>
#include "i_report_template.h"
#include "./models/document_enum_metadata.h"

class ReportTemplateRegistry {
private:
	std::map<ReportType, IReportTemplate*> _templates;
protected:
public:
	void register_template(ReportType, IReportTemplate&); 
	IReportTemplate& resolve(ReportType) const;
};