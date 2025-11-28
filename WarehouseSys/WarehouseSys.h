// WarehouseSys.h : Include file for standard system include files,
// or project specific include files.

#pragma once

#ifndef SOCI_DLL
	#define SOCI_DLL
#endif

#include <iostream>
#include <fstream>
#include <sstream>
#include <soci/soci.h>
#include <soci/postgresql/soci-postgresql.h>
#include <string>
#include <json.hpp>
#include <crow.h>
#include <crow/middlewares/cors.h>
#include "database/soci_row.h"
#include "WarehouseSys/database/soci_session.h"

//repositories
#include <repositories/employee_position_repository.h>
#include <repositories/employee_repository.h>
#include <repositories/employee_account_repository.h>
#include <repositories/product_type_repository.h>
#include <repositories/product_repository.h>
#include <repositories/supplier_repository.h>

//services
#include <services/employee_position_service.h>
#include <services/employee_service.h>
#include <services/employee_account_service.h>
#include <services/product_type_service.h>
#include <services/product_service.h>
#include <services/supplier_service.h>

//controllers
#include <controllers/employee_position_controller.h>
#include <controllers/employee_controller.h>
#include <controllers/emloyee_account_controller.h>
#include <controllers/product_type_controller.h>
#include <controllers/product_controller.h>
#include <controllers/supplier_controller.h>

//routers
#include <routers/employee_position_router.h>
#include <routers/employee_router.h>
#include <routers/employee_account_router.h>
#include <routers/product_type_router.h>
#include <routers/product_router.h>
#include <routers/supllier_router.h>

// TODO: Reference additional headers your program requires here.
