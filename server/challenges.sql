DROP TABLE IF EXISTS challenges;

CREATE TABLE challenges(
  id SERIAL PRIMARY KEY,
  sender_id INT REFERENCES statistic(id) NOT NULL,
  recipient_id INT REFERENCES statistic(id) NOT NULL,
  accepted BOOLEAN DEFAULT false
);


INSERT INTO challenges(sender_id, recipient_id, accepted ) VALUES (1, 2, false);
INSERT INTO challenges(sender_id, recipient_id, accepted ) VALUES (2, 3, false);
INSERT INTO challenges(sender_id, recipient_id, accepted ) VALUES (1, 4, true);