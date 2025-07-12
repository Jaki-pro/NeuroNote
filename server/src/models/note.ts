import mongoose, { Schema } from "mongoose";
import { Note as NoteType } from "../types";

const sentimentSchema = new Schema(
  {
    score: {
      type: Number,
      required: true,
      min: -1,
      max: 1,
      validate: {
        validator: function (value: number) {
          return value >= -1 && value <= 1;
        },
        message: "Sentiment score must be between -1 and 1",
      },
    },
    label: {
      type: String,
      required: true,
      enum: ["positive", "negative", "neutral"],
      trim: true,
    },
  },
  { _id: false }
);

const noteSchema = new Schema<NoteType>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
      index: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 50000, // 50KB limit for markdown content
    },
    summary: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    keyPoints: {
      type: [String],
      required: true,
      validate: {
        validator: function (points: string[]) {
          return (
            points.length <= 20 && points.every((point) => point.length <= 200)
          );
        },
        message: "Maximum 20 key points allowed, each up to 200 characters",
      },
    },
    tags: {
      type: [String],
      required: true,
      validate: {
        validator: function (tags: string[]) {
          return (
            tags.length <= 50 &&
            tags.every(
              (tag) => tag.length <= 50 && /^[a-zA-Z0-9\s\-_]+$/.test(tag)
            )
          );
        },
        message:
          "Maximum 50 tags allowed, each up to 50 characters with alphanumeric characters, spaces, hyphens, and underscores only",
      },
      index: true,
    },
    sentiment: {
      type: sentimentSchema,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId, 
      ref: "User", // Assuming you have a User model
      index: true,
    },
  },
  {
    timestamps: true, 
  }
);

// Text search index (will be created by database config)
noteSchema.index(
  {
    title: "text",
    content: "text",
    summary: "text",
    keyPoints: "text",
  },
  {
    weights: {
      title: 10,
      summary: 8,
      keyPoints: 6,
      content: 4,
    },
    name: "notes_text_search",
  }
);

// Compound indexes for efficient filtering
noteSchema.index({ userId: 1, createdAt: -1 });
noteSchema.index({ userId: 1, "sentiment.label": 1 });
noteSchema.index({ userId: 1, tags: 1 });
noteSchema.index({ userId: 1, updatedAt: -1 });
noteSchema.index({ userId: 1, tags: 1, createdAt: -1 });
noteSchema.index({ userId: 1, "sentiment.score": 1 });

// Pre-save middleware to sanitize and validate
noteSchema.pre("save", function (this: NoteType, next) {
  // Trim and clean tags
  this.tags = this.tags
    .map((tag: string) => tag.trim().toLowerCase())
    .filter((tag: string) => tag.length > 0);

  // Remove duplicate tags
  this.tags = [...new Set(this.tags)];

  // Trim key points
  this.keyPoints = this.keyPoints
    .map((point: string) => point.trim())
    .filter((point: string) => point.length > 0);

  next();
});

export const NoteModel = mongoose.model<NoteType>("Note", noteSchema);