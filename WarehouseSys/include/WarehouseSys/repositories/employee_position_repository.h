#pragma once

#include "base_repository.h"
#include "models/employee_position.h"

class EmployeePositionRepository : public BaseRepository<EmployeePosition> {
public:
	EmployeePositionRepository(std::shared_ptr<IDBSession> session)
		: BaseRepository<EmployeePosition>(std::move(session)) {}
};