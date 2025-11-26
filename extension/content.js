const urlRegex = /^https?:\/\/(?:[^./?#]+\.)?spotify\.com/;

if(urlRegex.test(location.href) && location.href.includes('track')) {
    const spotifyInterval = setInterval(() => {
        try {
            const songName = document.querySelector('[data-testid="creator-link"]').parentElement.parentElement.parentElement.children[2].innerText
            const author = document.querySelector('[data-testid="creator-link"]').parentElement.parentElement.parentElement.children[0].children[1].innerText

            if(songName && author) {
                chrome.storage.sync.set({fromSpotify: true})
                clearInterval(spotifyInterval);
                
                location.href = `https://music.youtube.com/search?q=${encodeURI(`${songName} ${author}`)}`
            }
        } catch (ex) {}
    }, 100);
}

chrome.storage.sync.get('fromSpotify').then(result => {
    if(result.fromSpotify) {
        const youtubeMusicInterval = setInterval(() => {
            try {
                const playButtonContent = document.getElementsByClassName('thumbnail-container')[0].children[0].children[2].children[1].children[0];

                if(playButtonContent) {
                    chrome.storage.sync.remove('fromSpotify')
                    playButtonContent.click();

                    clearInterval(youtubeMusicInterval);
                }
            } catch (ex) {}
        }, 100);
        
    }
})