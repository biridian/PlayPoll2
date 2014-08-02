INSERT INTO playpoll.user (user_id, username, password) VALUES (1, 'user', '5f4dcc3b5aa765d61d8327deb882cf99');
INSERT INTO playpoll.role (role_id, role_name) VALUES (1, 'ROLE_USER');
INSERT INTO playpoll.user_role (user_id, role_id) VALUES (1, 1);