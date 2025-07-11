export const envConfig = {
    VITE_API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    // Add other environment variables as needed    

    // For example, if you have a public API key:
    // publicApiKey: import.meta.env.VITE_PUBLIC_API_KEY || 'defaultPublicApiKey',

    // If you have a private API key, ensure it's not exposed to the client-side code
    // privateApiKey: import.meta.env.VITE_PRIVATE_API_KEY
};