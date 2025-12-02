#include <soci/soci.h>
#include "idb_session.h"
#include "idb_row.h"
#include "soci_row.h"
#include <soci/postgresql/soci-postgresql.h>

class SociSession : public IDBSession {
private:
	soci::session& db_;
	std::string connection_string;

	soci::session local_soci_session() const {
		return soci::session(soci::postgresql, connection_string);
	}
public:
	explicit SociSession(soci::session& db, const std::string& conn) : db_(db), connection_string(conn) {}

	std::shared_ptr<IDBSession> local_session() const override;
	void execute(const std::string& query) override;
	void fetch(const std::string& query,
		std::function<void(const IDBRow&)> callback) override;
protected:
};