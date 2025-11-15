#pragma once

#include "base_controller.h"
#include "models/employee_position.h"

class EmployeePositionController : public BaseController<EmployeePosition> {
private:
protected:
public:
	EmployeePositionController(std::shared_ptr<IService<EmployeePosition>> service) 
		: BaseController<EmployeePosition>(std::move(service)) {}
};