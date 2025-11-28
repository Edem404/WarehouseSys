cmake_minimum_required(VERSION 3.10)
project(WarehouseSys)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Include directories
include_directories(
    ${PROJECT_SOURCE_DIR}                # for WarehouseSys.h / WarehouseSys.cpp
    ${PROJECT_SOURCE_DIR}/include        # own headers
    ${PROJECT_SOURCE_DIR}/include/WarehouseSys
    C:/Libraries/soci/include            # SOCI include
    C:/Libraries/soci/build/include      # SOCI build include (here soci-config.h)
)

# Add macros for DLL SOCI (#define DSOCI_DLL)
add_definitions(-DSOCI_DLL)
add_compile_definitions(CONFIGS_DIR="${PROJECT_SOURCE_DIR}/configs")

if(MSVC)
    add_compile_options(/bigobj)
endif()

# Create executable file
add_executable(WarehouseSys WarehouseSys.cpp     "include/WarehouseSys/database/idb_session.h"  "include/WarehouseSys/database/soci_session.h"  "include/WarehouseSys/database/idb_row.h" "include/WarehouseSys/database/soci_row.h" "include/WarehouseSys/models/product.h" "include/WarehouseSys/models/employee.h"  "include/WarehouseSys/models/i_dto.h" "src/models/product.cpp" "src/models/employee.cpp" "include/WarehouseSys/models/employee_position.h" "src/models/employee_position.cpp" "include/WarehouseSys/models/product_type.h" "src/models/product_type.cpp" "include/WarehouseSys/controllers/employee_position_controller.h" "include/WarehouseSys/repositories/i_repository.h" "src/database/soci_session.cpp"   "include/WarehouseSys/repositories/base_repository.h" "include/WarehouseSys/repositories/employee_position_repository.h" "include/WarehouseSys/services/i_service.h" "include/WarehouseSys/services/base_service.h" "include/WarehouseSys/controllers/i_controller.h" "include/WarehouseSys/controllers/base_controller.h" "include/WarehouseSys/services/employee_position_service.h" "include/WarehouseSys/routers/i_router.h" "include/WarehouseSys/routers/base_router.h" "include/WarehouseSys/routers/employee_position_router.h" "include/WarehouseSys/models/supplier.h" "src/models/supplier.cpp" "include/WarehouseSys/models/employee_account.h" "src/models/employee_account.cpp" "include/WarehouseSys/controllers/employee_controller.h" "include/WarehouseSys/controllers/emloyee_account_controller.h" "include/WarehouseSys/controllers/product_controller.h" "include/WarehouseSys/controllers/product_type_controller.h" "include/WarehouseSys/controllers/supplier_controller.h" "include/WarehouseSys/repositories/employee_repository.h" "include/WarehouseSys/repositories/employee_account_repository.h" "include/WarehouseSys/repositories/product_repository.h" "include/WarehouseSys/repositories/product_type_repository.h" "include/WarehouseSys/repositories/supplier_repository.h" "include/WarehouseSys/services/employee_service.h" "include/WarehouseSys/services/employee_account_service.h" "include/WarehouseSys/services/product_service.h" "include/WarehouseSys/services/product_type_service.h" "include/WarehouseSys/services/supplier_service.h" "include/WarehouseSys/routers/employee_router.h" "include/WarehouseSys/routers/employee_account_router.h" "include/WarehouseSys/routers/product_router.h" "include/WarehouseSys/routers/product_type_router.h" "include/WarehouseSys/routers/supllier_router.h")

# Pathes to SOCI and PostgreSQL libs
set(SOCI_LIB_DIR "C:/Libraries/soci/build/lib")
set(SOCI_DLL_DIR "C:/Libraries/soci/build/bin")
set(POSTGRES_DLL_DIR "C:/Program Files/PostgreSQL/17/bin")

# Linking with absolute libs for Release and Debug
target_link_libraries(WarehouseSys PRIVATE
    # Release
    $<$<CONFIG:Release>:${SOCI_LIB_DIR}/Release/soci_core_4_2.lib>
    $<$<CONFIG:Release>:${SOCI_LIB_DIR}/Release/soci_postgresql_4_2.lib>
    # Debug
    $<$<CONFIG:Debug>:${SOCI_LIB_DIR}/Debug/soci_core_4_2.lib>
    $<$<CONFIG:Debug>:${SOCI_LIB_DIR}/Debug/soci_postgresql_4_2.lib>
    ws2_32
)

# Auto copy DLL into directory with .exe after compilation
add_custom_command(TARGET WarehouseSys POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_if_different
        # SOCI DLL
        $<$<CONFIG:Release>:${SOCI_DLL_DIR}/Release/soci_core_4_2.dll>
        $<$<CONFIG:Release>:${SOCI_DLL_DIR}/Release/soci_postgresql_4_2.dll>
        $<$<CONFIG:Debug>:${SOCI_DLL_DIR}/Debug/soci_core_4_2.dll>
        $<$<CONFIG:Debug>:${SOCI_DLL_DIR}/Debug/soci_postgresql_4_2.dll>
        # PostgreSQL DLL
        $<$<CONFIG:Release>:${POSTGRES_DLL_DIR}/libpq.dll>
        $<$<CONFIG:Release>:${POSTGRES_DLL_DIR}/libintl-9.dll>
        $<$<CONFIG:Release>:${POSTGRES_DLL_DIR}/libiconv-2.dll>
        $<$<CONFIG:Debug>:${POSTGRES_DLL_DIR}/libpq.dll>
        $<$<CONFIG:Debug>:${POSTGRES_DLL_DIR}/libintl-9.dll>
        $<$<CONFIG:Debug>:${POSTGRES_DLL_DIR}/libiconv-2.dll>
        $<TARGET_FILE_DIR:WarehouseSys>
)
