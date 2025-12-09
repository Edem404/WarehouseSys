#pragma once

#include "i_formatter.h"

class HTMLFormatter : public IFormatter {
private:
	std::stringstream ss;
protected:
public:
	void start_document() override;
	void end_document() override;

	void add_header(const std::string&, const std::string& date) override;
	void add_paragraph(const std::string& text) override;
	void add_table(const std::vector<std::string>& headers, const std::vector<std::vector<std::string>>& rows) override;
	void add_footer(const std::string& employee_sign) override;

	std::string get_result() override;
};