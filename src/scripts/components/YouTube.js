export default class YouTube {
  constructor(element) {
    this.element = element;
    this.ytContainer = this.element.querySelector('.js-youtube'); // Container element for the YouTube iframe
    this.poster = this.element.querySelector('.js-poster'); // Poster element that serves as a play button
    this.ytId = this.element.dataset.youtubeId; // YouTube video ID from data attribute
    this.autoplay = this.poster ? 1 : 0; // Autoplay only if poster exists (click to play)
    this.playerReady = false; // Tracks if the YouTube player is ready
    YouTube.instances.push(this); // Adds this instance to the static instances array

    // If a video ID is provided, load the YouTube API script
    if (this.ytId) {
      YouTube.loadScript();
    } else {
      console.error('Specify a YouTube ID');
    }

    // this.init(); // Uncomment to automatically initialize without click event
  }

  // Static method to load YouTube API script once if not already loaded
  static loadScript() {
    if (!YouTube.scriptIsLoading) {
      YouTube.scriptIsLoading = true;
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }
  }

  // Initializes the player on click or load based on presence of poster
  init() {
    this.initPlayer = this.initPlayer.bind(this);
    if (this.poster) {
      this.element.addEventListener('click', this.initPlayer.bind(this)); // Initialize player on click
    } else {
      this.initPlayer(); // Initialize immediately if no poster
    }
  }

  // Initialize the YouTube player and configure options
  initPlayer(evt) {
    if (evt) {
      this.element.removeEventListener('click', this.initPlayer); // Remove click event after first click
    }

    this.player = new YT.Player(this.ytContainer, {
      // Create YouTube player in container
      height: '100%',
      width: '100%',
      videoId: this.ytId,
      playerVars: {
        rel: 0, // Disable related videos at end of playback
        autoplay: this.autoplay, // Enable autoplay if set
      },
      events: {
        onReady: () => {
          this.playerReady = true; // Set player ready status to true

          // Set up intersection observer to pause video when not in view
          const observer = new IntersectionObserver(this.watch.bind(this), {
            rootMargin: '0px 0px 0px 0px',
          });
          observer.observe(this.element);
        },
        onStateChange: (evt) => {
          // Pause all other instances if video starts playing
          if (evt.data == YT.PlayerState.PLAYING) {
            YouTube.pauseAll(this);
          } else if (evt.data == YT.PlayerState.ENDED) {
            // Restart video from beginning if it ends
            this.player.seekTo(0);
            this.player.pauseVideo();
          }
        },
      },
    });
  }

  // Watches if element is intersecting viewport, pausing video if out of view
  watch(entries) {
    if (this.playerReady && !entries[0].isIntersecting) {
      this.player.pauseVideo();
    }
  }

  // Initializes all YouTube instances on the page
  static initAll() {
    document.documentElement.classList.add('is-video-ready'); // Add class indicating video readiness
    for (let i = 0; i < YouTube.instances.length; i++) {
      const instance = YouTube.instances[i];
      instance.init();
    }
  }

  // Pauses all videos except the current instance
  static pauseAll(currentInstance) {
    for (let i = 0; i < YouTube.instances.length; i++) {
      const instance = YouTube.instances[i];
      if (instance.playerReady && instance !== currentInstance) {
        instance.player.pauseVideo();
      }
    }
  }
}

// Static array to hold all YouTube instances on the page
YouTube.instances = [];

// Callback function for the YouTube API to initialize all players once API is loaded
window.onYouTubeIframeAPIReady = YouTube.initAll;
