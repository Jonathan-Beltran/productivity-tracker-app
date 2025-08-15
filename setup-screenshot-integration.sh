#!/bin/bash

echo "Setting up screenshot service integration..."

# Create assets directory for tray icon
mkdir -p assets

# Update package.json to include child_process types
cd electron-app
echo "Installing additional dependencies..."
npm install --save-dev @types/node

# Make sure screenshot service is set up
cd ../screenshot-service
echo "Setting up screenshot service virtual environment..."

# Check if venv exists, if not create it
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# Activate and install requirements
source venv/bin/activate
pip install -r requirements.txt

echo "Setup complete!"
echo ""
echo "To run the integrated app:"
echo "1. cd electron-app"
echo "2. npm run build"
echo "3. npm run dev"
echo ""
echo "The screenshot service will start automatically with the Electron app!"
