#include <soci/soci.h>
#include "idb_session.h"
#include "idb_row.h"
#include "soci_row.h"

class SociSession : public IDBSession {
private:
	soci::session& db_;
public:
	explicit SociSession(soci::session& db) : db_(db) {}

	void execute(const std::string& query) override;
	//void fetch(const std::string& query,
	//	std::function<void(const std::shared_ptr<IDBRow>&)> callback) override;

	void fetch(const std::string& query,
		std::function<void(const IDBRow&)> callback) override;
protected:
};