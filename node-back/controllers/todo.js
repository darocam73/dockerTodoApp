const { connection, query } = require('../db');
const TABLE_NAME = 'todo';

const getAll = async (res) => {
  const q = `
    SELECT id, title, description, status, created_at
    FROM ${TABLE_NAME}
    WHERE deleted=0;
  `;

  const db = connection();

  db.query(q, (err, rows) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    if(rows) {
      return res.status(200).send({ data: rows });
    }
    return res.status(500).send();
  });

  db.end();
};

const getById = (req, res) => {
  const { params } = req;
  const q = `
    SELECT id, title, description, status, created_at
    FROM ${TABLE_NAME}
    WHERE id=${params.id} AND deleted=0;
  `;

  const db = connection();

  db.query(q, (err, rows) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    if(rows?.length) {
      return res.status(200).send({ data: rows[0] });
    } else {
      return res.status(404).send({ error: 'Entry not found.' });
    }
  });

  db.end();
};

const add = async (req, res) => {
  const { body } = req;
  if (!body?.title) return res.status(400).send({ error: 'Empty title' });
  const q = `
    INSERT INTO ${TABLE_NAME} (title, description)
    VALUES ("${body.title}", "${body?.description || ''}");
  `;

  const db = connection();

  db.query(q, (err, rows) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    if(rows?.insertId) {
      return res.status(200).send({ id: rows.insertId });
    }
    return res.status(500).send();
  });

  db.end();
};

const update = async (req, res) => {
  const { body, params } = req;
  if (!body?.title)
    return res.status(400).send({ error: 'Missing field. title and description are required.' });
  const q = `
    UPDATE ${TABLE_NAME}
    SET title="${body.title}", description="${body.description || ""}"
    WHERE id=${params.id};
  `;

  const db = connection();

  db.query(q, (err, rows, fields) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    console.log('rows', rows, 'fields', fields)
    if(rows?.affectedRows) {
      return res.status(200).send({ status: 'ok' });
    }
    return res.status(500).send();
  });

  db.end();
};

const remove = async (req, res) => {
  const { params } = req;
  const q = `
    UPDATE ${TABLE_NAME}
    SET deleted=1
    WHERE id=${params.id};
  `;

  const db = connection();

  db.query(q, (err, rows, fields) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    if(rows?.affectedRows) {
      return res.status(200).send({ status: 'ok' });
    } else {
      return res.status(404).send({ error: 'Entry not found.' });
    }
  });

  db.end();
};

const changeStatus = async (req, res) => {
  const { body, params } = req;
  if (typeof body?.status !== 'boolean')
    return res.status(400).send({ error: 'Status key should be in the body and be a boolean value' });
  const q = `
    UPDATE ${TABLE_NAME}
    SET status=${body.status ? 1 : 0}
    WHERE id=${params.id};
  `;

  const db = connection();

  db.query(q, (err, rows) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    if(rows?.affectedRows) {
      return res.status(200).send({ status: 'ok' });
    }
    return res.status(500).send();
  });

  db.end();
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  remove,
  changeStatus,
};
