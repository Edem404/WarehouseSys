#pragma once

#include "i_dto.h"
#include "product_type.h"

class Product : public IDTO {
private:
	int id{};
	std::string name;
	int quantity{};
	double price{};
	int product_type_id{};
public:
	void from_db_row(const IDBRow& row) override;
	nlohmann::json to_json() const override;
protected:
};