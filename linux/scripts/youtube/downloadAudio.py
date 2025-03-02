import os
import sys
import subprocess

# Check for libraries
def ensure_dependencies():
    try:
        import yt_dlp, mutagen
    except ImportError:
        print("Installing required packages...")
        subprocess.run([sys.executable, "-m", "pip", "install", "yt-dlp", "mutagen"], check=True)

ensure_dependencies()

import yt_dlp
from mutagen.mp3 import MP3
from mutagen.id3 import ID3, APIC
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

def download_audio_with_thumbnail(url):
    output_dir = os.path.join(os.path.expanduser("~"), "Downloads")
    os.makedirs(output_dir, exist_ok=True)

    audio_path = os.path.join(output_dir, "%(title)s.%(ext)s")
    thumbnail_path = os.path.join(output_dir, "%(title)s.jpg")

    ydl_opts = {
        'format': 'bestaudio/best',
        'progress_hooks': [progress_hook],
        'outtmpl': {'default': audio_path, 'thumbnail': thumbnail_path},
        'postprocessors': [
            {'key': 'FFmpegExtractAudio', 'preferredcodec': 'mp3', 'preferredquality': '192'},
            {'key': 'EmbedThumbnail'},
            {'key': 'FFmpegMetadata'} 
        ],
        'postprocessor_args': [
            '-threads', '4'   
        ],
        'writethumbnail': True
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)

    title = info.get('title', 'unknown')
    mp3_file = os.path.join(output_dir, f"{title}.mp3")
    thumbnail_file = os.path.join(output_dir, f"{title}.jpg")

    # Embed the thumbnail in MP3 metadata
    if os.path.exists(mp3_file) and os.path.exists(thumbnail_file):
        embed_thumbnail(mp3_file, thumbnail_file)

def embed_thumbnail(mp3_file, thumbnail_file):
    """Embed the thumbnail into the MP3 file's metadata."""
    try:
        audio = MP3(mp3_file, ID3=ID3)
        with open(thumbnail_file, 'rb') as img:
            audio.tags.add(APIC(
                encoding=3, mime='image/jpeg', type=3, desc='Cover', data=img.read()
            ))
        audio.save()
        print(f"Thumbnail successfully embedded in {mp3_file}")
    except Exception as e:
        print(f"Error embedding thumbnail: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        print(sys.argv[1])
        video_url = sys.argv[1]
    else:
        print("Error: No URL provided")
        sys.exit(1)
    
    download_audio_with_thumbnail(video_url)
