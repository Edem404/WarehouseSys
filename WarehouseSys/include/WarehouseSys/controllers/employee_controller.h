#pragma once

#include "base_controller.h"
#include "models/employee.h"

class EmployeeController : public BaseController<Employee> {
private:
protected:
public:
	EmployeeController(std::shared_ptr<IService<Employee>> service)
		: BaseController<Employee>(std::move(service)) {}
};