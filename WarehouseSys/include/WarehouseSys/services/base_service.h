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
};


template<typename T>
std::vector<T> BaseService<T>::get_all() {
	return _repository->get_all();
}