#pragma once

#include "i_formatter.h"

class HTMLFormatter : public IFormatter {
private:
	std::stringstream ss;
protected:
public:
	void start_document() override;
	void end_document() override;

	void add_header(const std::string& title) override;
	void add_paragraph(const std::string& text) override;
	void add_table(std::vector<std::string> headers, std::vector<std::string> rows) override;
	void add_footer(std::string employee_sign) override;

	std::string get_result() override;
};