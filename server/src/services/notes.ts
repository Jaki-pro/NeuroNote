import { Request, Response } from "express";
import { NoteModel } from "../models";

export const createNote = async (req:Request, res:Response) => {
    const newNote = req.body; // In a real application, you would save this to a database
    console.log("Creating a new note...");
    try {
        // Simulate note creation logic
        const savedNote = await NoteModel.create(newNote); 
        res.status(201).json(savedNote); // Respond with the created note
        console.log("Note created successfully:", savedNote);
    } catch (error:unknown) {
        console.error("Error creating note:", error);
        const errorMessage = (error instanceof Error) ? error.message : "Unknown error";
        res.status(500).json({ message: "Failed to create note", error: errorMessage });
    }
}