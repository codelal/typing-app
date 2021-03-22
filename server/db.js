const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/typing-app"
);

module.exports.insertUserName = (userName) => {
    return db.query(
        `INSERT INTO statistic (username) VALUES ($1) RETURNING id`,
        [userName]
    );
};
