#include "WarehouseSys.h"

using json = nlohmann::json;

int main()
{
    // load configs for database
    json config = [&]() {
        std::ifstream file(std::string(CONFIGS_DIR) + "/db_config.json");
        if (!file.is_open())
            throw std::runtime_error("Cannot open configuration file");
        std::stringstream buffer;
        buffer << file.rdbuf();
        return json::parse(buffer.str());
    }();

    const std::string user = config["username"];
    const std::string password = config["password"];
    const std::string dbname = config["database_name"];
    const std::string host = config["host"];

    try
    {
        // minor checks
        soci::session sys_sql(soci::postgresql,
            "host=" + host + " dbname=postgres user=" + user + " password=" + password);

        int count = 0;
        sys_sql << "SELECT COUNT(*) FROM pg_database WHERE datname=:dbname",
            soci::use(dbname), soci::into(count);

        if (count == 0)
        {
            std::cout << "Database " << dbname << " does not exist. Creating..." << std::endl;
            sys_sql << "CREATE DATABASE " + dbname;
            std::cout << "Database " << dbname << " successfully created." << std::endl;
        }
        else
        {
            std::cout << "Database " << dbname << " already exists." << std::endl;
        }

        // main database connection
        soci::session sql(soci::postgresql,
            "host=" + host + " dbname=" + dbname + " user=" + user + " password=" + password);

        std::cout << "Connected to " << dbname << " successfully!" << std::endl;

        // --- Crow server init---
        crow::SimpleApp app;

        // get count of records in table
        CROW_ROUTE(app, "/count").methods("GET"_method)
            ([&sql]() {
                json result;
                try {
                        int table_count = 0;
                        sql << "SELECT COUNT(*) FROM test_table", soci::into(table_count);
                        result["row_count"] = table_count;
                }
                catch (const std::exception& e) {
                    result["error"] = e.what();
                }
                return crow::response(result.dump());
            });

        CROW_ROUTE(app, "/").methods("GET"_method)
            ([]() {
            return "WarehouseSysDebug \n available routes:\n/count\n";
            });
        // run server on port 8080
        app.port(8080).multithreaded().run();
    }
    catch (const std::exception& e)
    {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}
