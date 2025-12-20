#include "./services/reports/report_objects/report_template_registry.h"

#include <stdexcept>

void ReportTemplateRegistry::register_template(ReportType type, IReportTemplate& template_ref) {
    _templates[type] = &template_ref;
}

IReportTemplate& ReportTemplateRegistry::resolve(ReportType type) const {
    auto it = _templates.find(type);
    if (it == _templates.end() || it->second == nullptr)
    {
        throw std::runtime_error("ReportTemplateRegistry: unsupported or unregistered report type");
    }

    return *(it->second);
}