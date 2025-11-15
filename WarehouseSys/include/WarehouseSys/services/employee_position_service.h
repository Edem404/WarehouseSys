#pragma once

#include "base_service.h"
#include "models/employee_position.h"

class EmployeePositionService : public BaseService<EmployeePosition> {
public:
    EmployeePositionService(std::shared_ptr<IRepository<EmployeePosition>> repository)
        : BaseService<EmployeePosition>(std::move(repository)) {}
};