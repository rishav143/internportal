#!/bin/bash

# Server Deployment Script for Render

echo "🚀 Starting server deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found. Make sure to set environment variables in Render dashboard."
    echo "Required variables:"
    echo "  - MONGODB_URI"
    echo "  - JWT_SECRET"
    echo "  - PORT (auto-set by Render)"
else
    echo "✅ Environment file found"
fi

# Start the server
echo "🚀 Starting server..."
npm start
