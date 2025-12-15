#include "WarehouseSys/repositories/inventory_transaction_repository.h"

std::vector<InventoryTransaction> InventoryTransactionRepository::find_by_product_and_date_range(int product_id, const std::string& date_from, const std::string& date_to)
{
    std::vector<InventoryTransaction> result;

    std::string query =
        "SELECT * FROM " + InventoryTransaction::TABLE_NAME +
        " WHERE product_id = " + std::to_string(product_id) +
        " AND timestamp >= '" + date_from + "'" +
        " AND timestamp < ('" + date_to + "'::date + INTERVAL '1 day')" +
        " ORDER BY timestamp ASC";

    try {
        _session->fetch(query,
            [&result](const IDBRow& row) {
                InventoryTransaction transaction;
                transaction.from_db_row(row);
                result.push_back(transaction);
            }
        );
    }
    catch (const std::exception& e) {
        std::cerr
            << "Error in InventoryTransactionRepository::find_by_product_and_date_range: "
            << e.what()
            << std::endl;
        throw;
    }

    return result;
}

std::optional<InventoryTransaction> InventoryTransactionRepository::find_last_before_date(int product_id, const std::string& date_to)
{
    std::optional<InventoryTransaction> result;
    bool founded = false;

    std::string query =
        "SELECT * FROM " + InventoryTransaction::TABLE_NAME +
        " WHERE product_id = " + std::to_string(product_id) +
        " AND timestamp < ('" + date_to + "'::date + INTERVAL '1 day')" +
        " ORDER BY timestamp DESC" +
        " LIMIT 1";

    try {
        _session->fetch(query,
            [&result, &founded](const IDBRow& row) {
                if (founded) {
                    return;
                }

                InventoryTransaction tx;
                tx.from_db_row(row);
                result = tx;
                founded = true;
            }
        );
    }
    catch (const std::exception& e) {
        std::cerr
            << "Error in InventoryTransactionRepository::find_last_before_date: "
            << e.what()
            << std::endl;
        throw;
    }

    return result;
}
