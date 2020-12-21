// Playlist Array
let playlist = [
	{src:'audio/Track1.mp3', title:"The Lounge", artist:"Benjamin Tissot", image:`img/image1.jpg`},  // 0
    {src:'audio/Track2.mp3', title:"Relaxing", artist:"Benjamin Tissot", image:`img/image2.jpg`},  // 1
    {src:'audio/Track3.mp3', title:"Dreams", artist:"Benjamin Tissot", image:`img/image3.jpg`},  // 2
]

// Audio Variables
let songNumber = 0
let CurrentlyPlaying = false
let audio = null

// Load A Song - Based on codepen array example provided on Slack (see notes/attribution in readme.md) 
let PlaySong = function(pickASong) {
	let song = playlist[pickASong] // The song you want to play from the Array above
	if (audio) { // means it's not null (something was previously loaded)
		audio.src = song.src // Change the song - sub in "src" string from array above
		if (CurrentlyPlaying) { audio.play() } // Play it
	} else {
		audio = new Audio(song.src) 
	}
    document.getElementById("trackImage").src = playlist[pickASong].image
    document.getElementById("songArtist").innerHTML = `${playlist[pickASong].artist}`
    document.getElementById("songTitle").innerHTML = `${playlist[pickASong].title}`
}

//Last Track Button
let lastBtn = function() {
    if (songNumber <= 0) { //If on the first song
        songNumber = 2 //change to the third track
        PlaySong(songNumber) //play the song
    } 
    else { //otherwise
        songNumber -= 1 //Go to the next song
        PlaySong(songNumber) //play the song
    }
}
let lastTrack = document.querySelector(`#lastTrack`)
lastTrack.addEventListener(`click`, lastBtn)

//Next Track Button
let nextBtn = function() {
    if (songNumber >= 3) { //If on the third song
        songNumber = 0 //change to the first track - This takes two presses for some reason (?)
        PlaySong(songNumber) //play the song
    } 
    else { //otherwise
        songNumber += 1 //Go to the next song
        PlaySong(songNumber) //play the song
    }
}
let nextTrack = document.querySelector(`#nextTrack`)
nextTrack.addEventListener(`click`, nextBtn)

// Play/Pause Button
let playBtn = function() {
	if (CurrentlyPlaying) {
		audio.pause()
        CurrentlyPlaying = false
        document.querySelector(`.play`).style.display= "inline"
        document.querySelector(`.pause`).style.display= "none"
	} else {
		audio.play()
        CurrentlyPlaying = true
        document.querySelector(`.pause`).style.display= "inline"
        document.querySelector(`.play`).style.display= "none"
	}
}
let play = document.querySelector(`.play`)
play.addEventListener(`click`, playBtn)
let pause = document.querySelector(`.pause`)
pause.addEventListener(`click`, playBtn)

//Replay current track from the beginning
let restartBtn = function() {
    audio.load()
    audio.play()
}

let restartButton = document.querySelector(`#restart`)
restartButton.addEventListener(`click`, restartBtn)

//Volume up button
let volUpBtn = function() {
    if (audio.volume === 1) {
        document.getElementById("currentVol").innerHTML = `Max Volume`
    }
    else {
        audio.volume += 0.1
        document.getElementById("currentVol").innerHTML = `Volume: ${Math.round(audio.volume * 100)}%` //Round Volume Integer to % value - Makes it easy for the user to read/interpret
    }
}
let volumeUpButton = document.querySelector(`#volumeUp`)
volumeUpButton.addEventListener(`click`, volUpBtn)

//Volume down button 
let volDownBtn = function() {
    if (audio.volume <= 0.1) {
        document.getElementById("currentVol").innerHTML = `Volume: ${Math.round(audio.volume * 100)}%` //Round Volume Integer to % value - Makes it easy for the user to read/interpret
    }
    else {
        audio.volume -= 0.1
        document.getElementById("currentVol").innerHTML = `Volume: ${Math.round(audio.volume * 100)}%` //Round Volume Integer to % value - Makes it easy for the user to read/interpret
    }
}
let volumeDownButton = document.querySelector(`#volumeDown`)
volumeDownButton.addEventListener(`click`, volDownBtn)

//Start Playlist on Track 1 (start of the array)
PlaySong(0)