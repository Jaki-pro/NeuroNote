import { Alert, Box, Button, Paper, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { ArrowBackIcon, SaveIcon } from "../ui/icons";
import { useNavigate } from "react-router";
import MarkdownEditor from "../components/editor/MarkdownEditor";
import type { CreateNoteRequest } from "../types";
import { useState } from "react";
import MetadataForm from "../components/notes/MetadataForm";


const CreateNote = () => {
    const [noteData, setNoteData] = useState<CreateNoteRequest>({
        title: "",
        content: "",
        summary: "",
        keyPoints: [],
        tags: [],
        sentiment: {
            score: 0,
            label: "neutral" // Default sentiment label
        }

    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    
    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!noteData.title.trim()) {
            newErrors.title = "Title is required.";
        }
        if (!noteData.content.trim()) {
            newErrors.content = "Content is required.";
        }
        if (!noteData.summary.trim()) {
            newErrors.summary = "Summary is required.";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNoteData((prev) => ({ ...prev, title: event.target.value }));
        if (errors.content) {
            setErrors((prev) => ({ ...prev, content: "" })); // Clear title error if it exists
        }
    }
    const handleMetadataChange = (metadata: Partial<CreateNoteRequest>) => {
        setNoteData((prev) => ({
            ...prev,
            ...metadata
        }));
    }
    const handleContentChange = (content: string) => {
        setNoteData((prev) => ({ ...prev, content }));
        if (errors.content) {
            setErrors((prev) => ({ ...prev, content: "" })); // Clear content error if it exists
        }
    }
    const handleSave = async () => {
        if (!validateForm()) {
            setErrorMessage("Please fill in all required fields.");
            return;
        }
        setSuccessMessage("Successfully created note!");
        setErrorMessage("");
        console.log("Saving note data:", noteData);
        // Here you would typically send the noteData to your backend API
    } 
    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
                <Typography variant="h4" component="h1" sx={{ flex: 1 }} >
                    Create New Note
                </Typography>
                <Button
                    variant="contained"
                    startIcon={
                        <SaveIcon />
                        // createNoteMutation.isPending ? (
                        //   <CircularProgress size={20} />
                        // ) : (
                        //   <SaveIcon />
                        // )
                    }
                    onClick={handleSave}
                    // disabled={createNoteMutation.isPending}
                    size="large"
                >
                    Save Note
                    {/* {createNoteMutation.isPending ? "Saving..." : "Save Note"} */}
                </Button>
            </Stack>
            <Stack direction='row' gap={4}>
                <Stack spacing={3} flex={1} >
                    {/* Title */}
                    <TextField
                        fullWidth
                        label="Note Title"
                        placeholder="Enter a descriptive title for your note"
                        value={noteData.title}
                        onChange={handleTitleChange}
                        error={!!errors.title}
                        helperText={errors.title}
                        variant="outlined"
                        sx={{
                            "& .MuiInputBase-input": {
                                fontSize: "1.25rem",
                                fontWeight: 500,
                            },
                        }}
                    />

                    {/* Content Editor */}
                    <Paper sx={{ overflow: "hidden" }}>
                        <MarkdownEditor
                            value={noteData.content}
                            onChange={handleContentChange}
                            onSave={() => { }} // handleAutoSave
                            placeholder="Start writing your note here... 

You can use Markdown syntax:
- **Bold text**
- *Italic text*
- `Code`
- [Links](url)
- ![Images](url)

The preview will appear on the right as you type."
                            height="500px"
                            autoSave={true}
                            autoSaveInterval={30000}
                        />
                    </Paper>

                </Stack>
                <MetadataForm
                    value={
                        {
                            summary: noteData.summary,
                            keyPoints: noteData.keyPoints,
                            tags: noteData.tags,
                            sentiment: noteData.sentiment
                        }

                    }
                    onChange={handleMetadataChange}
                // errors={errors}
                />
            </Stack>
            {/* Content Error */}
            {/* {errors.content && <Alert severity="error">{errors.content}</Alert>} */}
            {/* Success snackbar */}
            <Snackbar
                open={!!successMessage}
                autoHideDuration={3000}
                onClose={() => setSuccessMessage("")}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={() => setSuccessMessage("")} severity="success" sx={{ width: '100%' }}>
                    {successMessage}</Alert>
            </Snackbar>
            {/* Error snackbar */}
            <Snackbar
                open={!!errorMessage}
                autoHideDuration={3000}
                onClose={() => setErrorMessage("")}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={() => setErrorMessage("")} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}</Alert>
            </Snackbar>
        </Box>

    );
}

export default CreateNote;
