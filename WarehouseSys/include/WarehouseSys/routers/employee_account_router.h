#pragma once

#include "base_router.h"
#include "models/employee_account.h"

class EmployeeAccountRouter : public BaseRouter<EmployeeAccount> {
private:
protected:
public:
	EmployeeAccountRouter(std::shared_ptr<IController<EmployeeAccount>> controller)
		: BaseRouter<EmployeeAccount>(std::move(controller)) {}
};