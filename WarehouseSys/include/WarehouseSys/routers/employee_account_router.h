#pragma once

#include "base_router.h"
#include "models/employee_account.h"
#include "controllers/emloyee_account_controller.h"

class EmployeeAccountRouter : public BaseRouter<EmployeeAccount> {
private:
	std::shared_ptr<EmployeeAccountController> _specific_controller;
protected:
public:
	EmployeeAccountRouter(std::shared_ptr<IController<EmployeeAccount>> controller)
		: BaseRouter<EmployeeAccount>(std::move(controller)) {
		_specific_controller = std::dynamic_pointer_cast<EmployeeAccountController>(_controller);

		if (!_specific_controller) {
			CROW_LOG_ERROR << "EmployeeAccountRouter: Controller is not of type EmployeeAccountController!";
		}
	}

	void register_routes(crow::App<crow::CORSHandler>& app) override;

	void model_register_routes(crow::App<crow::CORSHandler>& app);
};