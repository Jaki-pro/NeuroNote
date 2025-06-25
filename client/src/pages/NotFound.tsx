import { Box, Typography, Button, Container } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                    gap: 3
                }}
            >
                <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main' }} />
                <Typography variant="h1" component="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: 'error.main' }}>
                    404
                </Typography>
                <Typography variant="h4" component="h2" sx={{ mb: 2, color: 'text.secondary' }}>
                    Oops! Page Not Found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
                    The page you're looking for doesn't exist or has been moved. Please check the URL or go back to the homepage.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/')}
                    sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '1.1rem'
                    }}
                >
                    Back to Homepage
                </Button>
            </Box>
        </Container>
    );
}

export default NotFound;
