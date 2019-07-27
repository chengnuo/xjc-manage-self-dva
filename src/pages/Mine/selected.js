/*
 * Selected | a collection of songs that I love
 * v0.3.0
 * also as a showcase that shows how to sync lyric with the HTML5 audio tag
 * Wayou  Apr 5th,2014
 * view on GitHub:https://github.com/wayou/selected
 * see the live site:http://wayou.github.io/selected/
 * songs used in this project are only for educational purpose
 */
// window.onload = function() {
//     console.log('12')
//     new Selected().init();
// };
window.audioLoad = function () {
  new Selected().init();
}
var Selected = function () {
  this.audio = document.getElementById('audio');
  this.lyricContainer = document.getElementById('lyricContainer');
  this.playlist = document.getElementById('playlist');
  this.currentIndex = 0;
  this.lyric = null;
  this.lyricStyle = 0; // random num to specify the different class name for lyric
};
Selected.prototype = {
  constructor: Selected, // fix the prototype chain
  init() {
    // get all songs and add to the playlist
    this.initialList(this);

    const that = this;


    const allSongs = this.playlist.children[0].children;


    let currentSong;
    let randomSong;

    // get the hash from the url if there's any.
    const songName = window.location.hash.substr(1);
    // then get the index of the song from all songs
    const indexOfHashSong = (function () {
      let index = 0;
      Array.prototype.forEach.call(allSongs, (v, i, a) => {
        if (v.children[0].getAttribute('data-name') == songName) {
          index = i;
          return false;
        }
      });
      return index;
    })();

    this.currentIndex = indexOfHashSong || Math.floor(Math.random() * allSongs.length);

    currentSong = allSongs[this.currentIndex];
    randomSong = currentSong.children[0].getAttribute('data-name');

    // set the song name to the hash of the url
    window.location.hash = window.location.hash || randomSong;


    // handle playlist
    this.playlist.addEventListener('click', (e) => {
      if (e.target.nodeName.toLowerCase() !== 'a') {
        return;
      }
      ;
      const allSongs = that.playlist.children[0].children;


      const selectedIndex = Array.prototype.indexOf.call(allSongs, e.target.parentNode);
      that.currentIndex = selectedIndex;
      that.setClass(selectedIndex);
      const songName = e.target.getAttribute('data-name');
      window.location.hash = songName;
      that.play(songName);
    }, false);
    this.audio.onended = function () {
      that.playNext(that);
    }
    this.audio.onerror = function (e) {
      that.lyricContainer.textContent = '!fail to load the song :(';
    };

    // enable keyboard control , spacebar to play and pause
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 32) {
        if (that.audio.paused) {
          that.audio.play();
        } else {
          that.audio.pause();
        }
      }
    }, false);

    // initialize the background setting
    // document.getElementById('bg_dark').addEventListener('click', () => {
    //   document.getElementsByTagName('html')[0].className = 'colorBg';
    // });
    // document.getElementById('bg_pic').addEventListener('click', () => {
    //   document.getElementsByTagName('html')[0].className = 'imageBg';
    // });
    // initially start from a random song
    for (let i = allSongs.length - 1; i >= 0; i--) {
      allSongs[i].className = '';
    }
    ;
    currentSong.className = 'current-song';
    this.play(randomSong);
  },
  initialList(ctx) {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://localhost:7001/public/mp3/content.json', false);
    xhttp.onreadystatechange = function () {
      if (xhttp.status == 200 && xhttp.readyState == 4) {
        var fragment = document.createDocumentFragment();


        const data = JSON.parse(xhttp.responseText).data;


        const ol = ctx.playlist.getElementsByTagName('ol')[0];


        var fragment = document.createDocumentFragment();

        data.forEach((v, i, a) => {
          const li = document.createElement('li');


          var a = document.createElement('a');
          a.href = 'javascript:void(0)';
          a.dataset.name = v.lrc_name;
          a.textContent = `${v.song_name}-${v.artist}`;
          li.appendChild(a);
          fragment.appendChild(li);
        });
        ol.appendChild(fragment);
      }
    };
    xhttp.send();
  },
  play(songName) {
    const that = this;
    this.audio.src = `http://localhost:7001/public/mp3/songs/${songName}.mp3`;
    // reset the position of the lyric container
    this.lyricContainer.style.top = '130px';
    // empty the lyric
    this.lyric = null;
    this.lyricContainer.textContent = 'loading...';
    this.lyricStyle = Math.floor(Math.random() * 4);
    this.audio.addEventListener('canplay', function () {
      that.getLyric(that.audio.src.replace('.mp3', '.lrc'));
      this.play();
    });
    // sync the lyric
    this.audio.addEventListener("timeupdate", function (e) {
      if (!that.lyric) return;
      for (let i = 0, l = that.lyric.length; i < l; i++) {
        if (this.currentTime > that.lyric[i][0] - 0.50 /* preload the lyric by 0.50s */) {
          // single line display mode
          // that.lyricContainer.textContent = that.lyric[i][1];
          // scroll mode
          const line = document.getElementById(`line-${i}`);


          const prevLine = document.getElementById(`line-${i > 0 ? i - 1 : i}`);
          if (prevLine) {
            prevLine.className = '';
          }
          // randomize the color of the current line of the lyric
          if (line) {
            line.className = `current-line-${that.lyricStyle}`;
            that.lyricContainer.style.top = `${130 - line.offsetTop}px`;
          }
        }
        ;
      }
      ;
    });
  },
  playNext(that) {
    const allSongs = this.playlist.children[0].children;


    let nextItem;
    // reaches the last song of the playlist?
    if (that.currentIndex === allSongs.length - 1) {
      // play from start
      that.currentIndex = 0;
    } else {
      // play next index
      that.currentIndex += 1;
    }
    ;
    nextItem = allSongs[that.currentIndex].children[0];
    that.setClass(that.currentIndex);
    const songName = nextItem.getAttribute('data-name');
    window.location.hash = songName;
    that.play(songName);
  },
  setClass(index) {
    const allSongs = this.playlist.children[0].children;
    for (let i = allSongs.length - 1; i >= 0; i--) {
      allSongs[i].className = '';
    }
    ;
    allSongs[index].className = 'current-song';
  },
  getLyric(url) {
    const that = this;


    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'text';
    // fix for the messy code problem for Chinese.  reference: http://xx.time8.org/php/20101218/ajax-xmlhttprequest.html
    // request['overrideMimeType'] && request.overrideMimeType("text/html;charset=gb2312");
    request.onload = function () {
      that.lyric = that.parseLyric(request.response);
      // display lyric to the page
      that.appendLyric(that.lyric);
    };
    request.onerror = request.onabort = function (e) {
      that.lyricContainer.textContent = '!failed to load the lyric :(';
    }
    this.lyricContainer.textContent = 'loading lyric...';
    request.send();
  },
  parseLyric(text) {
    // get each line from the text
    let lines = text.split('\n');

    // this regex mathes the time [00.12.78]

    const pattern = /\[\d{2}:\d{2}.\d{2}\]/g;


    const result = [];

    // Get offset from lyrics
    const offset = this.getOffset(text);

    // exclude the description parts or empty parts of the lyric
    while (!pattern.test(lines[0])) {
      lines = lines.slice(1);
    }
    ;
    // remove the last empty item
    lines[lines.length - 1].length === 0 && lines.pop();
    // display all content on the page
    lines.forEach((v, i, a) => {
      const time = v.match(pattern);


      const value = v.replace(pattern, '');
      time.forEach((v1, i1, a1) => {
        // convert the [min:sec] to secs format then store into result
        const t = v1.slice(1, -1).split(':');
        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]) + parseInt(offset) / 1000, value]);
      });
    });
    // sort the result by time
    result.sort((a, b) => a[0] - b[0]);
    console.log(result);
    return result;
  },
  appendLyric(lyric) {
    const that = this;


    const lyricContainer = this.lyricContainer;


    const fragment = document.createDocumentFragment();
    // clear the lyric container first
    this.lyricContainer.innerHTML = '';
    lyric.forEach((v, i, a) => {
      const line = document.createElement('p');
      line.id = `line-${i}`;
      line.textContent = v[1];
      fragment.appendChild(line);
    });
    lyricContainer.appendChild(fragment);
  },
  getOffset(text) {
    // Returns offset in miliseconds.
    let offset = 0;
    try {
      // Pattern matches [offset:1000]
      const offsetPattern = /\[offset:\-?\+?\d+\]/g;

      // Get only the first match.

      const offset_line = text.match(offsetPattern)[0];

      // Get the second part of the offset.

      const offset_str = offset_line.split(':')[1];
      // Convert it to Int.
      offset = window.parseInt(offset_str);
    } catch (err) {
      // alert("offset error: "+err.message);
      offset = 0;
    }
    return offset;
  }
};
