import { R, pipe } from "@mobily/ts-belt";
import { create, dump, dumpByDate } from "./store";
import type { Note } from "./store/schema";

export function put(line: string) {
  console.log(line);
}

export function createNote(note: string) {
  pipe(
    R.fromExecution(() => create(note)),
    R.match(
      () => {
        /** */
      },
      () => put("Failed to creating note"),
    ),
  );
}

function listNotes(notes: Note[]) {
  for (const note of notes) {
    put(note.toFormatString());
  }
}

export function dumpNotes() {
  pipe(
    R.fromExecution(() => dump()),
    R.match(listNotes, () => put("Failed to listing notes")),
  );
}

export function dumpNotesOf(date: string) {
  pipe(
    R.fromExecution(() => dumpByDate(date)),
    R.match(listNotes, () => put("Failed to listing notes")),
  );
}
