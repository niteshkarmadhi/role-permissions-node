CREATE TABLE group_has_permissions (
    id SERIAL PRIMARY KEY,
    group_id INT NOT NULL REFERENCES groups(id),
    permission_id INT NOT NULL REFERENCES permissions(id)
);