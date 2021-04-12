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

module.exports.insertChallengeRequest = (userId, otherUserId) => {
    return db.query(
        `INSERT INTO challenges (sender_id, recipient_id) VALUES($1, $2)`,
        [userId, otherUserId]
    );
};

module.exports.getChallengeStatus = (userId) => {
    return db.query(
        `SELECT statistic.id, statistic.username, accepted, recipient_id, sender_id
  FROM challenges
  JOIN statistic
  ON (accepted = false AND recipient_id = $1 AND sender_id = statistic.id) 
  OR (accepted = false AND sender_id = $1 AND recipient_id = statistic.id) 
  OR (accepted = true AND recipient_id = $1 AND sender_id = statistic.id)
  OR (accepted = true AND sender_id = $1 AND recipient_id = statistic.id)`,
        [userId]
    );
};
