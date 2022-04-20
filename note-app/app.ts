import { getNotes, addNote, removeNote } from "./src/notes";
import chalk from "chalk";
import yargs, { ArgumentsCamelCase } from "yargs";

interface Note {
  title: string;
  body: string;
}

type NoteName = Note["title"];

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: ({ title, body }: ArgumentsCamelCase<Note>) => {
    addNote(title, body);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: ({ title }: ArgumentsCamelCase<{ title: NoteName }>) => {
    removeNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "List notes",
  handler: () => {},
});

yargs.command({
  command: "read",
  describe: "Reads a note",
  handler: () => {},
});

yargs.parse();
