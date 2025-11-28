#pragma once

#include "base_controller.h"
#include "models/employee_account.h"

class EmployeeAccountController : public BaseController<EmployeeAccount> {
private:
protected:
public:
	EmployeeAccountController(std::shared_ptr<IService<EmployeeAccount>> service)
		: BaseController<EmployeeAccount>(std::move(service)) {}
};