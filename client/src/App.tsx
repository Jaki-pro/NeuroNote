import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { Route, Routes } from 'react-router';
import { NotFound, Dashboard } from './pages/';
import AppLaout from './components/layout/AppLaout';
import { theme } from './ui/theme';
function App() {

  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/' element={
          <AppLaout />
        }>
          <Route index path='/' element={
            <Dashboard />
          } />
          <Route path='/bookmarks' element={
            <Box>
              <Typography variant="h4">
                Bookmarks
              </Typography>
            </Box>
          } />
          <Route path='/settings' element={
            <Box>
              <Typography variant="h4">
                Settings
              </Typography>
            </Box>
          } />
          <Route path='/archive' element={
            <Box>
              <Typography variant="h4" >
                Archive
              </Typography>
            </Box>
          } />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
