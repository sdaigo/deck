import { Database } from "bun:sqlite";
import { today } from "../utils";
import { Note } from "./schema";

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

export const dump = () => {
  const query = db
    .query(
      `SELECT id, text, DATETIME(created_at, 'localtime') AS created_at FROM note WHERE DATE(created_at, 'localtime') = "${today()}"`,
    )
    .as(Note);
  return query.all();
};

export const dumpByDate = (date: string) => {
  const query = db
    .query(
      "SELECT id, text, DATETIME(created_at, 'localtime') AS created_at FROM note WHERE DATE(created_at, 'localtime') = ?",
    )
    .as(Note);
  return query.all(date);
};
