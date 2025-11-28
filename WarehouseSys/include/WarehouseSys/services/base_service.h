#pragma once

#include "i_service.h"
#include "repositories/i_repository.h"

template<typename T>
class BaseService : public IService<T> {
protected:
	std::shared_ptr<IRepository<T>> _repository;

public:
	BaseService(std::shared_ptr<IRepository<T>> repository)
		: _repository(std::move(repository)) {}

	virtual ~BaseService() = default;

	std::vector<T> get_all() override;
	std::optional<T> get_by_id(size_t id) override;
	T create(T& itme) override;
	std::optional<T> delete_by_id(size_t id) override;
	T edit_by_id(size_t id, T& item) override;
	std::vector<T> find_by_column(const std::string& column_name, const std::string& value) override;
};


template<typename T>
std::vector<T> BaseService<T>::get_all() {
	return _repository->get_all();
}

template<typename T>
std::optional<T> BaseService<T>::get_by_id(size_t id) {
	return _repository->get_by_id(id);
}

template<typename T>
T BaseService<T>::create(T& item) {
	return _repository->create(item);
}

template<typename T>
std::optional<T> BaseService<T>::delete_by_id(size_t id) {
	return _repository->delete_by_id(id);
}

template<typename T>
T BaseService<T>::edit_by_id(size_t id, T& item) {
	return _repository->edit_by_id(id, item);
}

template<typename T>
std::vector<T> BaseService<T>::find_by_column(const std::string& column_name, const std::string& value) {
	return _repository->find_by_column(column_name, value);
}