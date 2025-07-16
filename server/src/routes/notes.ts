import { Router } from "express";
import { createNote, searchNotes } from "../services";

const route = Router();
route.post("/", createNote)
route.post("/search", searchNotes)

export default route;