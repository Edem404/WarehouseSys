#include "WarehouseSys/controllers/emloyee_account_controller.h"

std::pair<int, json> EmployeeAccountController::login(const std::string& email, const std::string& password) {
    try {
        std::vector<EmployeeAccount> users = _service->find_by_column("email", email);

        if (users.empty()) {
            return { 404, json({{"message", "User with this email not found"}}) };
        }

        const auto& user = users[0];

        if (user.get_password_hash() == password) {

            json response;
            response["employee_id"] = user.get_employee_id();
            response["email"] = user.get_email();

            return { 200, response };
        }
        else {
            return { 401, json({{"message", "Invalid credentials"}}) };
        }

    }
    catch (const std::exception& e) {
        return { 500, json({{"error", std::string("Login error: ") + e.what()}}) };
    }
}