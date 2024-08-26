import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { createNote, listNotes } from "./actions";

yargs(hideBin(process.argv))
  .command(
    "new <note>",
    "Create a new note",
    yargs =>
      yargs.positional("deck", {
        description: "The deck to create the note in",
      }),
    argv => createNote(argv.note as string),
  )
  .command(
    "show",
    "gets all notes",
    yargs =>
      yargs.option("pretty", {
        alias: "p",
        type: "boolean",
        description: "Pretty print notes",
      }),
    argv => listNotes(argv?.pretty),
  )
  .parse();
