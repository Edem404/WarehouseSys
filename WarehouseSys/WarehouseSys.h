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

#include "WarehouseSys/routers/employee_position_router.h"
#include <repositories/employee_position_repository.h>
#include <services/employee_position_service.h>
#include <controllers/employee_position_controller.h>
#include <routers/employee_position_router.h>

// TODO: Reference additional headers your program requires here.
