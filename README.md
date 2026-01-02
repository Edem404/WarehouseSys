How to install and run WarehouseSys step-by-step

Backend
1. Clone repository or download .zip from git
2. Download CMake from https://cmake.org/download/ and add CMake to the systme PATH
3. Download MSVC compiler and Visual Studio from https://visualstudio.microsoft.com/downloads/
4. Download PostgreSQL 17+ from https://www.postgresql.org/download/windows/. Important!!! Download path should be C:\Program Files\PostgreSQL\17
5. To download SOCI you need:
  5.1. Create folde C:\Libraries
  5.2. Clone SOCI repository into this folder from https://github.com/SOCI/soci
  5.3. Build SOCI for Windows. Important turn-on PostgreSQL support.
   * cd C:\Libraries\soci
   * mkdir build
   * cd build
   * cmake -G "Visual Studio 17 2022" -A x64 -DCMAKE_INSTALL_PREFIX="C:/Libraries/soci/build" -DSOCI_CXX11=ON -DSOCI_POSTGRESQL=ON ..
   * cmake --build . --config Release --target install
   * cmake --build . --config Debug --target install
6. Create build folder on the same level as backend and frontend of the WarehouseSys
   * mkdir out
   * cd out
   * mkdir build
7. Build WarehouseSys project
   * cd build
   * cmake ..
   * compile project cmake --build . --config Debug / cmake --build . --config Release
8. Run WarehouseSys_table_script.db to create database and tables
9. Create folder configs in backend part
   * cd path_to_cloned_repo/WarehouseSys
   * mkdir configs
   * In configs folder create db_config.json file and paste next data into it
   * {
      "username": "your_user_name",
      "password": "your_passwor",
      "database_name": "warehouse_db",
      "host": "localhost"
    } 
   * save changes in db_config.json
10. Now you can run created .exe file with backend

Frontend
1. Download Node.js from https://nodejs.org/
2. cd WarehouseSysFrontend
3. Instlall dependencies using npm install command
4. Now you cand run npm run dev command
   
