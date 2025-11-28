#pragma once

#include "base_router.h"
#include "models/employee.h"

class EmployeeRouter : public BaseRouter<Employee> {
private:
protected:
public:
	EmployeeRouter(std::shared_ptr<IController<Employee>> controller)
		: BaseRouter<Employee>(std::move(controller)) {}
};