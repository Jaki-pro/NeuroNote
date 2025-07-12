export type CreateNoteRequest = {
    title: string;
    content: string;
    summary: string;
    userId?: string;
    tags: string[];
    keyPoints: string[];
    sentiment: {
        score: number;
        label: "positive" | "neutral" | "negative";
    };
};
export type SentimentLabel = "positive" | "neutral" | "negative";