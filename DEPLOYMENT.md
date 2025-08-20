# Deployment Guide

## Server (Render)

### Environment Variables
Set these in your Render dashboard under Environment Variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-secure-secret-key-here
```

### Build Command
```bash
npm install
```

### Start Command
```bash
npm start
```

### Notes
- Render automatically sets the `PORT` environment variable
- The server will listen on the port provided by Render
- CORS is configured to allow requests from both localhost and your Vercel client

## Client (Vercel)

### Environment Variables
Set these in your Vercel dashboard under Environment Variables:

```
REACT_APP_API_URL=https://your-render-server-url.onrender.com
```

### Build Command
```bash
npm run build
```

### Notes
- Replace `your-render-server-url.onrender.com` with your actual Render server URL
- The client will automatically detect localhost vs production and use the appropriate API URL
- Make sure your Render server is running and accessible before deploying the client

## Local Development

### Server
```bash
cd server
npm install
npm run dev
```

### Client
```bash
cd client
npm install
npm start
```

## Troubleshooting

1. **CORS Issues**: Ensure your Render server URL is correctly added to the CORS origins in `server/index.js`
2. **API Connection**: Verify the `REACT_APP_API_URL` in Vercel matches your Render server URL
3. **Cookies**: Ensure both domains support HTTPS and credentials are properly configured
4. **MongoDB**: Verify your MongoDB connection string is correct and the database is accessible
