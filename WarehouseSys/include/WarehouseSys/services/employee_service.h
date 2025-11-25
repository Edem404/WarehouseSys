#pragma once

#include "base_service.h"
#include "models/employee.h"

class EmployeeService : public BaseService<Employee> {
public:
	EmployeeService(std::shared_ptr<IRepository<Employee>> repository)
		: BaseService<Employee>(std::move(repository)) {}
};