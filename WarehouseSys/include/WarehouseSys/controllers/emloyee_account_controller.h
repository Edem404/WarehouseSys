#pragma once

#include "base_controller.h"
#include "models/employee_account.h"

class EmployeeaAccountController : public BaseController<EmployeeAccount> {
private:
protected:
public:
	EmployeeaAccountController(std::shared_ptr<IService<EmployeeAccount>> service)
		: BaseController<EmployeeAccount>(std::move(service)) {}
};