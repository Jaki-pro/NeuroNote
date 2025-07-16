import http from "../../config/http";
import type { CreateNoteRequest, SearchRequest } from "../../types";

export const createNote = async (payload:CreateNoteRequest) => {
  try {
    const response = await http.post('/notes', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
}
export const searchNotes = async (searchParams: SearchRequest) => {
  try {
    const response = await http.post('/notes/search', searchParams); 
    return response.data;
  } catch (error) {
    console.error('Error searching notes:', error);
    throw error;
  }
}