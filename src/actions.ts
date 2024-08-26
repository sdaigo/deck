import { create, list } from "./store";

export function createNote(note: string) {
  try {
    create(note);
    console.log("✔ created");
  } catch (error) {
    console.error(`Error creating note: ${error}`);
  }
}

export function listNotes(pretty = false) {
  try {
    const notes = list();
    console.dir(notes);
  } catch (error) {
    console.error(`Error listing notes: ${error}`);
  }
}
