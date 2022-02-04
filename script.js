/*
Created by LJPiffer

Github: https://github.com/pifferlj
*/

new Vue({
  el: '#app',
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: 'Uma Malandra',
          artist: 'MC Davi e Alok ',
          cover:
            'https://www.abcdacomunicacao.com.br/wp-content/uploads/alok-chilli-341x375.jpg',
          source: 'musicas/MC Davi e Alok .mp3',
          url: 'https://www.youtube.com/watch?v=Z6WzuFICuP0',
          favorited: false
        },
        {
          name: 'In My Mind',
          artist: 'ALOK E John Legend ',
          cover: 'https://i.ytimg.com/vi/ZKr4ys2avI0/hqdefault.jpg',
          source: 'musicas/Alok e John Legend - In My Mind .mp3',
          url: 'https://www.youtube.com/watch?v=ZKr4ys2avI0',
          favorited: true
        },
        {
          name: 'Side Effect',
          artist: 'ALOK',
          cover:
            'https://s2.glbimg.com/Ji81jPDIJdBSjuqbpsj7doyKeN8=/smart/e.glbimg.com/og/ed/f/original/2020/10/28/gq110_moda-alok_6.png',
          source:
            'musicas/Alok - Side Effects (feat. Au_Ra) [Official Audio].mp3',
          url: 'https://www.youtube.com/watch?v=a5dx4ueCn44',
          favorited: false
        },
        {
          name: 'Wherever You Go',
          artist: 'ALOK',
          cover:
            'https://assets.papelpop.com/wp-content/uploads/2021/11/alok-scaled.jpg',
          source: 'musicas/Alok feat. John Martin.mp3',
          url: 'https://www.youtube.com/watch?v=OUTqP0YBzas',
          favorited: false
        },
        {
          name: 'Typical',
          artist: 'ALOK',
          cover: 'https://i.ytimg.com/vi/dOchPfp2pXs/hqdefault.jpg',
          source: 'musicas/Alok e Steve Aoki - .mp3',
          url: 'https://www.youtube.com/watch?v=dOchPfp2pXs',
          favorited: true
        },
        {
          name: 'Sky High',
          artist: 'ALOK',
          cover: 'https://i.ytimg.com/vi/9UbGXnLjLmM/hqdefault.jpg',
          source: 'musicas/Alok - Sky High .mp3',
          url: 'https://www.youtube.com/watch?v=9UbGXnLjLmM',
          favorited: false
        },
        {
          name: 'Bella Ciao',
          artist: 'Alok, Bhaskar & Jetlag Music ',
          cover: 'https://i.ytimg.com/vi/2eSTXIdZb-E/hqdefault.jpg',
          source: 'musicas/Alok - Bella Ciao.mp3',
          url: 'https://www.youtube.com/watch?v=2eSTXIdZb-E',
          favorited: true
        },
        {
          name: 'Table For 2',
          artist: 'ALOK e IRO',
          cover: 'https://i.ytimg.com/vi/EH6Xkg-UUog/hqdefault.jpg',
          source: 'musicas/Alok e IRO .mp3',
          url: 'https://www.youtube.com/watch?v=EH6Xkg-UUog',
          favorited: false
        },
        {
          name: 'Love Again',
          artist: 'ALOK',
          cover: 'https://i.ytimg.com/vi/bhU_DEM-7Yc/hqdefault.jpg',
          source: 'musicas/Alok - Love Again.mp3',
          url: 'https://www.youtube.com/watch?v=bhU_DEM-7Yc',
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    }
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play()
        this.isTimerPlaying = true
      } else {
        this.audio.pause()
        this.isTimerPlaying = false
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime
      this.barWidth = width + '%'
      this.circleLeft = width + '%'
      let durmin = Math.floor(this.audio.duration / 60)
      let dursec = Math.floor(this.audio.duration - durmin * 60)
      let curmin = Math.floor(this.audio.currentTime / 60)
      let cursec = Math.floor(this.audio.currentTime - curmin * 60)
      if (durmin < 10) {
        durmin = '0' + durmin
      }
      if (dursec < 10) {
        dursec = '0' + dursec
      }
      if (curmin < 10) {
        curmin = '0' + curmin
      }
      if (cursec < 10) {
        cursec = '0' + cursec
      }
      this.duration = durmin + ':' + dursec
      this.currentTime = curmin + ':' + cursec
    },
    updateBar(x) {
      let progress = this.$refs.progress
      let maxduration = this.audio.duration
      let position = x - progress.offsetLeft
      let percentage = (100 * position) / progress.offsetWidth
      if (percentage > 100) {
        percentage = 100
      }
      if (percentage < 0) {
        percentage = 0
      }
      this.barWidth = percentage + '%'
      this.circleLeft = percentage + '%'
      this.audio.currentTime = (maxduration * percentage) / 100
      this.audio.play()
    },
    clickProgress(e) {
      this.isTimerPlaying = true
      this.audio.pause()
      this.updateBar(e.pageX)
    },
    prevTrack() {
      this.transitionName = 'scale-in'
      this.isShowCover = false
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--
      } else {
        this.currentTrackIndex = this.tracks.length - 1
      }
      this.currentTrack = this.tracks[this.currentTrackIndex]
      this.resetPlayer()
    },
    nextTrack() {
      this.transitionName = 'scale-out'
      this.isShowCover = false
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++
      } else {
        this.currentTrackIndex = 0
      }
      this.currentTrack = this.tracks[this.currentTrackIndex]
      this.resetPlayer()
    },
    resetPlayer() {
      this.barWidth = 0
      this.circleLeft = 0
      this.audio.currentTime = 0
      this.audio.src = this.currentTrack.source
      setTimeout(() => {
        if (this.isTimerPlaying) {
          this.audio.play()
        } else {
          this.audio.pause()
        }
      }, 300)
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited =
        !this.tracks[this.currentTrackIndex].favorited
    }
  },
  created() {
    let vm = this
    this.currentTrack = this.tracks[0]
    this.audio = new Audio()
    this.audio.src = this.currentTrack.source
    this.audio.ontimeupdate = function () {
      vm.generateTime()
    }
    this.audio.onloadedmetadata = function () {
      vm.generateTime()
    }
    this.audio.onended = function () {
      vm.nextTrack()
      this.isTimerPlaying = true
    }

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index]
      let link = document.createElement('link')
      link.rel = 'prefetch'
      link.href = element.cover
      link.as = 'image'
      document.head.appendChild(link)
    }
  }
})
