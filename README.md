<div align="center">

# 🍎 Prajwal Shashikant Dongare — macOS Portfolio Website

### *A modern macOS Sonoma & Sequoia desktop operating system experience built natively for the web.*

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-0a84ff?style=for-the-badge&logo=github&logoColor=white)](https://dongareprajwal622.github.io/portfolio/)
[![License](https://img.shields.io/badge/License-MIT-34c759?style=for-the-badge)](LICENSE)
[![Pure Vanilla](https://img.shields.io/badge/Tech-HTML5_%7C_CSS3_%7C_Vanilla_JS-ff9f0a?style=for-the-badge&logo=javascript&logoColor=white)](https://dongareprajwal622.github.io/portfolio/)
[![macOS Sequoia](https://img.shields.io/badge/Design-macOS_Sequoia_UI-af52de?style=for-the-badge&logo=apple&logoColor=white)](https://dongareprajwal622.github.io/portfolio/)
[![Smooth Scroll](https://img.shields.io/badge/Motion-Lenis_%2B_GSAP-30d158?style=for-the-badge)](https://dongareprajwal622.github.io/portfolio/)

<br/>

[**Explore Live Experience »**](https://dongareprajwal622.github.io/portfolio/) &nbsp;|&nbsp;
[**Curated Resumes**](#-curated-multi-role-resumes) &nbsp;|&nbsp;
[**Featured Projects**](#-featured-projects) &nbsp;|&nbsp;
[**Terminal CLI**](#-interactive-terminal-commands) &nbsp;|&nbsp;
[**Quick Start**](#-local-development)

<br/>

</div>

---

## 🌟 Overview

Welcome to the personal developer portfolio of **Prajwal Shashikant Dongare** (MCA Graduate & Full-Stack Developer). Designed as a hyper-authentic, high-performance simulation of **macOS Sonoma / Sequoia**, this application bridges visual elegance with functional engineering.

Built with **zero build tools, zero npm dependencies, and zero frameworks** — running entirely on standard HTML5, CSS3 variables, and vanilla JavaScript. Simply open `index.html` in any browser or deploy effortlessly to **GitHub Pages**.

---

## 🖥️ System Architecture & Experience Stages

```
┌────────────────────────────────────────────────────────────────────────┐
│  STAGE 1: Hardware Boot Sequence (Geometric 'P' Monogram + Progress)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│  STAGE 2: macOS Lock Screen (Live Clock, Sleep / Restart / Shut Down)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │  Unlock (Click / Enter / Space)
┌───────────────────────────────────▼────────────────────────────────────┐
│  STAGE 3: macOS Desktop Environment                                    │
│   • 28px Frosted Glass Menu Bar with Live Clock & Sound FX Toggle       │
│   • Physics Magnifying Dock with Active Running Dots & App Bounce      │
│   • Interactive Right-Click Context Menu & Wallpaper Switcher          │
│   • Desktop Workspace Shortcuts (About Me, Story, Projects, Resume)    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│  STAGE 4: Multi-Window Operating System                                │
│   • Traffic Light Controls (Close, Minimize, Zoom / Maximize)          │
│   • Viewport-Clamped Titlebar Dragging & Multi-Plane Z-Index Layering  │
│   • Corner Resize Handles & Keyboard Shortcuts (Esc, Cmd/Ctrl+W/M)     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│  STAGE 5: 9 Built-in macOS Native Applications                         │
│  [Finder] [Safari Story] [Projects] [Skills] [Resume] [Mail] [Notes]   │
│  [Terminal zsh] [Simulated Trash Cleaner]                              │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Highlights & Interactive Features

### 1. Stage 1: Apple Boot Sequence
* Centered minimalist white geometric **"P"** monogram SVG.
* Linear loading bar with cubic ease-out deceleration animation.
* `sessionStorage` caching (runs on first visit, instant access on return).
* Instant **Skip Intro →** bypass control.

### 2. Stage 2: macOS Lock Screen
* Wallpaper depth effect with real-time frosted glass blur (`backdrop-filter: blur(28px) brightness(0.85)`).
* Live Apple lock screen clock (large `104px` typography + current day and date).
* Round profile badge with **"PD"** initials and soft pulse glow on unlock.
* Unlock via click on lock screen, pill button, or by pressing <kbd>Enter</kbd> / <kbd>Space</kbd>.
* Power management controls:
  - **Sleep**: Dims screen overlay; wakes instantly upon mouse move or keypress.
  - **Restart**: Triggers hardware reboot cycle and returns to lock screen.
  - **Shut Down**: Suspends desktop environment; wakes with single click.

### 3. Stage 3: macOS Desktop Environment
* **Top Menu Bar (28px Frosted Glass)**:
  - Apple/Prajwal logo menu with *About This Portfolio*, *Lock Screen*, *Restart*, and *Shut Down*.
  - Functional menus for *File*, *View*, *Window*, and *Help*.
  - Right status tray with live digital clock, Sound FX toggle (Web Audio API synthesizer), and Light/Dark appearance switcher.
* **Floating Glassmorphic Dock**:
  - Distance-based magnification physics: icons scale smoothly up to `1.55x` based on cursor distance using authentic cosine falloff curves.
  - Active app indicator lights underneath running applications.
  - Dynamic app launch bounce animation.
  - Tooltips with smooth entrance transitions.
* **Right-Click Context Menu**:
  - Dynamic wallpaper switcher:
    1. *Sonoma Sunset* (warm amber & deep violet gradient)
    2. *Sequoia Sky* (electric blue & midnight indigo)
    3. *Dark Aurora* (emerald teal & twilight slate)
  - Quick access to *Toggle Theme* and *About This Portfolio*.
* **Desktop Grid Shortcuts**:
  - Direct desktop files for About Me, Portfolio Story, Projects, and Resume.pdf.
  - Full keyboard accessibility (<kbd>Enter</kbd> / <kbd>Space</kbd>) and touch gesture handling.

### 4. Stage 4: Multi-Window Physics Engine
* **Authentic Traffic Light Controls**:
  - **Close (Red)**: Gracefully fades out window and turns off running dock dot.
  - **Minimize (Yellow)**: Scales down toward dock with state memory.
  - **Zoom / Fullscreen (Green)**: Expands window to fill desktop workspace with geometry caching.
* **Physics & Window Dragging**:
  - Titlebar dragging with viewport boundary clamping (prevents windows from disappearing offscreen or above the menu bar).
  - Dynamic z-index layering (clicked window automatically focuses to front).
  - Corner resize handle with minimum/maximum dimensional constraints.
  - Global keyboard shortcuts: <kbd>Esc</kbd> or <kbd>Ctrl+W</kbd> to close active window, <kbd>Ctrl+M</kbd> to minimize.

---

## 📱 9 Integrated macOS Applications

| App | Icon | Key Features |
| :--- | :---: | :--- |
| **Finder** *(About Me)* | 🗂️ | 4-tab sidebar interface: Bio & background, Technical skills, Experience timeline (Code Crafter Service internship), and Education (MCA: 8.20 CGPA, BCS: 6.90 CGPA). |
| **Safari** *(Portfolio Story)* | 🧭 | Keynote launch page featuring 7 scroll effects driven by **Lenis** smooth scrolling and **GSAP ScrollTrigger**: pinned text reveal, parallax project cards, pinned horizontal skills scrub, and magnetic CTA button. |
| **Projects** | 💻 | Showcase cards for **VisionFlux** (AI Text-to-Video Generator) and **Home Cleaning Assistant** (Enterprise Service Marketplace) with screenshot carousels and full-screen lightbox. |
| **Skills** | ⚡ | Grouped technology chips (Frontend, Backend, Database, Data & AI, Tools) with 3D elevation lift physics on hover. |
| **Resume** | 📄 | Finder-style multi-document PDF previewer featuring role filtering (Python Full Stack, AI Engineer, Data Analyst), print action, and direct downloads. |
| **Mail** *(Contact)* | ✉️ | Apple Mail compose client with prefilled `To: dongareprajwal622@gmail.com`, input validation, direct email link, and social profiles. |
| **Notes** | 📝 | Apple Notes interface with real-time `localStorage` autosave so thoughts and scratchpads persist between visits. |
| **Terminal** | 💻 | Interactive `zsh` shell with command history (<kbd>↑</kbd>/<kbd>↓</kbd>), `help`, `about`, `projects`, `experience`, `skills`, `education`, `resume`, `contact`, `open <app>`, `theme`, and `clear`. |
| **Trash** | 🗑️ | Realistic macOS trash bin showing discarded developer artifacts with synthesized paper-crumple sound effects and permanent clearing animation. |

---

## 💻 Interactive Terminal Commands

Inside the **Terminal** app (`terminal`), you can execute authentic UNIX / macOS shell commands:

| Command | Description | Example |
| :--- | :--- | :--- |
| `help` | Display list of all available commands | `help` |
| `about` | View professional summary and background | `about` |
| `projects` | List featured portfolio applications with live demo URLs | `projects` |
| `experience` | View internship details at Code Crafter Service | `experience` |
| `skills` | Print technical skill competencies by discipline | `skills` |
| `education` | View university degrees and verified CGPA scores | `education` |
| `resume` | List all curated resumes with direct download links | `resume` |
| `contact` | Print email, phone number, LinkedIn, and GitHub links | `contact` |
| `open <app>` | Launch any macOS desktop app directly from the command line | `open safari`, `open projects`, `open resume` |
| `theme` | Toggle instantaneously between Dark and Light mode | `theme` |
| `whoami` | Print active user profile identity | `whoami` |
| `date` | Display live system timestamp | `date` |
| `ls` | List simulated workspace files and apps | `ls` |
| `cat <file>` | Inspect file contents (e.g. `cat notes.txt`) | `cat notes.txt` |
| `clear` | Wipe terminal screen buffer | `clear` |

---

## 📄 Curated Multi-Role Resumes

The **Resume** app allows recruiters and hiring managers to preview and download role-tailored resumes directly in the browser:

| Track | Primary Focus & Tech Stack | Best For | Status |
| :--- | :--- | :--- | :--- |
| **Python Full Stack** *(Recommended)* | Python, Flask, REST APIs, Angular, MySQL, Java, Spring Boot | Full-Stack Developer roles | [Download PDF](assets/resumes/Prajwal-Dongare-Python-Full-Stack.pdf) |
| **AI Engineer** | Python, Generative AI, Magic Hour API, Prompt Engineering, LLM Workflows | AI / GenAI Engineer roles | [Download PDF](assets/resumes/Prajwal-Dongare-AI-Engineer.pdf) |
| **Data Analyst** | SQL, MySQL, Python, Power BI, DAX, Data Cleaning, ETL | Data Analyst & BI roles | [Download PDF](assets/resumes/Prajwal-Dongare-Data-Analyst.pdf) |

---

## 🛠️ Featured Projects

### 1. VisionFlux — AI Text-to-Video Generator
* **Description**: AI-powered multimedia web application that transforms textual prompts into video generation outputs. Features dynamic prompt processing, secure authentication, video rendering, and cloud database storage.
* **Tech Stack**: Python, Flask, Magic Hour AI API, RESTful APIs, HTML5, CSS3, JavaScript, Aiven MySQL.
* **Live Demo**: [visionflux-aohc.onrender.com](https://visionflux-aohc.onrender.com/)
* **Screenshots**: Home, Secure Login, Prompt Input, Generated Video Preview, User Dashboard, Secure Payment.

### 2. Home Cleaning Assistant — Enterprise Service Marketplace
* **Description**: Robust enterprise web platform designed for residential cleaning operations. Facilitates real-time service requests, cleaner schedule allocations, client management, and database tracking.
* **Tech Stack**: Java, JSP, Servlets, MySQL, HTML5, CSS3, JavaScript, IntelliJ IDEA.
* **Live Demo**: [home-cleaning-assistant-1.onrender.com/home.jsp](https://home-cleaning-assistant-1.onrender.com/home.jsp)
* **Screenshots**: Home, Our Team, Service Packages, Online Booking.

---

## ⌨️ Keyboard Shortcuts Cheatsheet

| Shortcut | Action | Scope |
| :--- | :--- | :--- |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Unlock lock screen / Open selected desktop icon | Lock Screen / Desktop |
| <kbd>Esc</kbd> | Close active window / Close lightbox / Close dropdowns | Global |
| <kbd>Ctrl</kbd> + <kbd>W</kbd> / <kbd>⌘</kbd> + <kbd>W</kbd> | Close topmost window | Desktop |
| <kbd>Ctrl</kbd> + <kbd>M</kbd> / <kbd>⌘</kbd> + <kbd>M</kbd> | Minimize topmost window | Desktop |
| <kbd>←</kbd> / <kbd>→</kbd> | Previous / Next screenshot in carousel & lightbox | Projects / Lightbox |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Navigate command history / Select adjacent resume | Terminal / Resume |

---

## 📁 Repository Structure

```
portfolio/
├── index.html                  # Core semantic HTML5 document (Boot, Lock, Desktop, 9 Windows)
├── css/
│   └── style.css               # Complete macOS Sequoia design system, glassmorphism & animations
├── js/
│   └── main.js                 # Modular Vanilla JS controllers (Sound, Boot, Window, Apps, Scroll)
├── assets/
│   ├── favicon.svg             # Custom geometric "P" squircle mark
│   ├── resume.pdf              # Full-stack developer resume document
│   ├── resumes/                # Curated multi-role PDF resumes
│   │   ├── Prajwal-Dongare-Python-Full-Stack.pdf
│   │   ├── Prajwal-Dongare-AI-Engineer.pdf
│   │   └── Prajwal-Dongare-Data-Analyst.pdf
│   └── projects/               # High-resolution project showcase screenshots
│       ├── visionflux/         # 6 screenshots (Home, Login, Prompt, Result, Dashboard, Payment)
│       └── home-cleaning/      # 4 screenshots (Home, Team, Packages, Booking)
└── README.md                   # Comprehensive project documentation
```

---

## 🚀 Local Development

No Node.js, npm, or build tools are required to view or run this project.

### Option 1: Direct Browser Launch
Simply double-click `index.html` or open it in **Google Chrome**, **Safari**, **Brave**, or **Edge**.

### Option 2: Lightweight Static Server (Recommended)
Using a local server ensures clean CORS handling:

```bash
# Python 3
python -m http.server 3000

# Node.js npx
npx serve .
```
Then visit `http://localhost:3000` in your browser.

---

## 🌐 Deploying to GitHub Pages

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: Prajwal Dongare macOS Portfolio Website"
   git branch -M main
   git remote add origin https://github.com/dongareprajwal622/portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - In your repository on GitHub, navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select branch: `main` and folder: `/(root)`.
   - Click **Save**. Within 1–2 minutes, your live site will be live at:
     ```
     https://dongareprajwal622.github.io/portfolio/
     ```

---

## 👨‍💻 Author

**Prajwal Shashikant Dongare**  
*MCA Graduate & Full-Stack Developer*  
Kolhapur, Maharashtra, India  

* 📧 **Email**: [dongareprajwal622@gmail.com](mailto:dongareprajwal622@gmail.com)
* 📞 **Phone**: [+91 9699432733](tel:+919699432733)
* 💼 **LinkedIn**: [linkedin.com/in/prajwal-dongare-533099334](https://www.linkedin.com/in/prajwal-dongare-533099334/)
* 🐙 **GitHub**: [github.com/dongareprajwal622](https://github.com/dongareprajwal622)

---

<div align="center">

Crafted with ❤️ and attention to detail by **Prajwal Shashikant Dongare**.  
*Open sourced under the [MIT License](LICENSE).*

</div>
