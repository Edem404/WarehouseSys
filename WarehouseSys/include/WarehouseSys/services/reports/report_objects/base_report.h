#pragma once

#include "i_report_template.h"
#include "models/document_data.h"

class BaseReport : public IReportTemplate
{
protected:
    virtual void compose_body(std::shared_ptr<IFormatter> formatter, DocumentData& data) = 0;

    virtual void set_title(DocumentData& data) = 0;

public:
    std::string generate(std::shared_ptr<IFormatter> formatter,
        DocumentData& data) override;
};
