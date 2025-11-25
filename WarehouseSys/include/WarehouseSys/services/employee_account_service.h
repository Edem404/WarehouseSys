#pragma once

#include "base_service.h"
#include "models/employee_account.h"

class EmployeeAccountService : public BaseService<EmployeeAccount> {
	EmployeeAccountService(std::shared_ptr<IRepository<EmployeeAccount>> repository)
		: BaseService<EmployeeAccount>(std::move(repository)) {}
};