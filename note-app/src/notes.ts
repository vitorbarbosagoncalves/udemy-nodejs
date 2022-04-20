import fs from "fs";
import path from "path";

interface Notes {
  [title: string]: { body: string };
}

const NOTES_PATH = path.resolve(__dirname, "notes");

const parseTitle = (title: string) =>
  title
    .toLowerCase()
    .replace(/\s+(\w?)/gi, (_match, letter) => letter.toUpperCase());

const loadNotes = () => {
  if (!fs.existsSync(`${NOTES_PATH}`)) {
    fs.mkdirSync(`${NOTES_PATH}`);
  }
  if (!fs.existsSync(`${NOTES_PATH}/notes.json`))
    fs.writeFileSync(`${NOTES_PATH}/notes.json`, `{}`);

  return JSON.parse(fs.readFileSync(`${NOTES_PATH}/notes.json`).toString());
};

const saveNotes = (notes: Notes) => {
  fs.writeFileSync(`${NOTES_PATH}/notes.json`, JSON.stringify(notes));
};

export const getNotes = (title?: string) => {
  const notes = loadNotes();
  if (title) return notes[title];
  return notes;
};

export const addNote = (title: string, body: string) => {
  const notes = { ...getNotes(), [parseTitle(title)]: { body } };
  saveNotes(notes);
};

export const removeNote = (title: string) => {
  const notes = getNotes();
  delete notes[parseTitle(title)];
  saveNotes(notes);
};
