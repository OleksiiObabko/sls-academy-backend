CREATE TABLE "user"
(
    id       UUID PRIMARY KEY,
    email    VARCHAR(225),
    password TEXT
);

CREATE TABLE oauth
(
    user_id      UUID,
    "accessToken"  TEXT,
    "refreshToken" TEXT,
    FOREIGN KEY (user_id) REFERENCES "user" (id)
);
