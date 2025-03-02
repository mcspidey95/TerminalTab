import os
import sys
import subprocess
sys.stdout.reconfigure(encoding='utf-8')

# Check for libraries
def ensure_dependencies():
    try:
        import yt_dlp
    except ImportError:
        print("Installing required packages...")
        subprocess.run([sys.executable, "-m", "pip", "install", "yt-dlp"], check=True)

ensure_dependencies()

import yt_dlp
def progress_hook(d):
    if d['status'] == 'downloading':
        filename = d.get('filename', 'Unknown').split('/')[-1]  # Extract file name
        filesize = f"{round(d.get('total_bytes', 0) / (1024 * 1024), 2)} MB" if d.get('total_bytes') else "Unknown"
        percentage = d.get('_percent_str', '0%').strip()
        speed = d.get('_speed_str', 'Unknown').strip()
        eta = f"{d.get('eta', 'Unknown')}s"

        # Maintain "PROGRESS: " prefix so Node.js can detect it correctly
        print(f"PROGRESS: {percentage} | File: {filename} | Size: {filesize} | Speed: {speed} | ETA: {eta}")
        sys.stdout.flush()  # Flush output immediately


def download_video(url):
    output_dir = os.path.join(os.path.expanduser("~"), "Downloads")
    os.makedirs(output_dir, exist_ok=True)

    ydl_opts = {
        'format': 'bv*[ext=mp4][vcodec^=avc1][height=1080]+ba[ext=m4a]/b[ext=mp4]',
        'progress_hooks': [progress_hook],  
        'outtmpl': os.path.join(output_dir, "%(title)s.%(ext)s"),
        'merge_output_format': 'mp4',
        'postprocessor_args': [
            '-movflags', 'faststart',  # Optimizes MP4 for fast playback
            '-c:v', 'copy',  # No video re-encoding
            '-c:a', 'copy',  # No audio re-encoding
            '-threads', '4',
        ],
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

if __name__ == "__main__":
    if len(sys.argv) > 1:
        print(sys.argv[1])
        video_url = sys.argv[1]
    else:
        print("Error: No URL provided")
        sys.exit(1)

    download_video(video_url)
