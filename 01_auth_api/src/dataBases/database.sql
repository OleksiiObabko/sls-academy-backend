CREATE TABLE "user"
(
    id       TEXT PRIMARY KEY,
    email    VARCHAR(225),
    password TEXT
);

CREATE TABLE oauth
(
    user_id      TEXT,
    accessToken  VARCHAR(225),
    refreshToken VARCHAR(225),
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);
