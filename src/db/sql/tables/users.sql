-- Create the `users` table
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    id_type INT NOT NULL,
    document VARCHAR(20) UNIQUE NOT NULL,
    phone VARCHAR(15),
    id_role INT NOT NULL,
    address VARCHAR(255),
    id_auth VARCHAR(50) UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
COMMIT;