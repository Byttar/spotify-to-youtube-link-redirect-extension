var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?spotify\.com/;

if(urlRegex.test(location.href) && location.href.includes('track')) {
    const spotifyInterval = setInterval(() => {
        try {
            const songName = document.querySelector('[data-testid="playcount"]').parentElement.children[2].innerText;
            const author = document.querySelector('[data-testid="playcount"]').parentElement.children[0].innerText;
    
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
                const contentClickable = document.getElementsByClassName('thumbnail-container')[0].children[0];
        
                if(contentClickable) {
                    chrome.storage.sync.remove('fromSpotify')
        
                    contentClickable.click();
                    clearInterval(youtubeMusicInterval);
                }
            } catch (ex) {}
        }, 100);
        
    }
})