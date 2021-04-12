const mysql = require('mysql2');

const connection = () => {
  const conn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
  });

  conn.connect((err) => {
    if (err) {
      console.log(`connectionRequest Failed ${err.stack}`);
    } else {
      console.log(`DB connectionRequest Successful`);
    }
  });

  return conn;
}

const createSchema = () => {
  const query = `CREATE TABLE IF NOT EXISTS todo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status TINYINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted TINYINT NOT NULL DEFAULT 0
  ) ENGINE=INNODB;`;
  const db = connection();
  db.query(query, (err, rows) => {
    if (err) throw err;
    console.log('table created');
  });
  db.end();
}

module.exports = {
  connection,
  createSchema,
}
