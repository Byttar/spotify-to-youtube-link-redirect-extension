const urlRegex = /^https?:\/\/(?:[^./?#]+\.)?spotify\.com/;

if(urlRegex.test(location.href) && location.href.includes('track')) {
    const spotifyInterval = setInterval(() => {
        try {
            const songName = document.querySelector('[data-testid="creator-link"]').parentElement.parentElement.parentElement.children[2].innerText
            const artists = document.querySelectorAll("[data-testid='track-artist-link-card']")

            let artistNames = '';
            for (let i = 0; i < artists.length; i++) {
                artistNames += artists[i].innerText.split('\n')[1];
                if (i < artists.length - 1) {
                    artistNames += ', ';
                }
            }

            if(songName && artistNames) {
                chrome.storage.sync.set({fromSpotify: true})
                clearInterval(spotifyInterval);
                
                location.href = `https://music.youtube.com/search?q=${encodeURI(`${songName} ${artistNames}`)}`
            }
        } catch (ex) {
        }
    }, 100);
}

if(urlRegex.test(location.href) && location.href.includes('album')) {
    const spotifyAlbumInterval = setInterval(() => {
        try {
            const title = document.querySelector('[data-testid="entityTitle"]').innerText;
            const author = document.querySelector('[data-testid="creator-link"]').parentElement.parentElement.parentElement.children[0].children[1].innerText

            if(title && author) {
                chrome.storage.sync.set({fromSpotifyAlbum: true})
                clearInterval(spotifyAlbumInterval);
                
                location.href = `https://music.youtube.com/search?q=${encodeURI(`${title} ${author}`)}`
            }
        } catch (ex) {
        }
    }, 100);
}

chrome.storage.sync.get('fromSpotifyAlbum').then(result => {
    if(result.fromSpotifyAlbum) {
        chrome.storage.sync.remove('fromSpotifyAlbum')

        const youtubeMusicInterval = setInterval(() => {

            try {
                const albumFilterButtons = document.querySelectorAll("yt-formatted-string.ytmusic-chip-cloud-chip-renderer");

                const albumFilterButton = new Array(...albumFilterButtons).find(a => a.innerText === "Álbuns");

                if(albumFilterButton) {
                    albumFilterButton.click();

                    const selectAlbumItenval = setInterval(() => {
                        const album = document.querySelector(".content.style-scope.ytmusic-tabbed-search-results-renderer").children[0].children[1].children[0].children[0].children[3].children[0].children[0];

                        if(album) {
                            album.click();
                            clearInterval(selectAlbumItenval);

                            setTimeout(() => {
                                const playButtonContent = document.querySelector("#action-buttons").children[2].children[0].click()
                                if(playButtonContent) {
                                    playButtonContent.click();
                                    clearInterval(playButtonContent);
                                }
                            }, 500);
                        }
                    }, 100)

                    clearInterval(youtubeMusicInterval);
                }
            } catch (ex) {
                chrome.storage.sync.remove('fromSpotifyAlbum')
            }
        }, 100);
        
    }
})


chrome.storage.sync.get('fromSpotify').then(result => {
    if(result.fromSpotify) {
        chrome.storage.sync.remove('fromSpotify')

        const youtubeMusicInterval = setInterval(() => {
            try {
                const playButtonContent = document.getElementsByClassName('thumbnail-container')[0].children[0].children[2].children[1].children[0];

                if(playButtonContent) {
                    playButtonContent.click();

                    clearInterval(youtubeMusicInterval);
                }
            } catch (ex) {
            }
        }, 100);
        
    }
})