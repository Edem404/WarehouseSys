CREATE TABLE IF NOT EXISTS suppliers (
    -- id: int -> SERIAL (автоінкремент 1, 2, 3...)
    id SERIAL PRIMARY KEY,

    -- name: std::string -> VARCHAR (обов'язкове поле)
    name VARCHAR(255) NOT NULL,

    -- phone_number: std::string -> VARCHAR
    -- 50 символів достатньо навіть для найдовших форматів
    phone_number VARCHAR(50) NOT NULL,

    -- email: std::string -> VARCHAR
    -- Додав UNIQUE, щоб не було дублікатів по email
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS product_types (
    -- id: int -> SERIAL (auto-incrementing primary key)
    id SERIAL PRIMARY KEY,

    -- type_name: std::string -> VARCHAR
    -- Must be unique to avoid duplicates like "Electronics" and "Electronics"
    type_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,

    -- name: Назва товару
    name VARCHAR(255) NOT NULL,

    -- article: Артикул (SKU). Має бути унікальним для швидкого пошуку на складі.
    article VARCHAR(100) NOT NULL UNIQUE,

    -- quantity: Кількість. Додав обмеження, що не може бути менше 0.
    quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),

    -- price: Ціна. Використовуємо DECIMAL для точних фінансових розрахунків
    -- (12 цифр всього, 2 після коми). double в C++ це добре, але в БД краще фіксована точність.
    price DECIMAL(12, 2) NOT NULL CHECK (price >= 0),

    -- Зовнішні ключі (просто поля int)
    product_type_id INTEGER NOT NULL,
    supplier_id INTEGER NOT NULL,

    -- Опис зв'язків (Constraints)
    
    -- 1. Зв'язок з типами продуктів
    CONSTRAINT fk_product_type
        FOREIGN KEY (product_type_id)
        REFERENCES product_types(id)
        ON DELETE RESTRICT, -- Не можна видалити Тип, якщо існують Товари цього типу

    -- 2. Зв'язок з постачальниками
    CONSTRAINT fk_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id)
        ON DELETE RESTRICT -- Не можна видалити Постачальника, поки є його Товари
);

CREATE TABLE IF NOT EXISTS employee_positions (
    id SERIAL PRIMARY KEY,

    -- position_name: Назва посади (напр. "Менеджер", "Вантажник")
    -- Має бути унікальною, щоб не було дублів
    position_name VARCHAR(100) NOT NULL UNIQUE,

    -- access_level: Рівень доступу (напр. 1 - звичайний, 10 - адмін)
    -- NOT NULL, щоб уникнути невизначеності прав
    access_level INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    
    -- Ім'я та Прізвище обов'язкові
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,

    -- Зовнішній ключ на посаду
    position_id INTEGER NOT NULL,

    -- Обмеження зовнішнього ключа
    CONSTRAINT fk_position
        FOREIGN KEY (position_id)
        REFERENCES employee_positions(id)
        ON DELETE RESTRICT -- Не дозволяє видалити Посаду, якщо на ній є люди
);

CREATE TABLE IF NOT EXISTS employee_accounts (
    id SERIAL PRIMARY KEY,

    -- employee_id: Зв'язок з працівником
    -- UNIQUE гарантує, що один працівник має тільки один акаунт (1-to-1)
    employee_id INTEGER NOT NULL UNIQUE,

    -- email: Логін. Має бути унікальним.
    email VARCHAR(255) NOT NULL UNIQUE,

    -- password_hash: Ніколи не зберігайте чистий пароль! 
    -- Довжини 255 вистачить для будь-якого сучасного хешу (bcrypt, argon2)
    password_hash VARCHAR(255) NOT NULL,

    -- Зовнішній ключ
    CONSTRAINT fk_employee_account
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
        -- ON DELETE CASCADE: Це критично важливо!
        -- Якщо ви видалите працівника з таблиці employees, 
        -- його акаунт видалиться автоматично. Ніяких "мертвих душ".
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inventory_transaction_types (
    id SERIAL PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS inventory_transactions (
    id SERIAL PRIMARY KEY,

    product_id INTEGER NOT NULL,
    employee_id INTEGER NOT NULL,
    transaction_type_id INTEGER NOT NULL,
    quantity_change INTEGER NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Зв’язок з таблицею продуктів
    CONSTRAINT fk_transaction_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE RESTRICT,

    -- Зв’язок з таблицею працівників
    CONSTRAINT fk_transaction_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
        ON DELETE RESTRICT,

    -- Зв’язок з таблицею типів транзакцій
    CONSTRAINT fk_transaction_type
        FOREIGN KEY (transaction_type_id)
        REFERENCES inventory_transaction_types(id)
        ON DELETE RESTRICT
);
