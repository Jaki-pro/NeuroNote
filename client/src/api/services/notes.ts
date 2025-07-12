import http from "../../config/http";
import type { CreateNoteRequest } from "../../types";

export const createNote = async (payload:CreateNoteRequest) => {
  try {
    const response = await http.post('/notes', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
}