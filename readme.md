# Spotify to YouTube Music Link Redirect Extension

## Overview

**Spotify to YouTube Music Link Redirect** is a browser extension that automatically redirects you from a Spotify track page to a search for the same song on YouTube Music. This makes it easy to transition between the two music streaming platforms with minimal effort.

## Features

- Detects when you're viewing a track on Spotify.
- Redirects to YouTube Music and searches for the current Spotify song and artist.
- Automatically clicks play on the relevant YouTube Music result (if available).
- Lightweight, open-source, and easy to use.

## Installation

You have two options to install the extension:

### 1. Install from the Chrome Web Store (Recommended)

- Go to the [Spotify to YouTube Music Link Redirect extension page](https://chromewebstore.google.com/detail/spotify-to-youtube-music/gmbokamecelcohoijapdjmgdgiflaiaa).
- Click **Add to Chrome** and confirm the installation.

### 2. Manual Installation (Development Version)

1. **Clone or Download this Repository**
2. **Open Chrome and Go to** `chrome://extensions/`
3. **Enable Developer Mode** (top right corner).
4. **Click "Load unpacked"** and select the `extension` folder from this repository.
5. The extension should now be active!

## Contributing

You're welcome to contribute by opening issues if you find bugs or have feature requests, or by submitting pull requests with proposed changes.

Thanks for helping improve the extension!

## Usage

- Navigate to a Spotify track page (`open.spotify.com/track/...`).
- The extension detects the song and redirects you to YouTube Music, where it searches for that track and starts playing automatically.

## Permissions

This extension uses minimum permissions:
- `storage`: To keep a flag for redirect logic.
- `content_scripts`: To run the logic on spotify.com and music.youtube.com domains.

## Limitations

- The song and artist detection relies on Spotify's web layout and may break if the site updates.
- Only works for single track pages, not albums or playlists.

## License

MIT License