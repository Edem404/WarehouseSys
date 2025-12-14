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
add_executable(WarehouseSys WarehouseSys.cpp     "include/WarehouseSys/database/idb_session.h"  "include/WarehouseSys/database/soci_session.h"  "include/WarehouseSys/database/idb_row.h" "include/WarehouseSys/database/soci_row.h" "include/WarehouseSys/models/product.h" "include/WarehouseSys/models/employee.h"  "include/WarehouseSys/models/i_dto.h" "src/models/product.cpp" "src/models/employee.cpp" "include/WarehouseSys/models/employee_position.h" "src/models/employee_position.cpp" "include/WarehouseSys/models/product_type.h" "src/models/product_type.cpp" "include/WarehouseSys/controllers/employee_position_controller.h" "include/WarehouseSys/repositories/i_repository.h" "src/database/soci_session.cpp"   "include/WarehouseSys/repositories/base_repository.h" "include/WarehouseSys/repositories/employee_position_repository.h" "include/WarehouseSys/services/i_service.h" "include/WarehouseSys/services/base_service.h" "include/WarehouseSys/controllers/i_controller.h" "include/WarehouseSys/controllers/base_controller.h" "include/WarehouseSys/services/employee_position_service.h" "include/WarehouseSys/routers/i_router.h" "include/WarehouseSys/routers/base_router.h" "include/WarehouseSys/routers/employee_position_router.h" "include/WarehouseSys/models/supplier.h" "src/models/supplier.cpp" "include/WarehouseSys/models/employee_account.h" "src/models/employee_account.cpp" "include/WarehouseSys/controllers/employee_controller.h" "include/WarehouseSys/controllers/emloyee_account_controller.h" "include/WarehouseSys/controllers/product_controller.h" "include/WarehouseSys/controllers/product_type_controller.h" "include/WarehouseSys/controllers/supplier_controller.h" "include/WarehouseSys/repositories/employee_repository.h" "include/WarehouseSys/repositories/employee_account_repository.h" "include/WarehouseSys/repositories/product_repository.h" "include/WarehouseSys/repositories/product_type_repository.h" "include/WarehouseSys/repositories/supplier_repository.h" "include/WarehouseSys/services/employee_service.h" "include/WarehouseSys/services/employee_account_service.h" "include/WarehouseSys/services/product_service.h" "include/WarehouseSys/services/product_type_service.h" "include/WarehouseSys/services/supplier_service.h" "include/WarehouseSys/routers/employee_router.h" "include/WarehouseSys/routers/employee_account_router.h" "include/WarehouseSys/routers/product_router.h" "include/WarehouseSys/routers/product_type_router.h" "include/WarehouseSys/routers/supllier_router.h" "src/routers/employee_account_router.cpp" "src/controllers/employee_account_controller.cpp"  "include/WarehouseSys/routers/inventory_transaction_type_router.h" "src/models/inventory_transaction_type.cpp" "include/WarehouseSys/repositories/inventory_transaction_type_repository.h" "include/WarehouseSys/services/inventory_transaction_type_service.h" "include/WarehouseSys/controllers/inventory_transaction_type_controller.h" "include/WarehouseSys/routers/inventory_transaction_type_router.h" "src/models/inventory_transaction.cpp" "include/WarehouseSys/repositories/inventory_transaction_repository.h" "include/WarehouseSys/services/inventory_transaction_service.h" "include/WarehouseSys/controllers/inventory_transaction_controller.h" "src/repositories/product_repository.cpp" "src/services/inventory_transaction_service.cpp" "include/WarehouseSys/notifications/i_stock_observer.h" "include/WarehouseSys/notifications/low_stock_event.h" "include/WarehouseSys/notifications/stock_event_dispatcher.h" "src/services/product_service.cpp" "include/WarehouseSys/notifications/logging_stock_observer.h" "src/controllers/inventory_transaction_controller.cpp" "src/routers/inventory_transaction_router.cpp"    "include/WarehouseSys/services/reports/i_formatter.h" "include/WarehouseSys/services/reports/html_formatter.h"  "src/services/reports/html_formatter.cpp"  "src/services/reports/report_objects/base_report.cpp" "include/WarehouseSys/services/reports/report_objects/i_report_template.h"  "include/WarehouseSys/models/document_data.h" "src/models/document_data.cpp" "include/WarehouseSys/services/reports/report_objects/invoice_report.h" "src/services/reports/report_objects/invoice_report.cpp" "include/WarehouseSys/services/report_service.h"  "include/WarehouseSys/services/reports/report_objects/base_report.h" "include/WarehouseSys/models/document_enum_metadata.h" "src/services/report_service.cpp"  "include/WarehouseSys/controllers/invoice_controller.h" "include/WarehouseSys/routers/invoice_router.h" "src/controllers/invoice_controller.cpp" "src/routers/invoice_router.cpp" "include/WarehouseSys/controllers/report_controller.h" "src/controllers/report_controller.cpp" "include/WarehouseSys/routers/report_router.h" "src/routers/report_router.cpp" "include/WarehouseSys/services/reports/report_objects/act_report.h" "src/services/reports/report_objects/act_report.cpp" "include/WarehouseSys/services/reports/report_objects/financial_report.h" "src/services/reports/report_objects/financial_report.cpp" "include/WarehouseSys/services/reports/report_objects/product_dynamic_report.h" "src/services/reports/report_objects/product_dynamic_report.cpp" "src/repositories/inventory_transaction_repository.cpp")

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
