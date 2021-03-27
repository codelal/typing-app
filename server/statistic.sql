    DROP TABLE IF EXISTS statistic cascade;
  
    CREATE TABLE statistic(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL CHECK (username != ''),
    correct VARCHAR,
    incorrect VARCHAR,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO statistic (username) VALUES ('player1');
INSERT INTO statistic (username) VALUES ('player2');
INSERT INTO statistic (username) VALUES ('player3');