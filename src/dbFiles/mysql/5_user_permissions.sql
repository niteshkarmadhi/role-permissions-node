CREATE TABLE user_permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    permission_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);
