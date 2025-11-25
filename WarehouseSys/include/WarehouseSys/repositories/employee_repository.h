#pragma once

#include "base_repository.h"
#include "models/employee.h"

class EmployeeRepository : public BaseRepository<Employee> {
public:
	EmployeeRepository(std::shared_ptr<IDBSession> session)
		: BaseRepository<Employee>(std::move(session)) {}
};