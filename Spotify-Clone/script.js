let masterPlay = document.querySelector("#masterPlay");
let myProgressBar = document.querySelector("#myProgressBar");
let songItems = document.querySelectorAll(".songItem");
let previous = document.querySelector("#previous");
let next = document.querySelector("#next");
let masterSongName = document.querySelector("#masterSongName");
let playGif = document.querySelector("#playGif");

let songIndex = 1;
let audio = new Audio("./resources/songs/1.mp3");
let songs = [
    {songName:"1st Song", filePath:"./resources/songs/1.mp3", coverPath:"./resources/covers/1.jpg"},
    {songName:"2nd Song", filePath:"./resources/songs/2.mp3", coverPath:"./resources/covers/2.jpg"},
    {songName:"3rd Song", filePath:"./resources/songs/3.mp3", coverPath:"./resources/covers/3.jpg"},
    {songName:"4th Song", filePath:"./resources/songs/4.mp3", coverPath:"./resources/covers/4.jpg"},
    {songName:"5th Song", filePath:"./resources/songs/5.mp3", coverPath:"./resources/covers/5.jpg"},
    {songName:"6th Song", filePath:"./resources/songs/6.mp3", coverPath:"./resources/covers/6.jpg"},
    {songName:"7th Song", filePath:"./resources/songs/7.mp3", coverPath:"./resources/covers/7.jpg"},
    {songName:"8th Song", filePath:"./resources/songs/8.mp3", coverPath:"./resources/covers/8.jpg"},
    {songName:"9th Song", filePath:"./resources/songs/9.mp3", coverPath:"./resources/covers/9.jpg"},
    {songName:"10th Song", filePath:"./resources/songs/10.mp3", coverPath:"./resources/covers/10.jpg"}
];

masterSongName.innerText = songs[songIndex-1].songName;

// Setting all song cards' button to play
let makeAllPlays = () => {
    document.querySelectorAll(".songItemPlay").forEach((ele) => {
        ele.classList.add("fa-circle-play");
        ele.classList.remove("fa-circle-stop");
    });
};

// Changing to pause button
let pauseUpdate = () => {
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    playGif.style.opacity = 1;
};

// Changing to play button
let playUpdate = () => {
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    playGif.style.opacity = 0;
};

// Changing the play button to stop in song card
let updateSongCardButton = () => {
    songItems[songIndex-1].querySelector("i").classList.remove("fa-circle-play");
    songItems[songIndex-1].querySelector("i").classList.add("fa-circle-stop");
}

// Play/Pause including required UI changes
masterPlay.addEventListener('click', () => {
    if(audio.paused || audio.currentTime==0) {
        audio.play();
        updateSongCardButton();
        pauseUpdate();
    }
    else {
        audio.pause();
        makeAllPlays();
        playUpdate();
    }
});

// Update progress bar along with song
audio.addEventListener('timeupdate', () => {
    let progress = parseInt((audio.currentTime/audio.duration)*100);
    myProgressBar.value = progress;
});

// Seeking the address bar updates the song
myProgressBar.addEventListener('change', () => {
    let seek = parseInt((myProgressBar.value*audio.duration)/100);
    audio.currentTime = seek;
});

// Setting songs' names, cover images and times in each song card
songItems.forEach((songEle, i) => {
    songEle.querySelector("img").src = songs[i].coverPath;
    songEle.querySelector("span").innerText = songs[i].songName;
    let tempAudio = new Audio(songs[i].filePath);
    let timeInMinutes = (timeSec) => {
        time = parseInt(timeSec);
        let min = Math.floor(time/60);
        let sec = time%60;
        return `${min}:${sec}`;
    }
    tempAudio.addEventListener("loadedmetadata", () => {
    songEle.querySelector(".timestamp").querySelector("p").innerText = timeInMinutes(tempAudio.duration);
    });
});

// Adding functionality to Play/Stop button in songs cards
document.querySelectorAll(".songItemPlay").forEach((ele) => {
    ele.addEventListener('click', (e) => {
        if (e.target.classList.contains("fa-circle-stop")) {
            audio.pause();
            makeAllPlays();
            playUpdate();
        }
        else{
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-stop");
            audio.src = songs[songIndex-1].filePath;
            masterSongName.innerText = songs[songIndex-1].songName;
            audio.currentTime = 0;
            audio.play();
            pauseUpdate();
        }
    });
});

// Adding previous button functionality
previous.addEventListener('click', () => {
    if (songIndex<=1) {
        songIndex = 10;
    }
    else {
        songIndex--;
    }
    makeAllPlays();
    audio.src = songs[songIndex-1].filePath;
    audio.currentTime = 0;
    masterSongName.innerText = songs[songIndex-1].songName;
    updateSongCardButton();
    pauseUpdate();
    audio.play();
});

// Adding next button functionality
next.addEventListener('click', () => {
    if (songIndex>=10) {
        songIndex = 1;
    }
    else {
        songIndex++;
    }
    makeAllPlays();
    audio.src = songs[songIndex-1].filePath;
    audio.currentTime = 0;
    masterSongName.innerText = songs[songIndex-1].songName;
    updateSongCardButton();
    pauseUpdate();
    audio.play();
});