import { Request, Response } from "express";
import { NoteModel } from "../models";
import mongoose from "mongoose";
import { SearchRequest, SearchResponse } from "../types";

interface MongoQuery {
  // userId: mongoose.Types.ObjectId;
  $text?: { $search: string };
  tags?: { $in: string[] };
  "sentiment.label"?: string;
  createdAt?: {
    $gte?: Date;    
    $lte?: Date;
  };
}

interface DateFilter {
  $gte?: Date;
  $lte?: Date;
}

export const createNote = async (req:Request, res:Response) => {
    const NoteData = req.body; // In a real application, you would save this to a database
    console.log("Creating a new note...");
    const note = {
        ...NoteData,
        userId: new  mongoose.Types.ObjectId() // Assuming you have user authentication middleware that sets req.user
    }
    try {
        // Simulate note creation logic
        const savedNote = await NoteModel.create(note); 
        res.status(201).json(savedNote); // Respond with the created note
        console.log("Note created successfully:", savedNote);
    } catch (error:unknown) {
        console.error("Error creating note:", error);
        const errorMessage = (error instanceof Error) ? error.message : "Unknown error";
        res.status(500).json({ message: "Failed to create note", error: errorMessage });
    }
}

export const searchNotes = async (req:Request, res:Response) => {
  try {
    const searchParams: SearchRequest = req.body;
    const page = Math.max(1, searchParams.page || 1);
    const limit = Math.min(50, Math.max(1, searchParams.limit || 20));
    const skip = (page - 1) * limit;

    // const userId = new mongoose.Types.ObjectId(req.user.userId);

    // Build search query with proper typing
    // const query: MongoQuery = { userId };
    const query: MongoQuery = {};

    // Text search
    if (searchParams.query) {
      query.$text = { $search: searchParams.query };
    }

    // Filter by tags
    if (searchParams.tags && searchParams.tags.length > 0) {
      query.tags = { $in: searchParams.tags };
    }

    // Filter by sentiment
    if (searchParams.sentiment) {
      query["sentiment.label"] = searchParams.sentiment;
    }

    // Date range filter
    if (searchParams.dateRange) {
      const dateFilter: DateFilter = {};
      if (searchParams.dateRange.from) {
        dateFilter.$gte = new Date(searchParams.dateRange.from);
      }
      if (searchParams.dateRange.to) {
        dateFilter.$lte = new Date(searchParams.dateRange.to);
      }
      if (Object.keys(dateFilter).length > 0) {
        query.createdAt = dateFilter;
      }
    }

    // Build sort criteria - using 'any' for MongoDB query compatibility
    let sortCriteria = {};
    switch (searchParams.sortBy) {
      case "relevance":
        if (searchParams.query) {
          sortCriteria = { score: { $meta: "textScore" } };
        } else {
          sortCriteria = { createdAt: -1 };
        }
        break;
      case "title":
        sortCriteria = { title: 1 };
        break;
      case "date":
      default:
        sortCriteria = { createdAt: -1 };
        break;
    }

    // Get total count
    const totalCount = await NoteModel.countDocuments(query);

    // Execute search
    const notesQuery = NoteModel.find(query);

    const notes = await notesQuery
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPages = Math.ceil(totalCount / limit);

    const searchResponse: SearchResponse = {
      notes,
      totalCount,
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };

    res.json(searchResponse);
  } catch (error) {
    console.error("Search notes error:", error);
    const response = {
      success: false,
      error: "Search failed",
    };
    res.status(500).json(response);
  }
};