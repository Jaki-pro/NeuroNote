import { Router } from "express";
import { createNote } from "../services";

const route = Router();
route.post("/", createNote)

export default route;