CREATE TABLE user_groups (
    id SERIAL PRIMARY KEY,
    group_id INT NOT NULL REFERENCES groups(id),
    user_id INT NOT NULL
);
