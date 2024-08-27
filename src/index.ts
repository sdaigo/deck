#!/usr/bin/env bun

import { program } from "commander";
import pkg from "../package.json";
import { dumpNotes, dumpNotesOf } from "./actions";
import prompt from "./prompt";
import { init } from "./store";

// initialize the database
init.run();

program.name(pkg.name).version(pkg.version);

program.description("Take notes").action(prompt);

program
  .command("dump")
  .description("Dump notes")
  .argument("[date]", "Date in YYYY-MM-DD format to filter notes")
  .action(date => {
    date ? dumpNotesOf(date) : dumpNotes();
  });

program.parse();
