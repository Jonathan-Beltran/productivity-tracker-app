import pyautogui
import time
import os
import sys
from datetime import datetime
import sqlite3
from pathlib import Path

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

def get_db_path():
    home_dir = Path.home()
    db_dir = home_dir / '.myapp' / 'database'
    return db_dir / 'user_db.sqlite'

def ensure_screenshots_dir():
    screenshots_dir = Path(__file__).parent / 'screenshots'
    screenshots_dir.mkdir(parents=True, exists_ok=True)
    return screenshots_dir

def save_screenshot_to_db(screenshot_path):
    try:
        db_path = get_db_path()
        if not db_path.exists():
            print(f"Database not found at {db_path}. Start the backend at least once.")
            return
        conn = sqlite3.connect(str(db_path))
        cursor = conn.cursor()
        cursor.execute('INSERT INTO screenshots (path, created_at) VALUES (?, CURRENT_TIMESTAMP)', (str(screenshot_path),))
        conn.commit()
        conn.close()
        print(f"Screenshot metadata saved to database: {screenshot_path}")
    except Exception as e:
        print(f"Error saving screenshot metadata: {e}")


def capture_screenshot():
    screenshots_dir = ensure_screenshots_dir()
    print("Starting screenshot service...")
    print(f"Screenshots will be saved to: {screenshots_dir}")
        try: 
            while True:
                try:
                    screenshot = pyautogui.screenshot()
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                    filename = f'screenshot_{timestamp}.png'
                    screenshot_path = screenshots_dir / filename
                    screenshot.save(str(screenshot_path))
                    print(f"Screenshot captured: {filename}")
                    save_screenshot_to_db(screenshot_path)
                    time.sleep(600)
                except Exception as e:
                    print(f"Error capturing screenshot: {e}")
                    time.sleep(60)
            except KeyboardInterrupt:
                print("\nScreenshot service stopped")

if __name__ == '__main__':
    capture_screenshot()
