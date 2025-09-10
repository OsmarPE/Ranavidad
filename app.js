
class IconManager {
    static icons = {
        play: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-play-icon lucide-play">
                                <path
                                    d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                            </svg>`,
        pause: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause-icon lucide-pause"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>`,
        soundSilent: ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                class="lucide lucide-volume2-icon lucide-volume-2">
                                <path
                                    d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                                <path d="M16 9a5 5 0 0 1 0 6" />
                                <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
                            </svg>`,
        sound: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-icon lucide-volume"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/></svg>`
    };

    static getIcon(iconName) {
        return this.icons[iconName] || '';
    }
}

class CountdownTimer {
    constructor(targetDate) {
        this.targetDate = new Date(targetDate);
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        this.intervalId = null;
        this.isDayTarget = false;
    }

    calculateTimeDifference() {
        const now = new Date();
        const timeDiff = this.targetDate - now;
        const nextDayOfTarget = new Date(this.targetDate);
        nextDayOfTarget.setDate(this.targetDate.getDate() + 1);

        if (now > this.targetDate && now < nextDayOfTarget) {
            this.isDayTarget = true;            
            return
        }

        this.isDayTarget = false;

        if (timeDiff <= 0) {
            this.updateToNextYear();
            return this.calculateTimeDifference();
        }
        

        return {
            days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((timeDiff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((timeDiff / (1000 * 60)) % 60),
            seconds: Math.floor((timeDiff / 1000) % 60)
        };
    }

    updateToNextYear() {
        const nextYear = this.targetDate.getFullYear() + 1;
        this.targetDate = new Date(`${nextYear}-12-25T00:00:00`);
    }

    formatNumber(number) {
        return number.toString().padStart(2, '0');
    }

    updateDisplay() {
        const timeDiff = this.calculateTimeDifference();
        
        this.elements.days.innerHTML = this.formatNumber(timeDiff.days);
        this.elements.hours.innerHTML = this.formatNumber(timeDiff.hours);
        this.elements.minutes.innerHTML = this.formatNumber(timeDiff.minutes);
        this.elements.seconds.innerHTML = this.formatNumber(timeDiff.seconds);
    }

    start() {
        this.updateDisplay(); // Actualizar inmediatamente
        this.intervalId = setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

class VideoPlayer {
    constructor(videoSelector, playButtonSelector, soundButtonSelector, bodySelector) {
        this.video = document.querySelector(videoSelector);
        this.playButton = document.querySelector(playButtonSelector);
        this.soundButton = document.querySelector(soundButtonSelector);
        this.body = document.querySelector(bodySelector);
        this.paused = true; 
        this.video.currentTime = 44;
        this.init();
    }

    init() {
        this.addEventListeners();
    }

    addEventListeners() {
        this.playButton.addEventListener('click', () => this.togglePlay());
        this.soundButton.addEventListener('click', () => this.toggleSound());
        this.video.addEventListener('canplaythrough', () => this.onVideoReady());
        this.video.addEventListener('play', () => { this.paused = false; this.changeStatusVideo() });
        this.video.addEventListener('pause', () => { this.paused = true; this.changeStatusVideo() });
    }

    togglePlay() {
        if (this.video.paused) {
            this.video.play();
            this.paused = false;
        } else {
            this.video.pause();
            this.paused = true;
        }
        this.changeStatusVideo();
    }
    
    changeStatusVideo() {
        if (!this.paused) {
            this.playButton.innerHTML = IconManager.getIcon('pause');
        } else {
            this.playButton.innerHTML = IconManager.getIcon('play');
        }
    }

    toggleSound() {
        if (this.video.muted) {
            this.video.muted = false;
            this.soundButton.innerHTML = IconManager.getIcon('sound');
        } else {
            this.video.muted = true;
            this.soundButton.innerHTML = IconManager.getIcon('soundSilent');
        }
    }

    onVideoReady() {
        this.body.style.backdropFilter = 'blur(0px)';
    }

    play() {
        this.video.play();
        this.playButton.innerHTML = IconManager.getIcon('pause');
    }

    pause() {
        this.video.pause();
        this.playButton.innerHTML = IconManager.getIcon('play');
    }

    mute() {
        this.video.muted = true;
        this.soundButton.innerHTML = IconManager.getIcon('soundSilent');
    }

    unmute() {
        this.video.muted = false;
        this.soundButton.innerHTML = IconManager.getIcon('sound');
    }
}

class Modal {
    constructor(modalSelector, openButtonSelector, closeButtonSelector) {
        this.modal = document.querySelector(modalSelector);
        this.openButton = document.querySelector(openButtonSelector);
        this.closeButton = document.querySelector(closeButtonSelector);
        
        this.init();
    }

    init() {
        this.addEventListeners();
    }

    addEventListeners() {
        this.openButton.addEventListener('click', () => this.open());
        this.closeButton.addEventListener('click', () => this.close());
        
        // Cerrar modal al hacer clic fuera del contenido
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
        
        // Cerrar modal con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
    }

    open() {
        this.modal.classList.add('active');
    }

    close() {
        this.modal.classList.remove('active');
    }

    isOpen() {
        return this.modal.classList.contains('active');
    }
}

// Clase principal de la aplicación
class ChristmasApp {
    constructor() {
        this.countdown = null;
        this.videoPlayer = null;
        this.modal = null;
        
        this.init();
    }

    init() {
        this.countdown = new CountdownTimer('2025-12-25T00:00:00');
        this.countdown.start();

        this.videoPlayer = new VideoPlayer('#video', '#btn-play', '#btn-sound', '.body');

        this.modal = new Modal('.modal', '#btn-notification', '#modal-btn-close');
    }

    destroy() {
        if (this.countdown) {
            this.countdown.stop();
        }
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const app = new ChristmasApp();
    
    window.christmasApp = app;
});
