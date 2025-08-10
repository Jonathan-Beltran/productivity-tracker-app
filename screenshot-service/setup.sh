#!/bin/bash

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

echo "Screenshot service setup complete!"
echo "To run the service:"
echo "1. source venv/bin/activate"
echo "2. python capture_screenshot.py"
