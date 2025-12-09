#pragma once

#include <vector>
#include <string>
#include <sstream>

/*
* @brief: Abstract strategy
*/
class IFormatter {
private:
protected:
public:
	virtual ~IFormatter() = default;

	virtual void start_document() = 0;
	virtual void end_document() = 0;

	virtual void add_header(const std::string& title, const std::string& date) = 0;
	virtual void add_paragraph(const std::string& text) = 0;
	virtual void add_table(const std::vector<std::string>& headers, const std::vector<std::vector<std::string>>& rows) = 0;
	virtual void add_footer(const std::string& employee_sign) = 0;

	virtual std::string get_result() = 0;
};