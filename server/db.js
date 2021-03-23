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

module.exports.getOnlinePlayersByIds = (arrayOfIds) => {
    return db.query(
        `SELECT id, username FROM statistic WHERE id = ANY($1)`,
        [arrayOfIds]
    );
};