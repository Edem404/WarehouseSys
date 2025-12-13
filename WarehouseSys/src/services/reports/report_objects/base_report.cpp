#include "WarehouseSys/services/reports/report_objects/base_report.h"
#include <cmath>

std::string BaseReport::generate(std::shared_ptr<IFormatter> formatter, DocumentData& data) {
    formatter->start_document();
    set_title(data);
    formatter->add_header(data.get_title(), data.get_generated_date());

    compose_body(formatter, data);

    std::string signer = "Unknown";
    if (data.get_employee().has_value()) {
        auto e = data.get_employee().value();
        signer = e.get_name() + " " + e.get_surname();
    }

    double total_sum = 0;

    for (const auto& t : data.get_transactions()) {
        const Product* p = data.find_product_by_id(t.get_product_id());
        if (p) {
            total_sum += std::abs(t.get_quantity_change()) * p->get_price();
        }
    }

    formatter->add_footer(signer);
    formatter->end_document();

    return formatter->get_result();
}