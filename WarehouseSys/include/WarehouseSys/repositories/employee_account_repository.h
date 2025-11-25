#pragma once

#include "base_repository.h"
#include "models/employee_account.h"

class EmployeeAccountRepository : public BaseRepository<EmployeeAccount> {
public:
	EmployeeAccountRepository(std::shared_ptr<IDBSession> session)
		: BaseRepository<EmployeeAccount>(std::move(session)) {}
};