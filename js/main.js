/**
 * ============================================================================
 * PRAJWAL SHASHIKANT DONGARE - MACOS PORTFOLIO
 * Main JavaScript Engine (Vanilla JS)
 * 
 * Step 1: Boot Sequence, Lock Screen, Live Clock, and Power Management
 * Designed with Apple macOS Sonoma / Sequoia aesthetics & performance.
 * ============================================================================
 */

// Wrap in an IIFE (Immediately Invoked Function Expression) to keep global scope clean
(function () {
  'use strict';

  /* ==========================================================================
     PROJECT CAROUSEL DATA CONFIGURATION
     Define image lists and captions in this single array to easily add,
     remove, or modify project screenshots across cards and lightbox.
     ========================================================================== */
  const PROJECT_CAROUSELS_CONFIG = [
    {
      id: 'visionflux',
      title: 'VisionFlux',
      basePath: 'assets/projects/visionflux/',
      slides: [
        { file: '1-home.png', caption: 'Home', alt: 'VisionFlux - Home screenshot' },
        { file: '2-login.png', caption: 'Secure login', alt: 'VisionFlux - Secure login screenshot' },
        { file: '3-prompt.png', caption: 'Prompt input', alt: 'VisionFlux - Prompt input screenshot' },
        { file: '4-result.png', caption: 'Generated video', alt: 'VisionFlux - Generated video screenshot' },
        { file: '5-dashboard.png', caption: 'User dashboard', alt: 'VisionFlux - User dashboard screenshot' },
        { file: '6-payment.png', caption: 'Secure payment', alt: 'VisionFlux - Secure payment screenshot' }
      ]
    },
    {
      id: 'home-cleaning',
      title: 'Home Cleaning Assistant',
      basePath: 'assets/projects/home-cleaning/',
      slides: [
        { file: '1-home.png', caption: 'Home', alt: 'Home Cleaning Assistant - Home screenshot' },
        { file: '2-our-team.png', caption: 'Our team', alt: 'Home Cleaning Assistant - Our team screenshot' },
        { file: '3-packages.png', caption: 'Service packages', alt: 'Home Cleaning Assistant - Service packages screenshot' },
        { file: '4-booking.png', caption: 'Online booking', alt: 'Home Cleaning Assistant - Online booking screenshot' }
      ]
    }
  ];

  /* ==========================================================================
     RESUME REGISTRY CONFIGURATION
     Multi-resume documents available in the Resume app and across the portfolio.
     Easily edit, add, or reorder resumes in this single array.
     ========================================================================== */
  const RESUMES_CONFIG = [
    {
      id: 'python-full-stack',
      title: 'Python Full Stack',
      file: 'assets/resumes/Prajwal-Dongare-Python-Full-Stack.pdf',
      downloadName: 'Prajwal-Dongare-Python-Full-Stack.pdf',
      note: 'Python, Flask, REST APIs, Angular, Spring Boot',
      bestFor: 'Developer roles',
      recommended: true
    },
    {
      id: 'ai-engineer',
      title: 'AI Engineer',
      file: 'assets/resumes/Prajwal-Dongare-AI-Engineer.pdf',
      downloadName: 'Prajwal-Dongare-AI-Engineer.pdf',
      note: 'Python, Generative AI, AI API integration',
      bestFor: 'AI and Generative AI roles',
      recommended: false
    },
    {
      id: 'data-analyst',
      title: 'Data Analyst',
      file: 'assets/resumes/Prajwal-Dongare-Data-Analyst.pdf',
      downloadName: 'Prajwal-Dongare-Data-Analyst.pdf',
      note: 'SQL, Python, Power BI, ETL',
      bestFor: 'Data and BI roles',
      recommended: false
    }
  ];

  /* ==========================================================================
     EXPERIENCE TIMELINE CONFIGURATION
     Add, modify, or reorder career & internship experiences in this single array.
     Entries are displayed newest first.
     ========================================================================== */
  const EXPERIENCES_CONFIG = [
    {
      role: 'Java Full Stack Developer',
      company: 'Code Crafter Service',
      type: 'Internship',
      dates: 'Jun 2025 - Sep 2025',
      location: 'Kolhapur, Maharashtra',
      bullets: [
        'Developed responsive and cross-browser web interfaces using HTML, CSS and JavaScript for a Home Cleaning Assistant application.',
        'Designed interactive UI components and integrated them with backend services to support end-to-end workflows for service management, customer bookings and CRUD operations.'
      ],
      tech: ['Java', 'JSP', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
      projectTarget: 'home-cleaning',
      liveDemoUrl: 'https://home-cleaning-assistant-1.onrender.com/home.jsp'
    }
  ];

  /* ==========================================================================
     1. SOUND SYNTHESIZER (WEB AUDIO API)
     Lightweight audio engine for authentic macOS UI feedback (default: off).
     No external audio files required!
     ========================================================================== */
  const SoundFX = {
    audioCtx: null,
    isMuted: (() => {
      try {
        return localStorage.getItem('prajwal_portfolio_sound_muted') === 'true';
      } catch (e) {
        return false;
      }
    })(),

    // Initialize audio context lazily on user gesture
    init() {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }
    },

    setMuted(muted) {
      this.isMuted = muted;
      try {
        localStorage.setItem('prajwal_portfolio_sound_muted', muted ? 'true' : 'false');
      } catch (e) { }
    },

    // Soft Apple-like click sound
    playClick() {
      if (this.isMuted) return;
      try {
        this.init();
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
        if (!this.audioCtx) return;

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.04);

        gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.04);
      } catch (e) {
        console.warn('Audio playback not supported or blocked:', e);
      }
    },

    // Harmonic Apple-style unlock chime
    playUnlock() {
      if (this.isMuted) return;
      try {
        this.init();
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
        if (!this.audioCtx) return;

        const now = this.audioCtx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 chord

        notes.forEach((freq, index) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + index * 0.05);

          gain.gain.setValueAtTime(0.08, now + index * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.05 + 0.35);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start(now + index * 0.05);
          osc.stop(now + index * 0.05 + 0.35);
        });
      } catch (e) {
        console.warn('Unlock chime error:', e);
      }
    },

    // Synthesized authentic macOS paper crumple / swoosh sound
    playTrash() {
      if (this.isMuted) return;
      try {
        this.init();
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }
        if (!this.audioCtx) return;

        const now = this.audioCtx.currentTime;
        const duration = 0.28;
        const bufferSize = Math.floor(this.audioCtx.sampleRate * duration);
        const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = this.audioCtx.createBufferSource();
        whiteNoise.buffer = buffer;

        const filter = this.audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.frequency.exponentialRampToValueAtTime(260, now + duration);
        filter.Q.setValueAtTime(2.2, now);

        const gainNode = this.audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.18, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);

        whiteNoise.start(now);
      } catch (e) {
        console.warn('Trash audio playback error:', e);
      }
    }
  };


  /* ==========================================================================
     2. STAGE 1: BOOT SEQUENCE CONTROLLER
     Manages the pure black boot screen, 3-second progress bar, and skip intro.
     Remembers state in sessionStorage so refreshes skip the sequence.
     ========================================================================== */
  const BootManager = {
    bootScreen: document.getElementById('boot-screen'),
    progressBar: document.getElementById('boot-progress-bar'),
    progressTrack: document.getElementById('boot-progress-track'),
    skipBtn: document.getElementById('boot-skip-btn'),
    sessionKey: 'prajwal_mac_has_booted',
    animationFrameId: null,

    init() {
      // Check if user has already booted during this browser session
      const hasBooted = sessionStorage.getItem(this.sessionKey) === 'true';

      if (hasBooted) {
        // Skip boot sequence instantly and show lock screen
        this.bootScreen.style.display = 'none';
      } else {
        // Start the 3-second boot loading animation
        this.startBootProgress();
      }

      // Add click listener to Skip Intro button
      if (this.skipBtn) {
        this.skipBtn.addEventListener('click', () => {
          SoundFX.playClick();
          this.skipBoot();
        });
      }
    },

    // Smoothly animate the progress bar from 0% to 100% over ~3 seconds (3000ms)
    startBootProgress() {
      const startTime = performance.now();
      const duration = 2800; // 2.8 seconds for responsive Apple feel

      const updateProgress = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Apple ease-out cubic curve: progress slow at the start, smooth deceleration
        const easedProgress = 1 - Math.pow(1 - progress, 2.5);
        const percentage = (easedProgress * 100).toFixed(1);

        if (this.progressBar) {
          this.progressBar.style.width = `${percentage}%`;
        }
        if (this.progressTrack) {
          this.progressTrack.setAttribute('aria-valuenow', percentage);
        }

        if (progress < 1) {
          this.animationFrameId = requestAnimationFrame(updateProgress);
        } else {
          // Finished loading! Fade into the Lock Screen
          this.finishBoot();
        }
      };

      this.animationFrameId = requestAnimationFrame(updateProgress);
    },

    // Skip the boot immediately when requested
    skipBoot() {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
      this.finishBoot();
    },

    // Transition from Boot Screen to Lock Screen
    finishBoot() {
      // Mark session as booted
      sessionStorage.setItem(this.sessionKey, 'true');

      // Add fade out animation class
      this.bootScreen.classList.add('fade-out');

      // Remove from layout after fade transition completes
      setTimeout(() => {
        this.bootScreen.style.display = 'none';
      }, 800);
    },

    // Reboot sequence (used by the Restart action on the lock screen)
    reboot() {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }
      // Reset progress bar
      if (this.progressBar) {
        this.progressBar.style.width = '0%';
      }
      this.bootScreen.classList.remove('fade-out');
      this.bootScreen.style.display = 'flex';

      // Re-run boot progress after a short pause
      setTimeout(() => {
        this.startBootProgress();
      }, 200);
    }
  };


  /* ==========================================================================
     3. STAGE 2: LOCK SCREEN & CLOCK CONTROLLER
     Live macOS clock, unlock transition, and power options.
     ========================================================================== */
  const LockScreenManager = {
    lockScreen: document.getElementById('lock-screen'),
    timeElement: document.getElementById('lock-time'),
    dateElement: document.getElementById('lock-date'),
    enterBtn: document.getElementById('lock-enter-btn'),
    avatarWrapper: document.getElementById('lock-avatar-wrapper'),

    // Power buttons
    sleepBtn: document.getElementById('lock-sleep-btn'),
    restartBtn: document.getElementById('lock-restart-btn'),
    shutdownBtn: document.getElementById('lock-shutdown-btn'),

    // Overlays
    sleepOverlay: document.getElementById('sleep-overlay'),
    shutdownScreen: document.getElementById('shutdown-screen'),

    init() {
      // 1. Initialize and start live clock
      this.updateClock();
      setInterval(() => this.updateClock(), 1000);

      // 2. Unlock interaction
      if (this.enterBtn) {
        this.enterBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.unlock();
        });
      }

      // Clicking anywhere on lock screen (except power buttons) unlocks
      if (this.lockScreen) {
        this.lockScreen.addEventListener('click', (e) => {
          if (e.target.closest('.lock-power-btn') || e.target.closest('#sleep-overlay') || e.target.closest('#shutdown-screen')) {
            return;
          }
          if (!this.lockScreen.classList.contains('unlocked')) {
            this.unlock();
          }
        });
      }

      // Enter or Space key on keyboard unlocks lock screen if visible
      window.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !this.lockScreen.classList.contains('unlocked') && this.lockScreen.style.display !== 'none') {
          e.preventDefault();
          this.unlock();
        }
      });

      // 3. Power options
      this.setupPowerControls();
    },

    // Live Clock Update (formatted according to Apple macOS standards)
    updateClock() {
      const now = new Date();

      // Format time (HH:MM)
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      if (this.timeElement) {
        this.timeElement.textContent = `${hours}:${minutes}`;
      }

      // Format date (e.g. "Saturday, October 10")
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      const dateString = now.toLocaleDateString('en-US', options);
      if (this.dateElement) {
        this.dateElement.textContent = dateString;
      }
    },

    // Unlock Desktop with authentic animation
    unlock() {
      SoundFX.playUnlock();

      // Trigger avatar pulse animation
      if (this.avatarWrapper) {
        this.avatarWrapper.classList.add('pulse');
      }

      // Trigger lock screen dissolution
      this.lockScreen.classList.add('unlocked');

      // After dissolution completes, hide lock screen
      setTimeout(() => {
        this.lockScreen.style.display = 'none';
        // Ready for Step 2 Desktop events
        window.dispatchEvent(new CustomEvent('macos-unlocked'));
      }, 650);
    },

    // Relock system (can be called from menu bar in Step 2)
    lock() {
      this.lockScreen.style.display = 'flex';
      // Force reflow
      void this.lockScreen.offsetWidth;
      this.lockScreen.classList.remove('unlocked');
      if (this.avatarWrapper) {
        this.avatarWrapper.classList.remove('pulse');
      }
    },

    // Setup Sleep, Restart, and Shut Down interactions
    setupPowerControls() {
      // Sleep action
      if (this.sleepBtn) {
        this.sleepBtn.addEventListener('click', () => {
          SoundFX.playClick();
          this.sleep();
        });
      }

      // Wake from sleep on click or keypress
      if (this.sleepOverlay) {
        this.sleepOverlay.addEventListener('click', () => this.wake());
      }
      window.addEventListener('keydown', () => {
        if (this.sleepOverlay && this.sleepOverlay.classList.contains('active')) {
          this.wake();
        }
      });

      // Restart action
      if (this.restartBtn) {
        this.restartBtn.addEventListener('click', () => {
          SoundFX.playClick();
          // Reset lock screen state
          this.lockScreen.style.display = 'flex';
          this.lockScreen.classList.remove('unlocked');
          // Trigger boot manager reboot
          BootManager.reboot();
        });
      }

      // Shut Down action
      if (this.shutdownBtn) {
        this.shutdownBtn.addEventListener('click', () => {
          SoundFX.playClick();
          this.shutDown();
        });
      }

      // Wake / Start up from shut down on click or keypress
      if (this.shutdownScreen) {
        this.shutdownScreen.addEventListener('click', () => this.bootFromShutdown());
      }
      window.addEventListener('keydown', () => {
        if (this.shutdownScreen && this.shutdownScreen.classList.contains('active')) {
          this.bootFromShutdown();
        }
      });
    },

    sleep() {
      if (this.sleepOverlay) {
        this.sleepOverlay.classList.add('active');
      }
    },

    wake() {
      if (this.sleepOverlay) {
        this.sleepOverlay.classList.remove('active');
      }
    },

    shutDown() {
      if (this.shutdownScreen) {
        this.shutdownScreen.classList.add('active');
      }
    },

    bootFromShutdown() {
      if (this.shutdownScreen) {
        this.shutdownScreen.classList.remove('active');
      }
      // Reset lock screen
      this.lockScreen.style.display = 'flex';
      this.lockScreen.classList.remove('unlocked');
      // Trigger full boot sequence
      BootManager.reboot();
    }
  };


  /* ==========================================================================
     4. STAGE 3: THEME & WALLPAPER CONTROLLER
     Manages light/dark mode and dynamic wallpaper switching
     ========================================================================== */
  const ThemeManager = {
    currentTheme: 'dark',
    wallpapers: {
      photo: 'var(--wp-photo)',
      sonoma: 'var(--wp-sonoma)',
      sequoia: 'var(--wp-sequoia)',
      aurora: 'var(--wp-aurora)'
    },

    init() {
      // Check saved theme preference or default to sleek macOS dark
      let initialTheme = 'dark';
      try {
        const savedTheme = localStorage.getItem('prajwal_portfolio_theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
          initialTheme = savedTheme;
        }
      } catch (e) { }
      this.setTheme(initialTheme);

      // Check saved wallpaper preference or default to custom photo wallpaper
      let initialWp = 'photo';
      try {
        const savedWp = localStorage.getItem('prajwal_portfolio_wallpaper');
        if (savedWp && this.wallpapers[savedWp] && savedWp !== 'sonoma') {
          initialWp = savedWp;
        }
      } catch (e) { }
      this.setWallpaper(initialWp, false);

      // Setup wallpaper click handlers from menu & context menu
      document.getElementById('menu-wp-photo')?.addEventListener('click', () => this.setWallpaper('photo'));
      document.getElementById('menu-wp-sonoma')?.addEventListener('click', () => this.setWallpaper('sonoma'));
      document.getElementById('menu-wp-sequoia')?.addEventListener('click', () => this.setWallpaper('sequoia'));
      document.getElementById('menu-wp-aurora')?.addEventListener('click', () => this.setWallpaper('aurora'));

      document.getElementById('ctx-wp-photo')?.addEventListener('click', () => this.setWallpaper('photo'));
      document.getElementById('ctx-wp-sonoma')?.addEventListener('click', () => this.setWallpaper('sonoma'));
      document.getElementById('ctx-wp-sequoia')?.addEventListener('click', () => this.setWallpaper('sequoia'));
      document.getElementById('ctx-wp-aurora')?.addEventListener('click', () => this.setWallpaper('aurora'));
    },

    toggleTheme() {
      const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      this.setTheme(nextTheme);
    },

    setTheme(theme) {
      this.currentTheme = theme;
      document.documentElement.setAttribute('data-theme', theme);
      try {
        localStorage.setItem('prajwal_portfolio_theme', theme);
      } catch (e) { }

      const darkIcon = document.getElementById('theme-icon-dark');
      const lightIcon = document.getElementById('theme-icon-light');
      const ctxThemeSpan = document.querySelector('#ctx-theme-toggle span');

      if (theme === 'light') {
        if (darkIcon) darkIcon.style.display = 'none';
        if (lightIcon) lightIcon.style.display = 'block';
        if (ctxThemeSpan) ctxThemeSpan.textContent = 'Switch to Dark Mode';
      } else {
        if (darkIcon) darkIcon.style.display = 'block';
        if (lightIcon) lightIcon.style.display = 'none';
        if (ctxThemeSpan) ctxThemeSpan.textContent = 'Switch to Light Mode';
      }

      // If Safari story is mounted, refresh ScrollTrigger geometry
      if (typeof SafariScrollManager !== 'undefined' && SafariScrollManager.refresh) {
        SafariScrollManager.refresh();
      }
    },

    setWallpaper(key, playSound = true) {
      const wpValue = this.wallpapers[key] || this.wallpapers.photo;
      document.documentElement.style.setProperty('--active-wallpaper', wpValue);
      try {
        localStorage.setItem('prajwal_portfolio_wallpaper', key);
      } catch (e) { }
      if (playSound) {
        SoundFX.playClick();
      }
    }
  };


  /* ==========================================================================
     5. STAGE 3: TOP MENU BAR CONTROLLER
     Live clock, brand dropdown, menus, sound toggle and status indicators
     ========================================================================== */
  const MenuBarManager = {
    clockElement: document.getElementById('menu-live-clock'),
    soundToggleBtn: document.getElementById('sound-toggle-btn'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    menuItems: document.querySelectorAll('.menu-bar-left .menu-item'),

    init() {
      // 1. Live Menu Bar Clock
      this.updateClock();
      setInterval(() => this.updateClock(), 1000);

      // 2. Sound Toggle (Default: On)
      const syncSoundIcons = () => {
        const mutedIcon = document.getElementById('sound-icon-muted');
        const activeIcon = document.getElementById('sound-icon-active');
        if (mutedIcon) mutedIcon.style.display = SoundFX.isMuted ? 'block' : 'none';
        if (activeIcon) activeIcon.style.display = SoundFX.isMuted ? 'none' : 'block';
        if (this.soundToggleBtn) {
          this.soundToggleBtn.setAttribute('title', SoundFX.isMuted ? 'Sound: Muted (Click to enable)' : 'Sound: Enabled (Click to mute)');
        }
      };
      syncSoundIcons(); // show the correct icon on page load

      if (this.soundToggleBtn) {
        this.soundToggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          SoundFX.setMuted(!SoundFX.isMuted);
          syncSoundIcons();
          if (!SoundFX.isMuted) {
            SoundFX.playClick();
          }
        });
      }

      // 3. Theme Toggle Button
      if (this.themeToggleBtn) {
        this.themeToggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          SoundFX.playClick();
          ThemeManager.toggleTheme();
        });
      }

      const menuThemeToggle = document.getElementById('menu-theme-toggle');
      if (menuThemeToggle) {
        menuThemeToggle.addEventListener('click', () => {
          SoundFX.playClick();
          ThemeManager.toggleTheme();
        });
      }

      // 4. Menu Dropdowns Toggle
      this.menuItems.forEach((item) => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          const isActive = item.classList.contains('active');
          this.closeAllMenus();
          if (!isActive) {
            item.classList.add('active');
            item.setAttribute('aria-expanded', 'true');
          }
        });

        // Hover over adjacent menu while one is open (authentic macOS behavior)
        item.addEventListener('mouseenter', () => {
          const hasOpenMenu = Array.from(this.menuItems).some((m) => m.classList.contains('active'));
          if (hasOpenMenu) {
            this.closeAllMenus();
            item.classList.add('active');
            item.setAttribute('aria-expanded', 'true');
          }
        });
      });

      // Close menus when clicking outside
      document.addEventListener('click', () => {
        this.closeAllMenus();
      });

      // Keyboard Esc closes menus
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeAllMenus();
        }
      });

      // 5. Brand Menu Actions
      document.getElementById('menu-about-btn')?.addEventListener('click', () => {
        AboutModalManager.open();
      });

      document.getElementById('menu-lock-btn')?.addEventListener('click', () => {
        SoundFX.playClick();
        LockScreenManager.lock();
      });

      document.getElementById('menu-restart-btn')?.addEventListener('click', () => {
        SoundFX.playClick();
        WindowManager.closeAll();
        LockScreenManager.lock();
        BootManager.reboot();
      });

      document.getElementById('menu-shutdown-btn')?.addEventListener('click', () => {
        SoundFX.playClick();
        LockScreenManager.shutDown();
      });

      document.getElementById('menu-github-link')?.addEventListener('click', () => {
        window.open('https://github.com/dongareprajwal622', '_blank');
      });

      document.getElementById('menu-linkedin-link')?.addEventListener('click', () => {
        window.open('https://www.linkedin.com/in/prajwal-dongare-533099334/', '_blank', 'noopener,noreferrer');
      });

      document.getElementById('menu-help-about')?.addEventListener('click', () => {
        AboutModalManager.open();
      });
    },

    updateClock() {
      if (!this.clockElement) return;
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const dayName = days[now.getDay()];
      const dayNum = now.getDate();
      const monthName = months[now.getMonth()];
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');

      this.clockElement.textContent = `${dayName} ${dayNum} ${monthName} ${hours}:${minutes}`;
    },

    closeAllMenus() {
      this.menuItems.forEach((m) => {
        m.classList.remove('active');
        m.setAttribute('aria-expanded', 'false');
      });
    }
  };


  /* ==========================================================================
     6. STAGE 3: DOCK CONTROLLER & MAGNIFICATION ENGINE
     Icon magnification based on cursor distance, bounce on launch, indicator dots
     ========================================================================== */
  const DockManager = {
    dockContainer: document.getElementById('dock-container'),
    dock: document.getElementById('dock'),
    dockItems: document.querySelectorAll('.dock-item'),
    maxDistance: 140, // Pixel radius for cursor magnification influence
    maxScale: 1.55,   // Maximum icon magnification factor

    init() {
      if (!this.dock) return;

      // 1. Mouse move: compute authentic Apple cosine distance magnification
      this.dock.addEventListener('mousemove', (e) => {
        // Skip magnification on touch / small mobile screens
        if (window.innerWidth <= 768) return;

        const cursorX = e.clientX;

        this.dockItems.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const itemCenterX = rect.left + rect.width / 2;
          const distance = Math.abs(cursorX - itemCenterX);

          const iconWrapper = item.querySelector('.dock-icon-wrapper');
          if (!iconWrapper) return;

          if (distance < this.maxDistance) {
            // Smooth cosine falloff curve: scale approaches maxScale at center
            const progress = distance / this.maxDistance;
            const scale = 1 + (this.maxScale - 1) * Math.cos(progress * (Math.PI / 2));
            iconWrapper.style.transform = `scale(${scale.toFixed(3)}) translateY(-${((scale - 1) * 16).toFixed(1)}px)`;
          } else {
            iconWrapper.style.transform = 'scale(1) translateY(0)';
          }
        });
      });

      // 2. Mouse leave: smoothly reset all icons
      this.dock.addEventListener('mouseleave', () => {
        this.resetMagnification();
      });

      // 3. Dock Item Click: launch bounce & dispatch app launch
      this.dockItems.forEach((item) => {
        item.addEventListener('click', () => {
          const appName = item.getAttribute('data-app');
          this.launchApp(appName, item);
        });
      });
    },

    resetMagnification() {
      this.dockItems.forEach((item) => {
        const iconWrapper = item.querySelector('.dock-icon-wrapper');
        if (iconWrapper) {
          iconWrapper.style.transform = 'scale(1) translateY(0)';
        }
      });
    },

    // App launch sequence
    launchApp(appName, dockElement) {
      SoundFX.playClick();

      // Trigger bounce animation
      if (dockElement) {
        dockElement.classList.add('bouncing');
        setTimeout(() => {
          dockElement.classList.remove('bouncing');
        }, 1800);

        // Mark app as open with the subtle bottom dot
        dockElement.classList.add('is-open');
      }

      // Notify window system (Ready for Step 3 & 4)
      window.dispatchEvent(new CustomEvent('app-launch-requested', {
        detail: { appName }
      }));

      // Special action for Trash
      if (appName === 'trash') {
        console.log('Trash opened: Bin is clean.');
      }
    },

    // Set open dot state for an app
    setAppOpen(appName, isOpen) {
      const item = document.querySelector(`.dock-item[data-app="${appName}"]`);
      if (item) {
        if (isOpen) {
          item.classList.add('is-open');
        } else {
          item.classList.remove('is-open');
        }
      }
    }
  };


  /* ==========================================================================
     7. STAGE 3: DESKTOP & CONTEXT MENU CONTROLLER
     Desktop icons selection, double-click launch, right-click context menu
     ========================================================================== */
  const DesktopManager = {
    desktop: document.getElementById('desktop'),
    contextMenu: document.getElementById('context-menu'),
    desktopIcons: document.querySelectorAll('.desktop-icon-item'),

    init() {
      // 1. Desktop Icons: Selection, Double Click, Keyboard, and Touch
      this.desktopIcons.forEach((icon) => {
        // Single click selects
        icon.addEventListener('click', (e) => {
          e.stopPropagation();
          this.deselectAllIcons();
          icon.classList.add('selected');
        });

        // Double click launches
        icon.addEventListener('dblclick', (e) => {
          e.stopPropagation();
          const appName = icon.getAttribute('data-app');
          const dockItem = document.querySelector(`.dock-item[data-app="${appName}"]`);
          DockManager.launchApp(appName, dockItem);
        });

        // Keyboard Enter or Space launches
        icon.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const appName = icon.getAttribute('data-app');
            const dockItem = document.querySelector(`.dock-item[data-app="${appName}"]`);
            DockManager.launchApp(appName, dockItem);
          }
        });

        // Touch support on mobile / tablet
        let lastTap = 0;
        icon.addEventListener('touchend', (e) => {
          const now = Date.now();
          if (now - lastTap < 400 || window.innerWidth <= 768) {
            e.preventDefault();
            const appName = icon.getAttribute('data-app');
            const dockItem = document.querySelector(`.dock-item[data-app="${appName}"]`);
            DockManager.launchApp(appName, dockItem);
          }
          lastTap = now;
        });
      });

      // Click on desktop background deselects all icons and closes context menu
      this.desktop.addEventListener('click', () => {
        this.deselectAllIcons();
        this.closeContextMenu();
      });

      // 2. Right-click Context Menu
      this.desktop.addEventListener('contextmenu', (e) => {
        // Prevent default context menu on desktop
        e.preventDefault();

        // Close any open menu bar dropdowns
        MenuBarManager.closeAllMenus();

        this.openContextMenu(e.clientX, e.clientY);
      });

      // Context menu action: Toggle Dark Mode
      document.getElementById('ctx-theme-toggle')?.addEventListener('click', () => {
        ThemeManager.toggleTheme();
        this.closeContextMenu();
      });

      // Context menu action: About This Portfolio
      document.getElementById('ctx-about-btn')?.addEventListener('click', () => {
        AboutModalManager.open();
        this.closeContextMenu();
      });

      // Close context menu on Escape key
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeContextMenu();
        }
      });
    },

    deselectAllIcons() {
      this.desktopIcons.forEach((i) => i.classList.remove('selected'));
    },

    openContextMenu(x, y) {
      if (!this.contextMenu) return;

      this.contextMenu.style.display = 'flex';

      // Clamp context menu within viewport bounds so it never clips
      const menuWidth = this.contextMenu.offsetWidth || 210;
      const menuHeight = this.contextMenu.offsetHeight || 150;

      const clampedX = Math.min(x, window.innerWidth - menuWidth - 10);
      const clampedY = Math.min(y, window.innerHeight - menuHeight - 10);

      this.contextMenu.style.left = `${clampedX}px`;
      this.contextMenu.style.top = `${clampedY}px`;
    },

    closeContextMenu() {
      if (this.contextMenu) {
        this.contextMenu.style.display = 'none';
      }
    }
  };


  /* ==========================================================================
     8. "ABOUT THIS PORTFOLIO" MODAL CONTROLLER
     macOS Sequoia system information dialog
     ========================================================================== */
  const AboutModalManager = {
    modal: document.getElementById('about-mac-modal'),
    closeBtn: document.getElementById('about-modal-close'),
    doneBtn: document.getElementById('about-specs-close-btn'),

    init() {
      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.close());
      }
      if (this.doneBtn) {
        this.doneBtn.addEventListener('click', () => this.close());
      }

      // Close on backdrop click
      if (this.modal) {
        this.modal.addEventListener('click', (e) => {
          if (e.target === this.modal) {
            this.close();
          }
        });
      }

      // Escape key closes modal
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
          this.close();
        }
      });
    },

    open() {
      SoundFX.playClick();
      if (this.modal) {
        this.modal.classList.add('active');
      }
    },

    close() {
      SoundFX.playClick();
      if (this.modal) {
        this.modal.classList.remove('active');
      }
    }
  };


  /* ==========================================================================
     9. STAGE 3: MACOS WINDOW SYSTEM CONTROLLER
     Manages window lifecycle, drag, corner resize, z-index focus, minimize,
     maximize, traffic light controls, and keyboard shortcuts.
     ========================================================================== */
  const WindowManager = {
    windows: {},
    activeWindow: null,
    highestZIndex: 100,
    cascadeOffset: 0,

    init() {
      const windowElements = document.querySelectorAll('.mac-window');

      windowElements.forEach((win) => {
        const appId = win.getAttribute('data-app');
        if (!appId) return;

        this.windows[appId] = win;

        // 1. Traffic light controls
        const closeBtn = win.querySelector('.traffic-close');
        const minBtn = win.querySelector('.traffic-minimize');
        const maxBtn = win.querySelector('.traffic-fullscreen');

        closeBtn?.addEventListener('click', (e) => {
          e.stopPropagation();
          this.close(appId);
        });

        minBtn?.addEventListener('click', (e) => {
          e.stopPropagation();
          this.minimize(appId);
        });

        maxBtn?.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleMaximize(appId);
        });

        // 2. Focus on click anywhere on the window
        win.addEventListener('mousedown', () => {
          this.focus(appId);
        });

        // 3. Draggable Titlebar
        const titlebar = win.querySelector('.window-titlebar');
        if (titlebar) {
          this.setupDraggable(win, titlebar);
        }

        // 4. Corner Resizing
        const resizer = win.querySelector('.window-resize-handle');
        if (resizer) {
          this.setupResizable(win, resizer);
        }
      });

      // 5. Global app launch listener (from Dock or Desktop Icons)
      window.addEventListener('app-launch-requested', (e) => {
        const { appName } = e.detail;
        if (appName) {
          this.open(appName);
        }
      });

      // 6. Menu Bar Actions (File -> Close, Window -> Minimize, Zoom, Bring All)
      document.querySelector('[data-action="close-active"]')?.addEventListener('click', () => {
        this.closeActive();
      });

      document.querySelector('[data-action="minimize-active"]')?.addEventListener('click', () => {
        this.minimizeActive();
      });

      document.querySelector('[data-action="maximize-active"]')?.addEventListener('click', () => {
        this.toggleMaximizeActive();
      });

      document.querySelector('[data-action="bring-front"]')?.addEventListener('click', () => {
        this.bringAllToFront();
      });

      document.querySelector('[data-action="open-safari"]')?.addEventListener('click', () => {
        this.open('safari');
      });

      document.querySelector('[data-action="open-resume"]')?.addEventListener('click', () => {
        this.open('resume');
      });

      // 7. Keyboard Shortcuts: Esc, Cmd/Ctrl+W, Cmd/Ctrl+M
      window.addEventListener('keydown', (e) => {
        // Only handle if desktop is visible and lock screen is dismissed
        const lockScreen = document.getElementById('lock-screen');
        if (lockScreen && !lockScreen.classList.contains('unlocked') && lockScreen.style.display !== 'none') {
          return;
        }

        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

        // Cmd/Ctrl + W: Close Active Window
        if (cmdOrCtrl && (e.key === 'w' || e.key === 'W')) {
          e.preventDefault();
          this.closeActive();
          return;
        }

        // Cmd/Ctrl + M: Minimize Active Window
        if (cmdOrCtrl && (e.key === 'm' || e.key === 'M')) {
          e.preventDefault();
          this.minimizeActive();
          return;
        }

        // Escape: Close top window (if no modal or lightbox is open)
        if (e.key === 'Escape') {
          const aboutModal = document.getElementById('about-mac-modal');
          if (aboutModal && aboutModal.classList.contains('active')) {
            return; // handled by About modal
          }
          const lightbox = document.getElementById('project-lightbox');
          if (lightbox && lightbox.classList.contains('active')) {
            return; // handled by Lightbox
          }
          this.closeActive();
        }
      });
    },

    // Close all open windows (used on reboot / reset)
    closeAll() {
      Object.keys(this.windows).forEach((appId) => {
        const win = this.windows[appId];
        if (win && win.classList.contains('is-open')) {
          win.classList.remove('is-visible', 'is-active', 'is-open', 'is-maximized', 'is-minimized');
          DockManager.setAppOpen(appId, false);
        }
      });
      this.activeWindow = null;
    },

    // Open or restore a window
    open(appId) {
      const win = this.windows[appId];
      if (!win) {
        console.warn(`No window registered for app: ${appId}`);
        return;
      }

      SoundFX.playClick();

      // If currently minimized: unminimize
      if (win.classList.contains('is-minimized')) {
        win.classList.remove('is-minimized');
        this.focus(appId);
        DockManager.setAppOpen(appId, true);
        return;
      }

      // If already open and visible: just bring to front
      if (win.classList.contains('is-open')) {
        this.focus(appId);
        return;
      }

      // Stagger new window placement slightly (cascade) if on desktop
      if (window.innerWidth > 768 && !win.dataset.hasBeenPositioned) {
        this.cascadeOffset = (this.cascadeOffset + 24) % 120;
        const currentTop = parseInt(win.style.top, 10) || 60;
        const currentLeft = parseInt(win.style.left, 10) || 100;
        win.style.top = `${currentTop + this.cascadeOffset}px`;
        win.style.left = `${currentLeft + this.cascadeOffset}px`;
        win.dataset.hasBeenPositioned = 'true';
      }

      // Open with smooth Apple scale animation
      win.classList.add('is-open');
      void win.offsetWidth; // Force reflow
      win.classList.add('is-visible');

      this.focus(appId);
      DockManager.setAppOpen(appId, true);
    },

    // Close a window
    close(appId) {
      const win = this.windows[appId];
      if (!win || !win.classList.contains('is-open')) return;

      SoundFX.playClick();

      // Fade out and scale down
      win.classList.remove('is-visible');
      win.classList.remove('is-active');

      setTimeout(() => {
        win.classList.remove('is-open');
        win.classList.remove('is-maximized');
        DockManager.setAppOpen(appId, false);

        // Focus next topmost window
        this.focusTopmostWindow();
      }, 250);
    },

    // Minimize window toward the dock
    minimize(appId) {
      const win = this.windows[appId];
      if (!win || !win.classList.contains('is-open')) return;

      SoundFX.playClick();

      win.classList.remove('is-active');
      win.classList.add('is-minimized');

      this.focusTopmostWindow();
    },

    // Toggle window zoom / fullscreen
    toggleMaximize(appId) {
      const win = this.windows[appId];
      if (!win) return;

      SoundFX.playClick();

      if (win.classList.contains('is-maximized')) {
        // Restore previous dimensions
        win.classList.remove('is-maximized');
        if (win.dataset.prevWidth) win.style.width = win.dataset.prevWidth;
        if (win.dataset.prevHeight) win.style.height = win.dataset.prevHeight;
        if (win.dataset.prevTop) win.style.top = win.dataset.prevTop;
        if (win.dataset.prevLeft) win.style.left = win.dataset.prevLeft;
      } else {
        // Save current geometry and maximize
        win.dataset.prevWidth = win.style.width;
        win.dataset.prevHeight = win.style.height;
        win.dataset.prevTop = win.style.top;
        win.dataset.prevLeft = win.style.left;
        win.classList.add('is-maximized');
      }

      this.focus(appId);
    },

    // Focus window and manage z-index
    focus(appId) {
      const win = this.windows[appId];
      if (!win) return;

      this.highestZIndex += 1;
      win.style.zIndex = this.highestZIndex;

      // Update active states
      Object.values(this.windows).forEach((w) => {
        w.classList.remove('is-active');
      });

      win.classList.add('is-active');
      this.activeWindow = win;
    },

    // Focus the highest remaining open window
    focusTopmostWindow() {
      let topmost = null;
      let maxZ = -1;

      Object.values(this.windows).forEach((w) => {
        if (w.classList.contains('is-open') && !w.classList.contains('is-minimized')) {
          const z = parseInt(w.style.zIndex, 10) || 0;
          if (z > maxZ) {
            maxZ = z;
            topmost = w;
          }
        }
      });

      if (topmost) {
        const appId = topmost.getAttribute('data-app');
        this.focus(appId);
      } else {
        this.activeWindow = null;
      }
    },

    // Close the currently focused window
    closeActive() {
      if (this.activeWindow) {
        const appId = this.activeWindow.getAttribute('data-app');
        this.close(appId);
      }
    },

    // Minimize the currently focused window
    minimizeActive() {
      if (this.activeWindow) {
        const appId = this.activeWindow.getAttribute('data-app');
        this.minimize(appId);
      }
    },

    // Zoom/Maximize the currently focused window
    toggleMaximizeActive() {
      if (this.activeWindow) {
        const appId = this.activeWindow.getAttribute('data-app');
        this.toggleMaximize(appId);
      }
    },

    // Bring all open windows forward
    bringAllToFront() {
      Object.values(this.windows).forEach((w) => {
        if (w.classList.contains('is-open') && !w.classList.contains('is-minimized')) {
          this.highestZIndex += 1;
          w.style.zIndex = this.highestZIndex;
        }
      });
      if (this.activeWindow) {
        this.highestZIndex += 1;
        this.activeWindow.style.zIndex = this.highestZIndex;
      }
    },

    // Setup window titlebar drag physics
    setupDraggable(win, titlebar) {
      let isDragging = false;
      let startX = 0;
      let startY = 0;
      let initialLeft = 0;
      let initialTop = 0;

      const onMouseDown = (e) => {
        // Ignore clicks on traffic light buttons
        if (e.target.closest('.traffic-btn') || e.target.closest('button')) return;
        // Ignore if maximized
        if (win.classList.contains('is-maximized')) return;

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        const rect = win.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        this.focus(win.getAttribute('data-app'));

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        e.preventDefault();
      };

      const onMouseMove = (e) => {
        if (!isDragging) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;

        // Clamp boundaries: titlebar cannot go above menu bar (28px)
        const minTop = 28;
        const maxTop = window.innerHeight - 50;
        const minLeft = -win.offsetWidth + 80;
        const maxLeft = window.innerWidth - 80;

        newTop = Math.max(minTop, Math.min(newTop, maxTop));
        newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));

        win.style.left = `${newLeft}px`;
        win.style.top = `${newTop}px`;
      };

      const onMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      titlebar.addEventListener('mousedown', onMouseDown);

      // Touch drag support for mobile / tablets
      titlebar.addEventListener('touchstart', (e) => {
        if (e.target.closest('.traffic-btn')) return;
        if (win.classList.contains('is-maximized')) return;
        const touch = e.touches[0];
        isDragging = true;
        startX = touch.clientX;
        startY = touch.clientY;
        const rect = win.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        this.focus(win.getAttribute('data-app'));
      }, { passive: true });

      titlebar.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        let newTop = Math.max(28, Math.min(initialTop + dy, window.innerHeight - 50));
        let newLeft = initialLeft + dx;
        win.style.left = `${newLeft}px`;
        win.style.top = `${newTop}px`;
      }, { passive: true });

      titlebar.addEventListener('touchend', () => {
        isDragging = false;
      });
    },

    // Setup window corner resize physics
    setupResizable(win, resizer) {
      let isResizing = false;
      let startX = 0;
      let startY = 0;
      let startWidth = 0;
      let startHeight = 0;

      const onMouseDown = (e) => {
        e.stopPropagation();
        if (win.classList.contains('is-maximized')) return;

        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;

        const rect = win.getBoundingClientRect();
        startWidth = rect.width;
        startHeight = rect.height;

        this.focus(win.getAttribute('data-app'));

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        e.preventDefault();
      };

      const onMouseMove = (e) => {
        if (!isResizing) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        const minWidth = 360;
        const minHeight = 240;
        const maxWidth = window.innerWidth - 20;
        const maxHeight = window.innerHeight - 40;

        const newWidth = Math.max(minWidth, Math.min(startWidth + dx, maxWidth));
        const newHeight = Math.max(minHeight, Math.min(startHeight + dy, maxHeight));

        win.style.width = `${newWidth}px`;
        win.style.height = `${newHeight}px`;
      };

      const onMouseUp = () => {
        isResizing = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      resizer.addEventListener('mousedown', onMouseDown);
    }
  };


  /* ==========================================================================
     RESUME MANAGER (FINDER-STYLE MULTI-RESUME VIEWER)
     Multi-document PDF previewer, role-tailored sidebar switcher,
     0.25s smooth cross-fade, keyboard navigation, and missing file skipping.
     ========================================================================== */
  const ResumeManager = {
    availableResumes: [...RESUMES_CONFIG],
    activeIndex: 0,
    isTransitioning: false,

    async init() {
      // 1. Missing file check: if a PDF file is missing, skip that entry
      await this.validateAvailableFiles();

      // 2. Render sidebar entries
      this.renderSidebar();

      // 3. Select default resume (Python Full Stack or recommended: true)
      const defaultIdx = this.availableResumes.findIndex((r) => r.recommended) !== -1
        ? this.availableResumes.findIndex((r) => r.recommended)
        : 0;
      this.selectIndex(defaultIdx, true);

      // 4. Bind toolbar actions: Print
      this.bindToolbarActions();

      // 5. Up / Down arrow keys navigation
      this.bindKeyboardNavigation();

      // 6. Global resume triggers across the portfolio
      this.bindGlobalTriggers();
    },

    // Verify if PDF files exist (skips entries that return 404)
    async validateAvailableFiles() {
      if (window.location.protocol.startsWith('http')) {
        const validated = [];
        for (const item of RESUMES_CONFIG) {
          try {
            const res = await fetch(item.file, { method: 'HEAD' });
            if (res.ok || (res.status >= 200 && res.status < 400)) {
              validated.push(item);
            } else {
              console.warn(`[ResumeManager] Skipping missing PDF file (${res.status}): ${item.file}`);
            }
          } catch (err) {
            // Keep on network or CORS errors to prevent breaking offline environments
            validated.push(item);
          }
        }
        if (validated.length > 0) {
          this.availableResumes = validated;
        }
      } else {
        this.availableResumes = [...RESUMES_CONFIG];
      }
    },

    // Render Finder-style frosted sidebar
    renderSidebar() {
      const container = document.getElementById('resume-list-container');
      if (!container) return;

      container.innerHTML = '';
      this.availableResumes.forEach((resume, idx) => {
        const item = document.createElement('div');
        item.className = `resume-sidebar-item${idx === this.activeIndex ? ' active' : ''}`;
        item.setAttribute('data-resume-id', resume.id);
        item.setAttribute('data-index', idx);
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'tab');
        item.setAttribute('aria-selected', idx === this.activeIndex ? 'true' : 'false');

        const recommendedBadge = resume.recommended
          ? `<span class="resume-item-badge">Recommended</span>`
          : '';

        item.innerHTML = `
          <div class="resume-item-top">
            <span class="resume-item-title">${resume.title}</span>
            ${recommendedBadge}
          </div>
          <div class="resume-item-bestfor">Best for: <strong>${resume.bestFor}</strong></div>
          <div class="resume-item-note">${resume.note}</div>
        `;

        item.addEventListener('click', () => {
          SoundFX.playClick();
          this.selectIndex(idx);
        });

        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            SoundFX.playClick();
            this.selectIndex(idx);
          }
        });

        container.appendChild(item);
      });
    },

    // Select resume with 0.25s smooth fade
    selectIndex(index, immediate = false) {
      if (index < 0 || index >= this.availableResumes.length) return;
      if (index === this.activeIndex && !immediate) return;

      this.activeIndex = index;
      const resume = this.availableResumes[index];
      if (!resume) return;

      // Update sidebar active states
      const items = document.querySelectorAll('.resume-sidebar-item');
      items.forEach((item, idx) => {
        const isActive = idx === index;
        item.classList.toggle('active', isActive);
        item.setAttribute('aria-selected', isActive ? 'true' : 'false');
        if (isActive) {
          item.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
        }
      });

      // Update Window Titlebar
      const windowTitle = document.getElementById('resume-window-title');
      if (windowTitle) {
        windowTitle.textContent = `Resume — ${resume.title} (Prajwal Dongare).pdf`;
      }

      // Update Toolbar Info
      const filenameEl = document.getElementById('resume-current-filename');
      if (filenameEl) {
        const cleanName = resume.downloadName || resume.file.split('/').pop();
        filenameEl.textContent = cleanName;
      }

      // Update Toolbar Action Links (clean download attribute)
      const downloadBtn = document.getElementById('resume-download-btn');
      if (downloadBtn) {
        downloadBtn.href = resume.file;
        downloadBtn.setAttribute('download', resume.downloadName || `${resume.title.replace(/\s+/g, '-')}-Resume.pdf`);
      }

      const openTabBtn = document.getElementById('resume-open-tab-btn');
      if (openTabBtn) {
        openTabBtn.href = resume.file;
      }

      // Update Fallback card links
      const fallbackOpen = document.getElementById('resume-fallback-open');
      const fallbackDownload = document.getElementById('resume-fallback-download');
      if (fallbackOpen) fallbackOpen.href = resume.file;
      if (fallbackDownload) {
        fallbackDownload.href = resume.file;
        fallbackDownload.setAttribute('download', resume.downloadName || `${resume.title.replace(/\s+/g, '-')}-Resume.pdf`);
      }

      // Update Mobile Card
      this.updateMobileCard(resume);

      // Embedded PDF Preview with smooth fade (0.25s)
      const previewContainer = document.getElementById('resume-preview-container');
      const mobileCard = document.getElementById('resume-mobile-card');
      const resumeFrame = document.getElementById('resume-frame');
      const fallbackCard = document.getElementById('resume-fallback-card');

      if (fallbackCard) fallbackCard.style.display = 'none';

      if (previewContainer && resumeFrame) {
        if (immediate) {
          resumeFrame.src = resume.file;
          previewContainer.style.opacity = '1';
          if (mobileCard) mobileCard.style.opacity = '1';
        } else {
          this.isTransitioning = true;
          previewContainer.style.opacity = '0';
          if (mobileCard) mobileCard.style.opacity = '0';
          setTimeout(() => {
            resumeFrame.src = resume.file;
            setTimeout(() => {
              previewContainer.style.opacity = '1';
              if (mobileCard) mobileCard.style.opacity = '1';
              this.isTransitioning = false;
            }, 30);
          }, 125); // half of 0.25s
        }

        resumeFrame.onerror = () => {
          if (fallbackCard) fallbackCard.style.display = 'flex';
        };
      }
    },

    // Update Mobile Card (under 768px)
    updateMobileCard(resume) {
      const card = document.getElementById('resume-mobile-card');
      if (!card) return;

      const titleEl = document.getElementById('resume-mobile-title');
      const bestForEl = document.getElementById('resume-mobile-bestfor');
      const noteEl = document.getElementById('resume-mobile-note');
      const badgeEl = document.getElementById('resume-mobile-badge');
      const openBtn = document.getElementById('resume-mobile-open-btn');
      const downloadBtn = document.getElementById('resume-mobile-download-btn');

      if (titleEl) titleEl.textContent = resume.title;
      if (bestForEl) bestForEl.innerHTML = `Best for: <strong>${resume.bestFor}</strong>`;
      if (noteEl) noteEl.textContent = resume.note;

      if (badgeEl) {
        if (resume.recommended) {
          badgeEl.textContent = 'Recommended';
          badgeEl.style.display = 'inline-block';
        } else {
          badgeEl.style.display = 'none';
        }
      }

      if (openBtn) {
        openBtn.href = resume.file;
      }

      if (downloadBtn) {
        downloadBtn.href = resume.file;
        downloadBtn.setAttribute('download', resume.downloadName || `${resume.title.replace(/\s+/g, '-')}-Resume.pdf`);
      }
    },

    // Up / Down arrow selection
    selectNext() {
      if (this.availableResumes.length === 0) return;
      SoundFX.playClick();
      const next = (this.activeIndex + 1) % this.availableResumes.length;
      this.selectIndex(next);
    },

    selectPrev() {
      if (this.availableResumes.length === 0) return;
      SoundFX.playClick();
      const prev = (this.activeIndex - 1 + this.availableResumes.length) % this.availableResumes.length;
      this.selectIndex(prev);
    },

    selectResumeById(id) {
      const foundIdx = this.availableResumes.findIndex((r) => r.id === id);
      if (foundIdx !== -1) {
        this.selectIndex(foundIdx);
      }
    },

    // Toolbar Print Action
    bindToolbarActions() {
      const printBtn = document.getElementById('resume-print-btn');
      printBtn?.addEventListener('click', () => {
        SoundFX.playClick();
        const resumeFrame = document.getElementById('resume-frame');
        try {
          if (resumeFrame && resumeFrame.contentWindow) {
            resumeFrame.contentWindow.focus();
            resumeFrame.contentWindow.print();
            return;
          }
        } catch (e) {
          console.warn('[ResumeManager] Frame print blocked by policy:', e);
        }

        // Fallback: open print in new tab
        const current = this.availableResumes[this.activeIndex];
        if (current) {
          const win = window.open(current.file, '_blank');
          if (win) win.focus();
        }
      });
    },

    // Up / Down arrow keys change selection
    bindKeyboardNavigation() {
      window.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;

        const resumeWin = document.getElementById('window-resume');
        if (!resumeWin || !resumeWin.classList.contains('is-open')) return;

        // Check if Resume window is active or contains focus
        const isActive = (WindowManager.activeWindow === resumeWin) || resumeWin.contains(document.activeElement);
        if (!isActive) return;

        e.preventDefault();
        if (e.key === 'ArrowDown') {
          this.selectNext();
        } else if (e.key === 'ArrowUp') {
          this.selectPrev();
        }
      });
    },

    // Everywhere else on the site where a "Download Resume" or "Resume" button exists
    bindGlobalTriggers() {
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-open-app="resume"], [data-action="open-resume"], .resume-cta-trigger, .open-resume-trigger');
        if (trigger) {
          e.preventDefault();
          SoundFX.playClick();
          const targetResumeId = trigger.getAttribute('data-resume-id');

          // Open Resume window
          WindowManager.open('resume');

          // If a specific resume target was specified, activate it
          if (targetResumeId) {
            this.selectResumeById(targetResumeId);
          }
        }
      });
    }
  };


  /* ==========================================================================
     9B. FINDER EXPERIENCE TIMELINE CONTROLLER
     Dynamically renders experience cards from EXPERIENCES_CONFIG array
     sorted newest-first, and binds project window opening & live demo actions.
     ========================================================================== */
  const ExperienceManager = {
    container: null,

    init() {
      this.container = document.getElementById('experience-timeline-container');
      this.render();
      this.bindEvents();
    },

    // Parse date strings like "Jun 2025 - Sep 2025", "2025", "Present", etc.
    parseDate(datesStr) {
      if (!datesStr) return 0;
      if (/present/i.test(datesStr)) return Date.now() + 1000000000;
      const parts = datesStr.split(/[-–—to]/i);
      const endStr = (parts[parts.length - 1] || '').trim();
      const parsed = Date.parse(endStr);
      if (!isNaN(parsed)) return parsed;
      const match = endStr.match(/([a-zA-Z]+)?\s*(\d{4})/);
      if (match) {
        const monthStr = match[1];
        const year = parseInt(match[2], 10);
        let month = 11;
        if (monthStr) {
          const mDate = Date.parse(`${monthStr} 1, 2000`);
          if (!isNaN(mDate)) month = new Date(mDate).getMonth();
        }
        return new Date(year, month, 1).getTime();
      }
      return 0;
    },

    render() {
      if (!this.container) return;

      // Show newest first
      const sorted = [...EXPERIENCES_CONFIG].sort((a, b) => {
        return this.parseDate(b.dates) - this.parseDate(a.dates);
      });

      this.container.innerHTML = sorted.map((exp, index) => {
        const bulletsHtml = (exp.bullets || [])
          .map((b) => `<li>${b}</li>`)
          .join('');

        const techChipsHtml = (exp.tech || [])
          .map((t) => `<span class="tech-chip">${t}</span>`)
          .join('');

        let actionsHtml = '';
        const hasProject = Boolean(exp.projectTarget);
        const hasDemo = Boolean(exp.liveDemoUrl);

        if (hasProject || hasDemo) {
          actionsHtml = `
            <div class="experience-actions">
              ${hasProject ? `
                <button type="button" class="btn-experience-action btn-experience-project" data-target-project="${exp.projectTarget}" aria-label="See Home Cleaning Assistant in Projects window">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  <span>See the project</span>
                </button>
              ` : ''}
              ${hasDemo ? `
                <a href="${exp.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn-experience-action btn-experience-demo" aria-label="Open Live Demo in new tab">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <span>Live Demo</span>
                </a>
              ` : ''}
            </div>
          `;
        }

        return `
          <div class="experience-timeline-item" style="--card-index: ${index};">
            <div class="experience-timeline-dot" aria-hidden="true"></div>
            <article class="experience-card" tabindex="0">
              <header class="experience-card-header">
                <div class="experience-header-main">
                  <div class="experience-role-row">
                    <h3 class="experience-role">${exp.role}</h3>
                    ${exp.type ? `<span class="experience-badge experience-badge-${exp.type.toLowerCase()}">${exp.type}</span>` : ''}
                  </div>
                  <div class="experience-company-row">
                    <span class="experience-company">${exp.company}</span>
                  </div>
                </div>
                <div class="experience-header-meta">
                  <div class="experience-dates">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>${exp.dates}</span>
                  </div>
                  <div class="experience-location">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>${exp.location}</span>
                  </div>
                </div>
              </header>

              <ul class="experience-bullets">
                ${bulletsHtml}
              </ul>

              <div class="experience-tech-section">
                <div class="experience-tech-chips">
                  ${techChipsHtml}
                </div>
              </div>

              ${actionsHtml}
            </article>
          </div>
        `;
      }).join('');
    },

    bindEvents() {
      if (!this.container) return;

      this.container.addEventListener('click', (e) => {
        const projectBtn = e.target.closest('.btn-experience-project');
        if (projectBtn) {
          e.preventDefault();
          SoundFX.playClick();
          const targetProject = projectBtn.getAttribute('data-target-project');
          WindowManager.open('projects');
          if (targetProject) {
            setTimeout(() => {
              const card = document.querySelector(`.project-card[data-project="${targetProject}"]`);
              if (card) {
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                card.focus();
                card.classList.add('project-card-highlight');
                setTimeout(() => card.classList.remove('project-card-highlight'), 2000);
              }
            }, 180);
          }
        }
      });
    }
  };


  /* ==========================================================================
     10. STAGE 4: APPS INTERACTIVITY CONTROLLER
     Manages Finder sidebar tabs, Mail contact form, Notes autosave,
     Terminal interactive command interpreter, and Trash.
     ========================================================================== */
  const AppsManager = {
    init() {
      this.initFinder();
      this.initResume();
      this.initMail();
      this.initNotes();
      this.initTerminal();
      this.initTrash();
    },

    // 0. Resume: Multi-Resume Finder View
    initResume() {
      ResumeManager.init();
    },

    // 1. Finder: Sidebar Tab Switcher & Experience Timeline
    initFinder() {
      const sidebarItems = document.querySelectorAll('.finder-sidebar-item[data-finder-tab]');
      const tabPanes = document.querySelectorAll('.finder-tab-pane');

      const switchTab = (item) => {
        SoundFX.playClick();
        const targetTab = item.getAttribute('data-finder-tab');

        // Update active sidebar item and aria-selected states
        sidebarItems.forEach((si) => {
          si.classList.remove('active');
          si.setAttribute('aria-selected', 'false');
        });
        item.classList.add('active');
        item.setAttribute('aria-selected', 'true');

        // Switch active content pane
        tabPanes.forEach((pane) => {
          if (pane.id === `finder-pane-${targetTab}`) {
            pane.classList.add('active');

            // Trigger / restart card slide-up animation if opening Experience tab
            if (targetTab === 'experience') {
              const cards = pane.querySelectorAll('.experience-card');
              cards.forEach((card) => {
                card.style.animation = 'none';
                void card.offsetWidth; // Force reflow
                card.style.animation = '';
              });
            }
          } else {
            pane.classList.remove('active');
          }
        });
      };

      sidebarItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'tab');
        item.setAttribute('aria-selected', item.classList.contains('active') ? 'true' : 'false');

        item.addEventListener('click', () => switchTab(item));

        // Keyboard navigation: Enter / Space to activate, ArrowUp / ArrowDown to navigate tabs
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            switchTab(item);
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (index + 1) % sidebarItems.length;
            sidebarItems[nextIndex].focus();
            switchTab(sidebarItems[nextIndex]);
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (index - 1 + sidebarItems.length) % sidebarItems.length;
            sidebarItems[prevIndex].focus();
            switchTab(sidebarItems[prevIndex]);
          }
        });
      });

      // Screenshot action triggers
      document.getElementById('btn-view-cleaning-shots')?.addEventListener('click', () => {
        SoundFX.playClick();
        ProjectCarouselManager.openLightbox('home-cleaning', 0);
      });

      document.getElementById('btn-safari-cleaning-shots')?.addEventListener('click', () => {
        SoundFX.playClick();
        WindowManager.open('projects');
        setTimeout(() => {
          const card = document.querySelector('.project-card[data-project="home-cleaning"]');
          if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.add('project-card-highlight');
            setTimeout(() => card.classList.remove('project-card-highlight'), 2000);
          }
        }, 180);
      });

      // Initialize Experience Timeline
      ExperienceManager.init();
    },

    // 2. Mail: Compose & Mailto Form
    initMail() {
      const mailForm = document.getElementById('mail-compose-form');
      if (!mailForm) return;

      mailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        SoundFX.playClick();

        const sender = document.getElementById('mail-sender-input')?.value.trim() || '';
        const subject = document.getElementById('mail-subject-input')?.value.trim() || 'Portfolio Contact';
        const bodyText = document.getElementById('mail-body-textarea')?.value.trim() || '';

        const fullBody = `Sender: ${sender}\n\nMessage:\n${bodyText}`;
        const mailtoUrl = `mailto:dongareprajwal622@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;

        // Open user's default email client
        window.location.href = mailtoUrl;

        // Feedback on submit button
        const submitBtn = document.getElementById('mail-submit-btn');
        if (submitBtn) {
          const originalText = submitBtn.innerHTML;
          submitBtn.innerHTML = '<span>Message Drafted!</span>';
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
          }, 3000);
        }
      });
    },

    // 3. Notes: Working Notepad with LocalStorage Autosave
    initNotes() {
      const notesTextarea = document.getElementById('notes-content');
      const statusText = document.getElementById('notes-status-text');
      const storageKey = 'prajwal_mac_notes_data';

      if (!notesTextarea) return;

      // Load saved notes if available
      const savedNotes = localStorage.getItem(storageKey);
      if (savedNotes !== null) {
        notesTextarea.value = savedNotes;
      }

      // Autosave on input
      notesTextarea.addEventListener('input', () => {
        localStorage.setItem(storageKey, notesTextarea.value);
        if (statusText) {
          statusText.textContent = 'Auto-saved just now';
          setTimeout(() => {
            statusText.textContent = 'Auto-saved to LocalStorage';
          }, 2000);
        }
      });
    },

    // 4. Terminal: Interactive zsh command line interpreter
    initTerminal() {
      const terminalContent = document.getElementById('terminal-content-area');
      const terminalLogs = document.getElementById('terminal-logs');
      const terminalInput = document.getElementById('terminal-cli-input');
      if (!terminalInput || !terminalLogs) return;

      // Click anywhere in terminal focuses the prompt
      terminalContent?.addEventListener('click', () => {
        terminalInput.focus();
      });

      // Command history tracking
      const history = [];
      let historyIndex = -1;

      // Available Terminal Commands
      const commands = {
        help: () => `
Available shell commands:
  <span style="color:#38bdf8; font-weight:600;">about</span>       - View professional summary &amp; background
  <span style="color:#38bdf8; font-weight:600;">projects</span>    - Display featured portfolio projects &amp; live demos
  <span style="color:#38bdf8; font-weight:600;">experience</span>  - View internship &amp; hands-on engineering history
  <span style="color:#38bdf8; font-weight:600;">skills</span>      - List technical skill stack by category
  <span style="color:#38bdf8; font-weight:600;">education</span>   - Show degrees and verified academic CGPA
  <span style="color:#38bdf8; font-weight:600;">resume</span>      - List available resumes &amp; direct download links
  <span style="color:#38bdf8; font-weight:600;">contact</span>     - Print email, LinkedIn, GitHub &amp; phone
  <span style="color:#38bdf8; font-weight:600;">open &lt;app&gt;</span>   - Launch a macOS app (finder, safari, projects, etc.)
  <span style="color:#38bdf8; font-weight:600;">theme</span>       - Toggle between Light and Dark mode
  <span style="color:#38bdf8; font-weight:600;">wallpaper &lt;name&gt;</span> - Set desktop wallpaper (photo, sonoma, sequoia, aurora)
  <span style="color:#38bdf8; font-weight:600;">whoami</span>      - Display current user identity
  <span style="color:#38bdf8; font-weight:600;">date</span>        - Print current system date &amp; time
  <span style="color:#38bdf8; font-weight:600;">ls</span>          - List simulated workspace files
  <span style="color:#38bdf8; font-weight:600;">clear</span>       - Clear terminal screen buffer
  <span style="color:#38bdf8; font-weight:600;">help</span>        - Show this commands reference
`,
        about: () => `
<strong style="color:#ffffff;">Prajwal Shashikant Dongare</strong>
<span style="color:#0a84ff;">MCA Graduate &amp; Full-Stack Developer</span>

"I'm Prajwal, an MCA student from Kolhapur who loves turning ideas into working web products. I build full-stack apps with React, Python, Flask, Java and Spring Boot, and I enjoy working with data, APIs and AI/ML. I like solving complex problems and building the logic that makes a project work."
`,
        projects: () => `
<strong style="color:#ffffff;">1. VisionFlux (Text to Video Generator)</strong>
   Stack: Python, Flask, Magic Hour API, HTML5/CSS3/JavaScript, Aiven MySQL
   Live Demo: <a href="https://visionflux-aohc.onrender.com/" target="_blank" style="color:#0a84ff;">https://visionflux-aohc.onrender.com/</a>
   GitHub:    <a href="https://github.com/dongareprajwal622" target="_blank" style="color:#0a84ff;">https://github.com/dongareprajwal622</a>

<strong style="color:#ffffff;">2. Home Cleaning Assistant</strong>
   Stack: Java, JSP, Servlets, MySQL, HTML5/CSS3/JavaScript, IntelliJ IDEA
   Live Demo: <a href="https://home-cleaning-assistant-1.onrender.com/home.jsp" target="_blank" style="color:#0a84ff;">https://home-cleaning-assistant-1.onrender.com/home.jsp</a>
   GitHub:    <a href="https://github.com/dongareprajwal622" target="_blank" style="color:#0a84ff;">https://github.com/dongareprajwal622</a>
`,
        experience: () => `
<strong style="color:#ffffff;">Java Full Stack Developer Intern</strong> &bull; <span style="color:#38bdf8;">Code Crafter Service</span>
Location: Kolhapur, Maharashtra | Dates: Jun 2025 – Sep 2025
&bull; Developed responsive, cross-browser web interfaces with HTML, CSS, JavaScript for Home Cleaning Assistant.
&bull; Designed interactive UI components and integrated with backend services for service booking, scheduling &amp; CRUD operations.
&bull; Tech Stack: Java, JSP, HTML, CSS, JavaScript, MySQL
`,
        skills: () => `
<strong style="color:#ffffff;">Frontend:</strong> HTML5, CSS3, JavaScript (ES6+), React, Angular
<strong style="color:#ffffff;">Backend:</strong>  Python, Flask, Java, Spring Boot, REST APIs, CRUD Operations
<strong style="color:#ffffff;">Database:</strong> MySQL, Oracle, SQL
<strong style="color:#ffffff;">Data &amp; AI:</strong> Generative AI, Prompt Engineering, Power BI, DAX, ETL, AI/ML
<strong style="color:#ffffff;">Tools:</strong>    Git, GitHub, VS Code, IntelliJ IDEA, Postman
`,
        education: () => `
<strong style="color:#ffffff;">MCA (Master of Computer Applications)</strong>
&bull; D.Y. Patil University / School of Eng. &amp; Mgmt, Kolhapur | 2024 – 2026 | <span style="color:#4ade80; font-weight:600;">CGPA: 8.20</span>

<strong style="color:#ffffff;">BCS (Bachelor of Computer Science)</strong>
&bull; Vivekanand College, Kolhapur | 2021 – 2024 | <span style="color:#4ade80; font-weight:600;">CGPA: 6.90</span>
`,
        resume: () => `
<strong style="color:#ffffff;">Available Curated Resumes:</strong>
1. <strong>Python Full Stack</strong>: <a href="assets/resumes/Prajwal-Dongare-Python-Full-Stack.pdf" target="_blank" style="color:#0a84ff;">Prajwal-Dongare-Python-Full-Stack.pdf</a> (Recommended)
2. <strong>AI Engineer</strong>:       <a href="assets/resumes/Prajwal-Dongare-AI-Engineer.pdf" target="_blank" style="color:#0a84ff;">Prajwal-Dongare-AI-Engineer.pdf</a>
3. <strong>Data Analyst</strong>:      <a href="assets/resumes/Prajwal-Dongare-Data-Analyst.pdf" target="_blank" style="color:#0a84ff;">Prajwal-Dongare-Data-Analyst.pdf</a>

<span style="color:var(--text-muted);">Tip: Type 'open resume' to view with live PDF previewer.</span>
`,
        contact: () => `
<strong style="color:#ffffff;">Email:</strong>    <a href="mailto:dongareprajwal622@gmail.com" style="color:#0a84ff;">dongareprajwal622@gmail.com</a>
<strong style="color:#ffffff;">Phone:</strong>    <a href="tel:+919699432733" style="color:#0a84ff;">+91 9699432733</a>
<strong style="color:#ffffff;">LinkedIn:</strong> <a href="https://www.linkedin.com/in/prajwal-dongare-533099334/" target="_blank" style="color:#0a84ff;">https://www.linkedin.com/in/prajwal-dongare-533099334/</a>
<strong style="color:#ffffff;">GitHub:</strong>   <a href="https://github.com/dongareprajwal622" target="_blank" style="color:#0a84ff;">https://github.com/dongareprajwal622</a>
`,
        whoami: () => `<strong style="color:#4ade80;">prajwal</strong> (Prajwal Shashikant Dongare &bull; MCA Graduate &amp; Full-Stack Developer)`,
        date: () => new Date().toString(),
        theme: () => {
          ThemeManager.toggleTheme();
          return `<span style="color:#4ade80;">Theme switched to ${ThemeManager.currentTheme} mode.</span>`;
        },
        ls: () => `
<span style="color:#38bdf8;">About_Me.app</span>   <span style="color:#38bdf8;">Safari_Story.app</span>   <span style="color:#38bdf8;">Projects.app</span>
<span style="color:#38bdf8;">Skills.app</span>     <span style="color:#38bdf8;">Resume_Viewer.app</span>  <span style="color:#38bdf8;">Mail.app</span>
<span style="color:#38bdf8;">Notes.app</span>      <span style="color:#38bdf8;">Trash.app</span>          <span style="color:#e2e8f0;">Resume.pdf</span>
<span style="color:#a78bfa;">VisionFlux/</span>    <span style="color:#a78bfa;">HomeCleaning/</span>      <span style="color:#e2e8f0;">Notes.txt</span>
`,
        clear: () => {
          terminalLogs.innerHTML = '';
          return null;
        }
      };

      terminalInput.addEventListener('keydown', (e) => {
        // Enter: Execute command
        if (e.key === 'Enter') {
          const rawCommand = terminalInput.value.trim();
          const cleanCommand = rawCommand.toLowerCase();

          // Echo user command
          const echoLine = document.createElement('div');
          echoLine.className = 'terminal-line cmd-echo';
          echoLine.innerHTML = `<span class="terminal-prompt">prajwal@macbook:~$</span> ${escapeHTML(rawCommand)}`;
          terminalLogs.appendChild(echoLine);

          if (rawCommand.length > 0) {
            history.push(rawCommand);
            historyIndex = history.length;
          }

          if (cleanCommand.length > 0) {
            if (cleanCommand.startsWith('open ')) {
              const app = cleanCommand.replace(/^open\s+(-a\s+)?/, '').trim();
              const validApps = ['finder', 'safari', 'projects', 'skills', 'resume', 'mail', 'notes', 'terminal', 'trash'];
              const matched = validApps.find(a => a === app || app.includes(a));
              if (matched) {
                WindowManager.open(matched);
                const resultLine = document.createElement('div');
                resultLine.className = 'terminal-line success';
                resultLine.textContent = `Launched ${matched}.app successfully.`;
                terminalLogs.appendChild(resultLine);
              } else {
                const errLine = document.createElement('div');
                errLine.className = 'terminal-line error';
                errLine.textContent = `open: application not found: '${app}'. Valid apps: ${validApps.join(', ')}`;
                terminalLogs.appendChild(errLine);
              }
            } else if (cleanCommand.startsWith('cat ')) {
              const file = cleanCommand.replace(/^cat\s+/, '').trim();
              const resultLine = document.createElement('div');
              resultLine.className = 'terminal-line';
              if (file.includes('note')) {
                const savedNotes = localStorage.getItem('prajwal_mac_notes_data') || 'No notes currently stored.';
                resultLine.textContent = savedNotes;
              } else {
                resultLine.textContent = `cat: ${file}: simulated file view. Try 'open ${file}' or 'help'.`;
              }
            } else if (cleanCommand.startsWith('wallpaper')) {
              const arg = cleanCommand.replace(/^wallpaper\s*/, '').trim();
              const validWps = ['photo', 'sonoma', 'sequoia', 'aurora'];
              const resultLine = document.createElement('div');
              resultLine.className = 'terminal-line';
              if (validWps.includes(arg)) {
                ThemeManager.setWallpaper(arg);
                resultLine.innerHTML = `<span style="color:#4ade80;">Wallpaper changed to ${arg}.</span>`;
              } else {
                resultLine.innerHTML = `<span style="color:#f59e0b;">Usage: wallpaper [photo | sonoma | sequoia | aurora] (Current: ${localStorage.getItem('prajwal_portfolio_wallpaper') || 'photo'})</span>`;
              }
              terminalLogs.appendChild(resultLine);
            } else if (commands[cleanCommand]) {
              const output = commands[cleanCommand]();
              if (output !== null) {
                const resultLine = document.createElement('div');
                resultLine.className = 'terminal-line';
                resultLine.innerHTML = output.trim();
                terminalLogs.appendChild(resultLine);
              }
            } else {
              const errorLine = document.createElement('div');
              errorLine.className = 'terminal-line error';
              errorLine.textContent = `zsh: command not found: ${rawCommand}. Type 'help' for available commands.`;
              terminalLogs.appendChild(errorLine);
            }
          }

          terminalInput.value = '';
          terminalLogs.scrollTop = terminalLogs.scrollHeight;
          SoundFX.playClick();
        }

        // Arrow Up: Previous command history
        else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (historyIndex > 0) {
            historyIndex -= 1;
            terminalInput.value = history[historyIndex] || '';
          }
        }

        // Arrow Down: Next command history
        else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (historyIndex < history.length - 1) {
            historyIndex += 1;
            terminalInput.value = history[historyIndex] || '';
          } else {
            historyIndex = history.length;
            terminalInput.value = '';
          }
        }
      });
    },

    // 5. Trash: Authentic Empty Trash Animation & Persistence
    initTrash() {
      const emptyTrashBtn = document.getElementById('empty-trash-btn');
      const restoreTrashBtn = document.getElementById('restore-trash-btn');
      const trashToolbar = document.getElementById('trash-toolbar');
      const trashItemsList = document.getElementById('trash-items-list');
      const trashEmptyState = document.getElementById('trash-empty-state');
      const storageKey = 'prajwal_mac_trash_cleared';

      const updateTrashUI = (isCleared) => {
        if (isCleared) {
          if (trashToolbar) trashToolbar.style.display = 'none';
          if (trashItemsList) trashItemsList.style.display = 'none';
          if (trashEmptyState) trashEmptyState.classList.add('active');
        } else {
          if (trashToolbar) trashToolbar.style.display = 'flex';
          if (trashItemsList) {
            trashItemsList.style.display = 'flex';
            const rows = trashItemsList.querySelectorAll('.trash-item-row');
            rows.forEach(r => r.classList.remove('clearing'));
          }
          if (trashEmptyState) trashEmptyState.classList.remove('active');
        }
      };

      const isClearedInitially = localStorage.getItem(storageKey) === 'true';
      updateTrashUI(isClearedInitially);

      emptyTrashBtn?.addEventListener('click', () => {
        SoundFX.playTrash();
        const rows = trashItemsList?.querySelectorAll('.trash-item-row') || [];
        rows.forEach((r, i) => {
          setTimeout(() => r.classList.add('clearing'), i * 60);
        });

        setTimeout(() => {
          localStorage.setItem(storageKey, 'true');
          updateTrashUI(true);
        }, 320);
      });

      restoreTrashBtn?.addEventListener('click', () => {
        SoundFX.playClick();
        localStorage.removeItem(storageKey);
        updateTrashUI(false);
      });
    }
  };

  // Helper function to escape HTML in terminal echo
  function escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }


  /* ==========================================================================
     10B. FEATURED PROJECTS CAROUSEL & LIGHTBOX CONTROLLER
     Manages screenshot carousels, touch gestures, keyboard arrows,
     dynamic slide transitions (transform + opacity only), missing file skipping,
     and full-screen lightbox.
     ========================================================================== */
  const ProjectCarouselManager = {
    instances: {},
    activeLightboxProjectId: null,
    activeLightboxSlideIndex: 0,

    lightboxEl: null,
    lightboxImg: null,
    lightboxCaption: null,
    lightboxCounter: null,

    init() {
      // 1. Initialize Carousels from PROJECT_CAROUSELS_CONFIG
      PROJECT_CAROUSELS_CONFIG.forEach(config => {
        this.initCarousel(config);
      });

      // 2. Initialize Lightbox Modal
      this.initLightbox();
    },

    initCarousel(config) {
      const carouselEl = document.getElementById('carousel-' + config.id);
      if (!carouselEl) return;

      const track = carouselEl.querySelector('.carousel-track');
      const viewport = carouselEl.querySelector('.carousel-viewport');
      const prevBtn = carouselEl.querySelector('.carousel-arrow-prev');
      const nextBtn = carouselEl.querySelector('.carousel-arrow-next');
      const dotsContainer = carouselEl.querySelector('.carousel-dots');
      const captionText = carouselEl.querySelector('.carousel-caption-text');
      const counterText = carouselEl.querySelector('.carousel-counter-text');
      const card = carouselEl.closest('.project-card');

      // Dynamically sync slides & dots if count in HTML differs from config
      let slideEls = Array.from(carouselEl.querySelectorAll('.carousel-slide'));
      if (slideEls.length !== config.slides.length && track && dotsContainer) {
        track.innerHTML = '';
        dotsContainer.innerHTML = '';
        config.slides.forEach((slide, idx) => {
          const slideDiv = document.createElement('div');
          slideDiv.className = `carousel-slide ${idx === 0 ? 'active' : ''}`;
          slideDiv.dataset.slideIndex = idx;
          slideDiv.dataset.file = slide.file;
          slideDiv.dataset.caption = slide.caption;

          const img = document.createElement('img');
          img.src = config.basePath + slide.file;
          img.alt = slide.alt || `${config.title} - ${slide.caption}`;
          img.className = 'carousel-img';
          if (idx > 0) img.loading = 'lazy';

          slideDiv.appendChild(img);
          track.appendChild(slideDiv);

          const dotBtn = document.createElement('button');
          dotBtn.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
          dotBtn.type = 'button';
          dotBtn.setAttribute('role', 'tab');
          dotBtn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
          dotBtn.setAttribute('aria-label', `Screenshot ${idx + 1}: ${slide.caption}`);
          dotBtn.dataset.dotIndex = idx;
          dotsContainer.appendChild(dotBtn);
        });
        slideEls = Array.from(carouselEl.querySelectorAll('.carousel-slide'));
      }

      // Associate dataset file if missing
      slideEls.forEach((el, idx) => {
        if (!el.dataset.file && config.slides[idx]) {
          el.dataset.file = config.slides[idx].file;
        }
      });

      const dots = Array.from(carouselEl.querySelectorAll('.carousel-dot'));

      const instance = {
        config,
        currentIndex: 0,
        validSlides: [...config.slides],
        total: config.slides.length,
        isTransitioning: false,
        element: carouselEl,
        track,
        viewport,
        slideEls,
        dots,
        dotsContainer,
        captionText,
        counterText,
        card
      };

      this.instances[config.id] = instance;

      // Handle image errors to cleanly skip missing files instead of showing broken images
      slideEls.forEach((slideEl, idx) => {
        const img = slideEl.querySelector('img');
        const slideData = config.slides[idx];
        if (img && slideData) {
          img.addEventListener('error', () => {
            this.skipMissingSlide(config.id, slideData.file);
          });
          // Check if already completed and errored
          if (img.complete && img.naturalWidth === 0 && img.src) {
            this.skipMissingSlide(config.id, slideData.file);
          }
        }
      });

      // Proactively probe all configured slide images in background to skip missing files
      config.slides.forEach(slide => {
        const probe = new Image();
        probe.onerror = () => {
          this.skipMissingSlide(config.id, slide.file);
        };
        probe.src = config.basePath + slide.file;
      });

      // Click on Prev / Next
      prevBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prev(config.id);
      });

      nextBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.next(config.id);
      });

      // Click on Dots
      this.bindDotsEvents(instance);

      // Touch Swipe (Left / Right)
      let touchStartX = 0;
      let touchStartY = 0;
      viewport?.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });

      viewport?.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            this.next(config.id);
          } else {
            this.prev(config.id);
          }
        }
      }, { passive: true });

      // Keyboard navigation when card is focused
      if (card) {
        card.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.prev(config.id);
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            this.next(config.id);
          }
        });
      }

      // Click on image opens Lightbox
      viewport?.addEventListener('click', (e) => {
        if (e.target.closest('.carousel-arrow') || e.target.closest('.carousel-dots')) return;
        this.openLightbox(config.id, instance.currentIndex);
      });
    },

    bindDotsEvents(instance) {
      instance.dots.forEach((dot, idx) => {
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          this.goToSlide(instance.config.id, idx);
        });
      });
    },

    rebuildDots(instance) {
      if (!instance.dotsContainer) return;
      instance.dotsContainer.innerHTML = '';
      instance.dots = [];

      instance.validSlides.forEach((slide, idx) => {
        const dotBtn = document.createElement('button');
        const isActive = idx === instance.currentIndex;
        dotBtn.className = `carousel-dot ${isActive ? 'active' : ''}`;
        dotBtn.type = 'button';
        dotBtn.setAttribute('role', 'tab');
        dotBtn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        dotBtn.setAttribute('aria-label', `Screenshot ${idx + 1}: ${slide.caption}`);
        dotBtn.dataset.dotIndex = idx;
        dotBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.goToSlide(instance.config.id, idx);
        });
        instance.dotsContainer.appendChild(dotBtn);
        instance.dots.push(dotBtn);
      });
    },

    skipMissingSlide(projectId, fileName) {
      const inst = this.instances[projectId];
      if (!inst) return;

      const slideIndex = inst.validSlides.findIndex(s => s.file === fileName);
      if (slideIndex === -1) return; // Already skipped

      // Remove from validSlides
      inst.validSlides.splice(slideIndex, 1);

      // Find and remove the DOM element
      const domEl = inst.slideEls.find(el => el.dataset.file === fileName || (el.querySelector('img') && el.querySelector('img').src.includes(fileName)));
      if (domEl) {
        const domIdx = inst.slideEls.indexOf(domEl);
        if (domIdx > -1) {
          inst.slideEls.splice(domIdx, 1);
        }
        domEl.remove();
      }

      inst.total = inst.validSlides.length;

      if (inst.total === 0) {
        if (inst.captionText) inst.captionText.textContent = 'No screenshots available';
        if (inst.counterText) inst.counterText.textContent = '0 / 0';
        if (inst.dotsContainer) inst.dotsContainer.innerHTML = '';
        return;
      }

      // Adjust current index if needed
      if (inst.currentIndex >= inst.total) {
        inst.currentIndex = Math.max(0, inst.total - 1);
      }

      // Rebuild dots to match remaining valid slides
      this.rebuildDots(inst);

      // Ensure active slide is displayed
      inst.slideEls.forEach((s, idx) => {
        const isActive = idx === inst.currentIndex;
        s.classList.toggle('active', isActive);
        s.style.transform = isActive ? 'translate3d(0, 0, 0)' : '';
        s.style.opacity = isActive ? '1' : '0';
      });

      // Update caption & counter
      const activeSlide = inst.validSlides[inst.currentIndex];
      if (inst.captionText && activeSlide) {
        inst.captionText.textContent = activeSlide.caption;
      }
      if (inst.counterText) {
        inst.counterText.textContent = `${inst.currentIndex + 1} / ${inst.total}`;
      }

      // If lightbox is open on this project, refresh lightbox
      if (this.activeLightboxProjectId === projectId) {
        if (this.activeLightboxSlideIndex >= inst.validSlides.length) {
          this.activeLightboxSlideIndex = Math.max(0, inst.validSlides.length - 1);
        }
        this.updateLightboxContent();
      }
    },

    goToSlide(projectId, targetIndex, direction) {
      const inst = this.instances[projectId];
      if (!inst || inst.total === 0) return;
      if (inst.isTransitioning) return;

      const prevIndex = inst.currentIndex;
      let nextIndex = targetIndex;

      // Loop from last to first and first to last
      if (nextIndex >= inst.total) nextIndex = 0;
      if (nextIndex < 0) nextIndex = inst.total - 1;
      if (nextIndex === prevIndex) return;

      inst.isTransitioning = true;
      SoundFX.playClick();

      // Determine movement direction
      const isForward = direction !== undefined
        ? direction === 'next'
        : (nextIndex > prevIndex || (prevIndex === inst.total - 1 && nextIndex === 0 && direction !== 'prev'));

      const currentSlide = inst.slideEls[prevIndex];
      const targetSlide = inst.slideEls[nextIndex];
      if (!currentSlide || !targetSlide) {
        inst.isTransitioning = false;
        return;
      }

      // Reset old animation helper classes
      inst.slideEls.forEach(s => {
        s.classList.remove('slide-out-left', 'slide-out-right', 'prev-slide');
      });

      // Prepare target slide offscreen
      targetSlide.style.transition = 'none';
      targetSlide.style.transform = isForward ? 'translate3d(35%, 0, 0)' : 'translate3d(-35%, 0, 0)';
      targetSlide.style.opacity = '0';
      void targetSlide.offsetWidth; // Force reflow

      // Animate-only-transform-and-opacity (0.4s cubic-bezier(0.2, 0.8, 0.2, 1))
      targetSlide.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';
      currentSlide.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)';

      currentSlide.classList.remove('active');
      currentSlide.classList.add(isForward ? 'slide-out-left' : 'slide-out-right');

      targetSlide.classList.add('active');
      targetSlide.style.transform = 'translate3d(0, 0, 0)';
      targetSlide.style.opacity = '1';

      inst.currentIndex = nextIndex;

      // Update Dot Indicators
      inst.dots.forEach((dot, idx) => {
        const isActive = idx === nextIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Update Caption & Counter Text
      const slideData = inst.validSlides[nextIndex];
      if (inst.captionText && slideData) {
        inst.captionText.textContent = slideData.caption;
      }
      if (inst.counterText) {
        inst.counterText.textContent = `${nextIndex + 1} / ${inst.total}`;
      }

      setTimeout(() => {
        inst.isTransitioning = false;
        inst.slideEls.forEach((s, idx) => {
          if (idx !== nextIndex) {
            s.classList.remove('active', 'slide-out-left', 'slide-out-right');
            s.style.transform = '';
            s.style.opacity = '';
            s.style.transition = '';
          }
        });
      }, 420);
    },

    next(projectId) {
      const inst = this.instances[projectId];
      if (!inst) return;
      this.goToSlide(projectId, inst.currentIndex + 1, 'next');
    },

    prev(projectId) {
      const inst = this.instances[projectId];
      if (!inst) return;
      this.goToSlide(projectId, inst.currentIndex - 1, 'prev');
    },

    /* Lightbox Modal System */
    initLightbox() {
      this.lightboxEl = document.getElementById('project-lightbox');
      if (!this.lightboxEl) return;

      this.lightboxImg = document.getElementById('lightbox-img');
      this.lightboxCaption = document.getElementById('lightbox-caption');
      this.lightboxCounter = document.getElementById('lightbox-counter');
      const closeBtn = document.getElementById('lightbox-close');
      const backdrop = document.getElementById('lightbox-backdrop');
      const prevBtn = document.getElementById('lightbox-prev');
      const nextBtn = document.getElementById('lightbox-next');

      closeBtn?.addEventListener('click', () => this.closeLightbox());
      backdrop?.addEventListener('click', () => this.closeLightbox());

      prevBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.lightboxPrev();
      });

      nextBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.lightboxNext();
      });

      // Global keyboard listeners for Lightbox: Esc to close, ArrowLeft / ArrowRight to navigate
      window.addEventListener('keydown', (e) => {
        if (!this.lightboxEl || !this.lightboxEl.classList.contains('active')) return;
        if (e.key === 'Escape') {
          this.closeLightbox();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.lightboxNext();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.lightboxPrev();
        }
      });

      this.lightboxImg?.addEventListener('error', () => {
        const inst = this.instances[this.activeLightboxProjectId];
        if (inst && inst.validSlides[this.activeLightboxSlideIndex]) {
          const brokenFile = inst.validSlides[this.activeLightboxSlideIndex].file;
          this.skipMissingSlide(this.activeLightboxProjectId, brokenFile);
        }
      });
    },

    openLightbox(projectId, slideIndex) {
      const inst = this.instances[projectId];
      if (!inst || !inst.validSlides || inst.validSlides.length === 0) return;

      this.activeLightboxProjectId = projectId;
      this.activeLightboxSlideIndex = (slideIndex >= 0 && slideIndex < inst.validSlides.length) ? slideIndex : 0;
      this.updateLightboxContent();

      if (this.lightboxEl) {
        this.lightboxEl.classList.add('active');
      }
      SoundFX.playClick();
    },

    updateLightboxContent() {
      const inst = this.instances[this.activeLightboxProjectId];
      if (!inst || !inst.validSlides || inst.validSlides.length === 0) {
        this.closeLightbox();
        return;
      }

      if (this.activeLightboxSlideIndex >= inst.validSlides.length) {
        this.activeLightboxSlideIndex = 0;
      }
      if (this.activeLightboxSlideIndex < 0) {
        this.activeLightboxSlideIndex = inst.validSlides.length - 1;
      }

      const slide = inst.validSlides[this.activeLightboxSlideIndex];
      if (!slide || !this.lightboxImg) return;

      this.lightboxImg.src = inst.config.basePath + slide.file;
      this.lightboxImg.alt = slide.alt || `${inst.config.title} - ${slide.caption}`;

      if (this.lightboxCaption) {
        this.lightboxCaption.textContent = `${inst.config.title} — ${slide.caption}`;
      }
      if (this.lightboxCounter) {
        this.lightboxCounter.textContent = `${this.activeLightboxSlideIndex + 1} / ${inst.validSlides.length}`;
      }
    },

    lightboxNext() {
      const inst = this.instances[this.activeLightboxProjectId];
      if (!inst || !inst.validSlides || inst.validSlides.length === 0) return;
      this.activeLightboxSlideIndex = (this.activeLightboxSlideIndex + 1) % inst.validSlides.length;
      this.updateLightboxContent();
      SoundFX.playClick();

      // Sync active carousel in card
      this.goToSlide(inst.config.id, this.activeLightboxSlideIndex, 'next');
    },

    lightboxPrev() {
      const inst = this.instances[this.activeLightboxProjectId];
      if (!inst || !inst.validSlides || inst.validSlides.length === 0) return;
      this.activeLightboxSlideIndex = (this.activeLightboxSlideIndex - 1 + inst.validSlides.length) % inst.validSlides.length;
      this.updateLightboxContent();
      SoundFX.playClick();

      // Sync active carousel in card
      this.goToSlide(inst.config.id, this.activeLightboxSlideIndex, 'prev');
    },

    closeLightbox() {
      if (this.lightboxEl) {
        this.lightboxEl.classList.remove('active');
      }
      SoundFX.playClick();
    }
  };


  /* ==========================================================================
     11. STAGE 5: SAFARI APPLE-STYLE SMOOTH SCROLL STORY (LENIS + GSAP)
     High-performance Apple product showcase with Lenis smooth scrolling,
     ScrollTrigger pinned text reveal, parallax, scale-in cards, horizontal
     skills scroll, animated number counters, and magnetic CTA button.
     ========================================================================== */
  const SafariScrollManager = {
    lenis: null,
    isInitialized: false,

    init() {
      const scrollContainer = document.getElementById('safari-scroll-container');
      const storyContent = document.getElementById('safari-story-content');
      const progressBar = document.getElementById('safari-progress-bar');
      if (!scrollContainer || !storyContent) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // 1. Initialize Lenis Smooth Scroll
      if (typeof window.Lenis !== 'undefined') {
        try {
          this.lenis = new window.Lenis({
            wrapper: scrollContainer,
            content: storyContent,
            duration: prefersReducedMotion ? 0.1 : 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: !prefersReducedMotion,
            touchMultiplier: 1.5
          });

          // Connect Lenis to GSAP ScrollTrigger
          if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined') {
            window.gsap.registerPlugin(window.ScrollTrigger);

            this.lenis.on('scroll', () => {
              window.ScrollTrigger.update();
            });

            window.gsap.ticker.add((time) => {
              this.lenis.raf(time * 1000);
            });

            window.gsap.ticker.lagSmoothing(0);
          } else {
            // Standalone Lenis animation loop
            const raf = (time) => {
              this.lenis.raf(time);
              requestAnimationFrame(raf);
            };
            requestAnimationFrame(raf);
          }
        } catch (err) {
          console.warn('Lenis initialization notice:', err);
        }
      }

      // 2. Scroll Progress Bar
      const updateProgressBar = () => {
        const scrollTop = scrollContainer.scrollTop;
        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        if (maxScroll > 0 && progressBar) {
          const progressPercent = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100));
          progressBar.style.width = `${progressPercent.toFixed(1)}%`;
        }
      };

      scrollContainer.addEventListener('scroll', updateProgressBar, { passive: true });
      if (this.lenis) {
        this.lenis.on('scroll', updateProgressBar);
      }

      // 3. Setup GSAP ScrollTrigger Animations
      if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
        this.setupGSAPAnimations(scrollContainer);
      }

      // 4. Setup Magnetic CTA Button
      this.setupMagneticButton();

      this.isInitialized = true;
    },

    // Refresh ScrollTrigger when Safari window opens or resizes
    refresh() {
      if (typeof window.ScrollTrigger !== 'undefined') {
        setTimeout(() => {
          window.ScrollTrigger.refresh();
        }, 150);
      }
    },

    setupGSAPAnimations(scroller) {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;

      // Set scroller default
      ScrollTrigger.defaults({
        scroller: scroller
      });

      // --- EFFECT 1: HERO HEADLINE SCALE-DOWN & FADE ---
      gsap.to('#safari-hero-title', {
        scale: 0.75,
        opacity: 0.3,
        y: -30,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '#safari-hero',
          start: 'top top',
          end: 'bottom 40%',
          scrub: true
        }
      });

      gsap.to('#safari-hero-subtitle', {
        opacity: 0.2,
        y: -20,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '#safari-hero',
          start: 'top top',
          end: 'bottom 40%',
          scrub: true
        }
      });

      // --- EFFECT 2: STICKY TEXT REVEAL (PINNED BIO) ---
      const bioLines = [
        document.getElementById('bio-line-1'),
        document.getElementById('bio-line-2'),
        document.getElementById('bio-line-3'),
        document.getElementById('bio-line-4')
      ];

      const bioTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#safari-bio-wrapper',
          pin: '#safari-bio-container',
          start: 'top top',
          end: '+=700',
          scrub: 0.8
        }
      });

      bioLines.forEach((line) => {
        if (line) {
          bioTl.to(line, {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power2.out',
            onStart: () => line.classList.add('lit'),
            onReverseComplete: () => line.classList.remove('lit')
          });
        }
      });

      // --- EFFECT 3 & 4: PARALLAX & SCALE-IN CARDS ---
      const projectCards = document.querySelectorAll('.story-project-card');
      projectCards.forEach((card, index) => {
        // Card scale up and fade in
        gsap.fromTo(card,
          { scale: 0.85, opacity: 0, y: 40 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 0.5
            }
          }
        );

        // Parallax image within banner
        const parallaxImg = card.querySelector('.story-parallax-img');
        if (parallaxImg) {
          gsap.fromTo(parallaxImg,
            { y: 35 },
            {
              y: -35,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          );
        }
      });

      // --- EFFECT 5: HORIZONTAL SCROLL (PINNED SKILLS TRACK) ---
      const skillsTrack = document.getElementById('skills-horizontal-track');
      const skillsContainer = document.getElementById('safari-skills-container');

      if (skillsTrack && skillsContainer) {
        // Calculate total distance to scroll horizontally
        const getScrollDistance = () => skillsTrack.scrollWidth - skillsContainer.clientWidth + 96;

        gsap.to(skillsTrack, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '#safari-skills-wrapper',
            pin: skillsContainer,
            start: 'top top',
            end: () => `+=${getScrollDistance() + 200}`,
            scrub: 1,
            invalidateOnRefresh: true
          }
        });
      }

      // --- EFFECT 6: NUMBER COUNTERS COUNT-UP ---
      const metricsSection = document.getElementById('safari-metrics');
      const counterProjects = document.getElementById('counter-projects');
      const counterTech = document.getElementById('counter-tech');
      const counterCgpa = document.getElementById('counter-cgpa');

      if (metricsSection) {
        ScrollTrigger.create({
          trigger: metricsSection,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            // Animate Projects: 0 -> 2
            if (counterProjects) {
              const obj = { val: 0 };
              gsap.to(obj, {
                val: 2,
                duration: 1.8,
                ease: 'power2.out',
                onUpdate: () => {
                  counterProjects.textContent = `${Math.round(obj.val)} Projects`;
                }
              });
            }

            // Animate Tech: 0 -> 15+
            if (counterTech) {
              const obj = { val: 0 };
              gsap.to(obj, {
                val: 15,
                duration: 2.2,
                ease: 'power2.out',
                onUpdate: () => {
                  counterTech.textContent = `${Math.round(obj.val)}+ Technologies`;
                }
              });
            }

            // Animate CGPA: 0.00 -> 8.20
            if (counterCgpa) {
              const obj = { val: 0 };
              gsap.to(obj, {
                val: 8.20,
                duration: 2.4,
                ease: 'power2.out',
                onUpdate: () => {
                  counterCgpa.textContent = `${obj.val.toFixed(2)} CGPA`;
                }
              });
            }
          }
        });
      }
    },

    // --- EFFECT 7: MAGNETIC CTA BUTTON ---
    setupMagneticButton() {
      const wrapper = document.getElementById('magnetic-btn-wrapper');
      const btn = document.getElementById('magnetic-cta-btn');
      if (!wrapper || !btn) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      wrapper.addEventListener('mousemove', (e) => {
        const rect = wrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.42;
        const deltaY = (e.clientY - centerY) * 0.42;

        if (typeof window.gsap !== 'undefined') {
          window.gsap.to(btn, {
            x: deltaX,
            y: deltaY,
            duration: 0.25,
            ease: 'power2.out'
          });
        } else {
          btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        }
      });

      wrapper.addEventListener('mouseleave', () => {
        if (typeof window.gsap !== 'undefined') {
          window.gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.65,
            ease: 'elastic.out(1, 0.4)'
          });
        } else {
          btn.style.transform = 'translate(0px, 0px)';
        }
      });
    }
  };


  /* ==========================================================================
     12. APPLICATION INITIALIZATION
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    // Stage 1: Boot Sequence
    BootManager.init();

    // Stage 2: Lock Screen & Live Clock
    LockScreenManager.init();

    // Stage 3: Desktop Environment Components
    ThemeManager.init();
    MenuBarManager.init();
    DockManager.init();
    DesktopManager.init();
    AboutModalManager.init();
    WindowManager.init();

    // Stage 4: Interactive Apps Engine
    AppsManager.init();

    // Stage 4B: Featured Projects Screenshot Carousels & Lightbox
    ProjectCarouselManager.init();

    // Stage 5: Safari Smooth Scroll Story Engine
    SafariScrollManager.init();

    // Open default window (Finder / About Me) on start if desktop is already entered
    window.addEventListener('macos-unlocked', () => {
      setTimeout(() => {
        WindowManager.open('finder');
      }, 300);
    });

    // Refresh Safari scroll trigger when Safari window opens or resizes
    window.addEventListener('app-launch-requested', (e) => {
      if (e.detail?.appName === 'safari') {
        SafariScrollManager.refresh();
      }
    });

    // Expose control API to window for debugging and programmatic access
    window.macOS = {
      BootManager,
      LockScreenManager,
      ThemeManager,
      MenuBarManager,
      DockManager,
      DesktopManager,
      AboutModalManager,
      WindowManager,
      AppsManager,
      ResumeManager,
      RESUMES_CONFIG,
      ExperienceManager,
      EXPERIENCES_CONFIG,
      ProjectCarouselManager,
      PROJECT_CAROUSELS_CONFIG,
      SafariScrollManager,
      SoundFX
    };
  });

})();




