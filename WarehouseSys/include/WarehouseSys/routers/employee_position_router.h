#pragma once

#include "base_router.h"
#include "models/employee_position.h"

class EmployeePositionRouter : public BaseRouter<EmployeePosition> {
private:
protected:
public:
	EmployeePositionRouter(std::shared_ptr<IController<EmployeePosition>> controller) 
		: BaseRouter<EmployeePosition>(std::move(controller)) {}
};