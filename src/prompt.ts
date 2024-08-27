import { R, pipe } from "@mobily/ts-belt";
import prompts from "prompts";
import { match } from "ts-pattern";
import { createNote, dumpNotes } from "./actions";

function detectCommand(line: string) {
  return match(line) //
    .with(":exit", () => process.exit(0))
    .with(":dump", () => {
      dumpNotes();
      return true;
    })
    .otherwise(() => {
      return false;
    });
}

export default async function prompt() {
  const resp = await prompts(
    { type: "text", name: "note", message: "'" },
    {
      onCancel: () => {
        console.log("Bye...");
        process.exit(0);
      },
    },
  );
  const note = resp.note.trim();
  const isCommand = detectCommand(note);

  if (isCommand) {
    prompt();
    return;
  }

  pipe(
    R.fromExecution(() => {
      createNote(note);
    }),
    R.match(
      () => {
        prompt();
      },
      error => {
        console.error("Error creating note:", error);
      },
    ),
  );
}
