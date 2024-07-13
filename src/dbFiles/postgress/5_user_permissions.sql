CREATE TABLE user_permissions (
    id SERIAL PRIMARY KEY,
    permission_id INT NOT NULL REFERENCES permissions(id),
    user_id INT NOT NULL
);