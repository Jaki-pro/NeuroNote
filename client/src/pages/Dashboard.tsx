import { Alert, Box, Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import { AddIcon, ExportIcon, NoteIcon } from '../ui/icons';
import { useNavigate } from 'react-router';
import { useNoteSearch } from '../api/hooks';
import type { SearchRequest, SearchResponse, ViewMode } from '../types';
import NoteCard from '../components/notes/NoteCard'; 
import SearchInterface from '../components/search/SearchInterface';
import { useDebounce } from '../api/hooks/useDebounce';
const Dashboard = () => {
  const [searchParams, setSearchParams] = useState<SearchRequest>({
    query: "",
    tags: [],
    sentiment: undefined,
    sortBy: "date",
    page: 1,
    limit: 20,
  });
  const navigate = useNavigate()
  const debouncedSearch = useDebounce(searchParams);
  const { noteSearchQuery } = useNoteSearch(debouncedSearch);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  console.log("Note Search Data:", noteSearchQuery.data);
  const searchResults: SearchResponse = noteSearchQuery.data || {
    notes: [],
    totalCount: 0,
    page: 1,
    limit: 5,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  };
   const handleSearch = (updatedParams: SearchRequest) => {
    setSearchParams((prev) => ({
      ...prev,
      ...updatedParams,
    }));
  };
  return (

    <Box>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Here's an overview of your notes and activity.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<ExportIcon />}
          // onClick={handleBulkExport}
          // disabled={
          //   (searchResults.length === 0 && recentNotes.length === 0) ||
          //   searchLoading
          // }
          >
            Export Notes
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/notes/new")}
          >
            Create New Note
          </Button>
        </Stack>
      </Stack>

      {/* Error Display */}
      {noteSearchQuery.error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {noteSearchQuery.error.message}
        </Alert>
      )}

      {/* Search Interface */}
      <SearchInterface
        searchParams={searchParams}
        onSearch={handleSearch}
        availableTags={[]} 
        isLoading={noteSearchQuery.isLoading}
        viewMode={viewMode} 
        onViewModeChange={setViewMode}
      />

      {/* Notes Display */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" component="h2">
            {searchParams.query || searchParams.tags?.length || searchParams.sentiment ? 'Search Results' : 'Recent Notes'}
          </Typography>
        </Box>

        {noteSearchQuery.isLoading ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Loading...
              {/* {searchParams.query || searchParams.tags?.length || searchParams.sentiment ? 'Searching notes...' : 'Loading recent notes...'} */}
            </Typography>
          </Box>
        ) : searchResults.notes.length >= 1 ? (
          <Grid container spacing={2}>
            {searchResults.notes.map((note) => (
              <Grid    
                key={note._id}
                size={viewMode==='grid'?{ xs: 6, md: 4 }:12}// Adjust size based on view mode
                
                
              >
                <NoteCard
                  note={note}
                  onExport={() => { }}
                  onDelete={() => { }}
                  showMetadata={true}
                  variant={viewMode}
                />
              </Grid>
            ))}
          </Grid>
          
        ) : (
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <NoteIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              {searchParams.query ||
                searchParams.tags?.length ||
                searchParams.sentiment
                ? "No notes found"
                : "No notes yet"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {searchParams.query ||
                searchParams.tags?.length ||
                searchParams.sentiment
                ? "Try adjusting your search criteria"
                : "Start by creating your first note to see it appear here."}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/notes/new")}
            >
              {searchParams.query ||
                searchParams.tags?.length ||
                searchParams.sentiment
                ? "Create Note"
                : "Create Your First Note"}
            </Button>
          </Paper>
        )}
      </Box>
      
    </Box>
  );
}

export default Dashboard;
