export default class YouTube {
  constructor(element) {
    this.element = element;
    this.ytContainer = this.element.querySelector('.js-youtube');
    this.poster = this.element.querySelector('.js-poster');
    this.ytId = this.element.dataset.youtubeId;
    this.autoplay = this.poster ? 1 : 0; //????
    this.playerReady = false;
    YouTube.instances.push(this);
    if (this.ytId) {
      YouTube.loadScript();
    } else {
      console.error('specifier ID');
    }

    // this.init();
  }
  static loadScript() {
    if (!YouTube.scriptIsLoading) {
      YouTube.scriptIsLoading = true;
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }
  }

  init() {
    this.initPlayer = this.initPlayer.bind(this);
    if (this.poster) {
      this.element.addEventListener('click', this.initPlayer.bind(this));
    } else {
      this.initPlayer();
    }
  }
  initPlayer(evt) {
    if (evt) {
      this.element.removeEventListener('click', this.initPlayer);
    }
    this.player = new YT.Player(this.ytContainer, {
      height: '100%',
      width: '100%',

      videoId: this.ytId,
      playerVars: {
        rel: 0, //video relier a la video
        //ici pour cacher lien yt (voir doc)
        autoplay: this.autoplay,
      },
      events: {
        onReady: () => {
          this.playerReady = true;
          const observer = new IntersectionObserver(this.watch.bind(this), {
            rootMargin: '0px 0px 0px 0px',
          });
          observer.observe(this.element);
        },
        onStateChange: (evt) => {
          if (evt.data == YT.PlayerState.PLAYING) {
            YouTube.pauseAll(this);
          } else if (evt.data == YT.PlayerState.ENDED) {
            this.player.seekTo(0);
            this.player.pauseVideo();
          }
        },
      },
    });
  }
  watch(entries) {
    if (this.playerReady && !entries[0].isIntersecting) {
      this.player.pauseVideo();
    }
  }
  static initAll() {
    document.documentElement.classList.add('is-video-ready');
    for (let i = 0; i < YouTube.instances.length; i++) {
      const instence = YouTube.instances[i];
      instence.init();
    }
  }
  static pauseAll(currentInstance) {
    for (let i = 0; i < YouTube.instances.length; i++) {
      const instence = YouTube.instances[i];
      console.log('test');
      if (instence.playerReady && instence !== currentInstance) {
        console.log('test1');
        instence.player.pauseVideo();
      }
    }
  }
}
YouTube.instances = [];
window.onYouTubeIframeAPIReady = YouTube.initAll;
