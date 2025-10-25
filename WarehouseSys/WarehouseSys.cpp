#include "WarehouseSys.h"

using json = nlohmann::json;
int main()
{   
    json config = [&]() {
        std::ifstream file(std::string(CONFIGS_DIR) + "/db_config.json");
        if (!file.is_open()) throw std::runtime_error("Cannot open file");
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
        // 1. Connect to the system database 'postgres' to check/create our target database
        soci::session sys_sql(soci::postgresql,
            "host=" + host + " dbname=postgres user=" + user + " password=" + password);

        // 2. Check if database 'testdb' exists
        int count = 0;
        sys_sql << "SELECT COUNT(*) FROM pg_database WHERE datname=:dbname", soci::use(dbname), soci::into(count);

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

        // 3. Connect to the new or existing database 'testdb'
        soci::session sql(soci::postgresql,
            "host=" + host + " dbname=" + dbname + " user=" + user + " password=" + password);

        std::cout << "Connected to " << dbname << " successfully!" << std::endl;

        // 5. Fetch all rows from 'test_table' and print them
        soci::rowset<soci::row> rs = (sql.prepare << "SELECT * FROM test_table");

        std::cout << "\nData from test_table:" << std::endl;
        for (auto it = rs.begin(); it != rs.end(); ++it)
        {
            const soci::row& r = *it;
            int id = r.get<int>("id");
            std::string name = r.get<std::string>("name");
            std::cout << "id=" << id << ", name=" << name << std::endl;
        }
    }
    catch (const std::exception& e)
    {
        std::cerr << "Error: " << e.what() << std::endl;
        return 1;
    }

    return 0;
}
