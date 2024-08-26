import { Database } from "bun:sqlite";

const db = new Database("./db.sqlite"); // root dir
db.exec("PRAGMA journal_mode = WAL;");

export const init = db.prepare(`CREATE TABLE IF NOT EXISTS note (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);

export const create = (text: string) => {
  const query = db.query("INSERT INTO note (text) VALUES (?)");
  query.run(text);
};

export const list = () => {
  const query = db.query("Select text from note");
  return query.all();
};
