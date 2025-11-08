#pragma once

#include "i_dto.h"

class ProductType : public IDTO {
private:
public:
	void from_db_row(const IDBRow& row) override;
	nlohmann::json to_json() const override;
protected:
};