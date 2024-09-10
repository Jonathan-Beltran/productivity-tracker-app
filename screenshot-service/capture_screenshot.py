import pyautogui
import time
from datetime import datetime

def capture_screenshot():
    while True:
        screenshot = pyautogui.screenshot()
        screenshot.save(f'screenshots/screenshot_{datetime.now().strftime("%Y%m%d_%H%M%S")}.png')
        time.sleep(1800)  # 30 minutes interval

if __name__ == '__main__':
    capture_screenshot()
