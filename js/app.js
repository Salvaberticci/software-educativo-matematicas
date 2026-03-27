/**
 * MathQuest - Main Application Logic
 * Phase 2: Integrated with PHP Backend
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Sound System ---
    const sounds = {
        bgm: new Audio('assets/sounds/bgm.mp3'),
        click: new Audio('assets/sounds/click.mp3'),
        correct: new Audio('assets/sounds/correct.mp3'),
        wrong: new Audio('assets/sounds/wrong.mp3'),
        win: new Audio('assets/sounds/win.mp3'),
    };

    // Configure loops / volume
    sounds.bgm.loop = true;
    sounds.bgm.volume = 0.3;

    let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
    const soundBtn = document.getElementById('soundToggle');

    function toggleSound() {
        soundEnabled = !soundEnabled;
        localStorage.setItem('soundEnabled', soundEnabled);
        updateSoundIcon();
        if (soundEnabled) {
            playSound('click');
            playSound('bgm');
        } else {
            sounds.bgm.pause();
        }
    }

    function updateSoundIcon() {
        if (soundBtn) soundBtn.innerHTML = soundEnabled ? '<span class="text-2xl text-grey-800">🔊</span>' : '<span class="text-2xl text-grey-800 opacity-50">🔇</span>';
    }

    if (soundBtn) soundBtn.onclick = toggleSound;
    updateSoundIcon();

    window.playSound = (name) => {
        if (!soundEnabled) return;
        if (sounds[name]) {
            if (name !== 'bgm') sounds[name].currentTime = 0;

            // Ducking: Pause BGM during 'win' sound
            if (name === 'win') {
                sounds.bgm.pause();
                sounds.win.onended = () => {
                    if (soundEnabled) sounds.bgm.play().catch(() => { });
                };
            }

            sounds[name].play().catch(() => { });
        }
    };

    // Try to play immediately (might be blocked by browser)
    if (soundEnabled) sounds.bgm.play().catch(() => console.log("Autoplay blocked - waiting for interaction"));

    // Unlock audio on first global click (common fix for browsers)
    document.body.addEventListener('click', function unlockAudio() {
        if (soundEnabled && sounds.bgm.paused) {
            sounds.bgm.play().catch(e => console.warn("Audio unlock failed: ", e));
        }
        document.body.removeEventListener('click', unlockAudio);
    }, { once: true });

    // Global Click Sound
    document.addEventListener('click', () => {
        if (soundEnabled) playSound('click');
    });

    // --- Theme System ---
    function applyTheme(child) {
        const body = document.body;

        // 1. Reset Classes (remove all themes)
        body.classList.remove(
            'theme-pokemon', 'theme-ben10', 'theme-ninjago', 'theme-teentitans', 'theme-sonic',
            'theme-avatar', 'theme-pawpatrol', 'theme-jurassic', 'theme-spongebob', 'theme-dragonball',
            'theme-ladybug', 'theme-gabby', 'theme-bluey', 'theme-mlp', 'theme-barbie',
            'theme-winx', 'theme-peppa', 'theme-disneyprincess', 'theme-sofia', 'theme-masha'
        );

        // 2. Apply New Theme if equipped
        if (child.theme_class) {
            body.classList.add(child.theme_class);
            // Dinamically set the background image based on theme
            const bgName = child.theme_class.replace('theme-', 'bg_') + '.jpg';
            body.style.backgroundImage = `url('assets/img/backgrounds/${bgName}')`;
            body.style.backgroundSize = 'cover';
            body.style.backgroundPosition = 'center';
            body.style.backgroundAttachment = 'fixed';
            body.style.backgroundRepeat = 'no-repeat';
        } else {
            body.style.backgroundImage = "none";
        }

        // 2.5 Generate Animated Background with tsParticles
        const particlesContainer = document.getElementById('tsparticles');
        if (particlesContainer && window.tsParticles) {
            // First destroy existing instance if any
            const instance = tsParticles.domItem(0);
            if (instance) {
                instance.destroy();
            }

            let particleOptions = null;
            const tc = child.theme_class;

            if (tc === 'theme-pokemon') {
                particleOptions = { particles: { number: { value: 60, density: { enable: true, area: 800 } }, color: { value: ["#FFD700", "#FF0000"] }, shape: { type: "circle" }, opacity: { value: 0.8 }, size: { value: { min: 4, max: 8 }, random: true }, move: { enable: true, speed: 2, direction: "top", outModes: "out" } } };
            } else if (tc === 'theme-ben10') {
                particleOptions = { particles: { number: { value: 50 }, color: { value: ["#00FF00", "#000000"] }, shape: { type: "polygon", options: { polygon: { sides: 6 } } }, opacity: { value: 0.7 }, size: { value: { min: 5, max: 10 } }, move: { enable: true, speed: 3, direction: "none" }, links: { enable: true, distance: 150, color: "#00FF00", opacity: 0.4, width: 2 } } };
            } else if (tc === 'theme-ninjago') {
                particleOptions = { particles: { number: { value: 40 }, color: { value: ["#FF0000", "#FFD700", "#111111"] }, shape: { type: "star" }, size: { value: { min: 5, max: 12 } }, move: { enable: true, speed: 4, direction: "bottom" }, rotate: { animation: { enable: true, speed: 10 } } } };
            } else if (tc === 'theme-teentitans') {
                particleOptions = { particles: { number: { value: 50 }, color: { value: ["#00FFFF", "#FF00FF", "#FFFF00"] }, shape: { type: ["circle", "triangle", "square"] }, opacity: { value: 1 }, size: { value: { min: 4, max: 12 } }, move: { enable: true, speed: 3, direction: "top-right" }, rotate: { animation: { enable: true, speed: 5 } } } };
            } else if (tc === 'theme-sonic') {
                particleOptions = { particles: { number: { value: 30 }, color: { value: ["#FFD700", "#FFF"] }, shape: { type: "circle" }, opacity: { value: 1 }, size: { value: 10 }, move: { enable: true, speed: 15, direction: "right" } } };
            } else if (tc === 'theme-avatar') {
                particleOptions = { particles: { number: { value: 100 }, color: { value: ["#FFFFFF", "#ADD8E6"] }, shape: { type: "circle" }, opacity: { value: 0.5 }, size: { value: { min: 1, max: 4 } }, move: { enable: true, speed: 6, direction: "top-left", wobble: { enable: true, distance: 10, speed: 10 } } } };
            } else if (tc === 'theme-pawpatrol') {
                particleOptions = { particles: { number: { value: 40 }, color: { value: ["#FF0000", "#0000FF", "#FFFF00"] }, shape: { type: "circle" }, size: { value: { min: 6, max: 12 } }, move: { enable: true, speed: 2, direction: "bottom" } } };
            } else if (tc === 'theme-jurassic') {
                particleOptions = { particles: { number: { value: 60 }, color: { value: ["#228B22", "#8B4513", "#DAA520"] }, shape: { type: "polygon", options: { polygon: { sides: 3 } } }, size: { value: { min: 4, max: 15 } }, move: { enable: true, speed: 2, direction: "bottom" }, rotate: { animation: { enable: true, speed: 5 } } } };
            } else if (tc === 'theme-spongebob') {
                particleOptions = { particles: { number: { value: 60 }, color: { value: ["#87CEEB", "#FFD700", "#FFF"] }, shape: { type: "circle" }, opacity: { value: 0.5 }, size: { value: { min: 8, max: 20 } }, move: { enable: true, speed: 2, direction: "top", wobble: { enable: true, distance: 10, speed: 10 } } } };
            } else if (tc === 'theme-dragonball') {
                particleOptions = { particles: { number: { value: 70 }, color: { value: ["#FFA500", "#FFD700", "#FFFFE0"] }, shape: { type: "circle" }, opacity: { value: { min: 0.3, max: 1 }, anim: { enable: true, speed: 3 } }, size: { value: { min: 2, max: 8 } }, move: { enable: true, speed: 6, direction: "top", outModes: "out" } } };
            } else if (tc === 'theme-ladybug') {
                particleOptions = { particles: { number: { value: 50 }, color: { value: ["#FF0000", "#000000"] }, shape: { type: "circle" }, size: { value: { min: 4, max: 8 } }, move: { enable: true, speed: 2, direction: "none", random: true } } };
            } else if (tc === 'theme-gabby') {
                particleOptions = { particles: { number: { value: 50 }, color: { value: ["#FF69B4", "#9370DB", "#20B2AA"] }, shape: { type: ["circle", "star"] }, size: { value: { min: 4, max: 10 } }, move: { enable: true, speed: 1.5, direction: "top" } } };
            } else if (tc === 'theme-bluey') {
                particleOptions = { particles: { number: { value: 40 }, color: { value: ["#87CEEB", "#4682B4", "#FFF"] }, shape: { type: "circle" }, opacity: { value: 0.6 }, size: { value: { min: 5, max: 15 } }, move: { enable: true, speed: 2, direction: "top", wobble: { enable: true, distance: 5, speed: 10 } } } };
            } else if (tc === 'theme-mlp') {
                particleOptions = { particles: { number: { value: 70 }, color: { value: ["#FFB6C1", "#DDA0DD", "#FFF"] }, shape: { type: "star" }, size: { value: { min: 3, max: 8 } }, move: { enable: true, speed: 1, direction: "none" }, twinkle: { particles: { enable: true, color: "#FFF", frequency: 0.05, opacity: 1 } } } };
            } else if (tc === 'theme-barbie') {
                particleOptions = { particles: { number: { value: 60 }, color: { value: ["#FF1493", "#FF69B4", "#FFF"] }, shape: { type: "circle" }, size: { value: { min: 4, max: 8 } }, move: { enable: true, speed: 2, direction: "top-right" } } };
            } else if (tc === 'theme-winx') {
                particleOptions = { particles: { number: { value: 100 }, color: { value: ["#FF00FF", "#00FFFF", "#FFD700"] }, shape: { type: "circle" }, opacity: { value: 0.8, anim: { enable: true, speed: 2 } }, size: { value: { min: 1, max: 4 } }, move: { enable: true, speed: 1.5, direction: "none" } } };
            } else if (tc === 'theme-peppa') {
                particleOptions = { particles: { number: { value: 40 }, color: { value: ["#FFC0CB", "#87CEFA", "#98FB98"] }, shape: { type: "circle" }, size: { value: { min: 5, max: 12 } }, move: { enable: true, speed: 1.5, direction: "top" } } };
            } else if (tc === 'theme-disneyprincess') {
                particleOptions = { particles: { number: { value: 80 }, color: { value: ["#FFD700", "#FF69B4", "#FFF"] }, shape: { type: "star" }, opacity: { value: 0.8 }, size: { value: { min: 4, max: 8 } }, move: { enable: true, speed: 1, direction: "none" }, twinkle: { particles: { enable: true, color: "#FFD700", frequency: 0.05, opacity: 1 } } } };
            } else if (tc === 'theme-sofia') {
                particleOptions = { particles: { number: { value: 50 }, color: { value: ["#9370DB", "#E6E6FA", "#FFD700"] }, shape: { type: "star" }, size: { value: { min: 4, max: 10 } }, move: { enable: true, speed: 1, direction: "top" } } };
            } else if (tc === 'theme-masha') {
                particleOptions = { particles: { number: { value: 60 }, color: { value: ["#C71585", "#228B22", "#8B4513"] }, shape: { type: "circle" }, size: { value: { min: 4, max: 10 } }, move: { enable: true, speed: 2, direction: "bottom" } } };
            }

            if (particleOptions) {
                // Ensure full screen
                particleOptions.fullScreen = { enable: false }; // Handled by CSS fixed inset-0
                particleOptions.detectRetina = true;
                tsParticles.load("tsparticles", particleOptions);
            }
        }

        // 3. Update Audio Source (BGM)
        // Only change if different from default
        const targetBgm = child.bgm_file ? `assets/sounds/${child.bgm_file}` : 'assets/sounds/bgm.mp3';

        // Check if src is actually changing to avoid interruption
        // Decode URI is needed because .src returns absolute url encoded
        if (!sounds.bgm.src.includes(targetBgm)) {
            const wasPlaying = !sounds.bgm.paused;
            sounds.bgm.src = targetBgm;
            if (wasPlaying && soundEnabled) sounds.bgm.play().catch(e => console.warn("Theme audio failed: ", e));
        }
    }

    function getAvatarEmoji(avatarId) {
        if (state.activeChild && state.activeChild.theme_icon) {
            if (state.activeChild.theme_icon.includes('.png')) {
                const iconPath = `assets/img/icons/${state.activeChild.theme_icon}`;
                return `<img src="${iconPath}" alt="Icon" style="width: 38px; height: 38px; object-fit: contain; display: inline-block; vertical-align: middle;">`;
            }
            return state.activeChild.theme_icon;
        }
        return avatarId == 2 ? '👧' : '👦';
    }

    // Initial State
    const state = {
        user: null,
        activeChild: null,
        view: 'login',
        children: [],
        settings: {
            game_timer_sec: 20,
            base_reward_price: 200
        },
        levels: [
            { id: 1,  name: "Sumas Fáciles ➕",          pos: {x: 10, y: 80} },
            { id: 2,  name: "Sumas Grandes ➕",          pos: {x: 22, y: 65} },
            { id: 3,  name: "Restas Fáciles ➖",         pos: {x: 35, y: 80} },
            { id: 4,  name: "Restas Desafiantes ➖",     pos: {x: 40, y: 50} },
            { id: 5,  name: "Tablas x1-x5 ✖️",         pos: {x: 55, y: 35} },
            { id: 6,  name: "Tablas x6-x10 ✖️",        pos: {x: 65, y: 60} },
            { id: 7,  name: "Fracciones 🍕",            pos: {x: 75, y: 40} },
            { id: 8,  name: "Fracciones Equiv. 🍕",     pos: {x: 82, y: 70} },
            { id: 9,  name: "Combinado 📊",             pos: {x: 88, y: 45} },
            { id: 10, name: "¡Castillo del Dragón! 🏰", pos: {x: 85, y: 18} }
        ]
    };

    // Helper to render the coin icon (Using user's original GIF)
    const coinIcon = (size = 24) => `
        <img src="assets/img/coin.gif" width="${size}" height="${size}" class="inline-block align-middle mr-1" alt="Moneda">
    `;

    // Components / Templates
    const views = {
        login: () => `
            <div class="flex items-center justify-center min-h-screen p-4">
                <!-- Floating decorative blobs -->
                <div class="fixed top-10 left-10 w-40 h-40 rounded-full floating-slow pointer-events-none" style="background: radial-gradient(circle, hsla(344,100%,80%,0.35), transparent 70%); filter: blur(20px);"></div>
                <div class="fixed bottom-20 right-10 w-52 h-52 rounded-full floating pointer-events-none" style="background: radial-gradient(circle, hsla(175,65%,60%,0.3), transparent 70%); filter: blur(24px); animation-delay: 1.5s"></div>
                <div class="fixed top-1/2 right-20 w-32 h-32 rounded-full floating-fast pointer-events-none" style="background: radial-gradient(circle, hsla(265,90%,78%,0.28), transparent 70%); filter: blur(16px); animation-delay: 0.8s"></div>

                <div class="candy-card w-full max-w-md p-10 text-center relative z-10 animate-bounce-in">
                    <!-- Logo -->
                    <div class="mb-8">
                        <div class="flex justify-center mb-6">
                            <img src="assets/img/logo.jpeg" alt="MathQuest Logo" 
                                 class="w-44 h-44 rounded-2xl shadow-candy border-8 border-white object-contain bg-white floating">
                        </div>
                        <h1 class="text-6xl font-bold mb-2" style="background: linear-gradient(135deg, hsl(348,100%,60%), hsl(265,90%,68%)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                            MathQuest
                        </h1>
                        <p class="font-medium" style="color: var(--text-medium)">¡La aventura matemática te espera! 🌟</p>
                    </div>

                    <form id="loginForm" class="space-y-5 relative z-10">
                        <div class="text-left">
                            <label class="block font-bold mb-2 ml-3" style="color: var(--text-medium)">✉️ Email del Padre/Tutor</label>
                            <input type="email" name="email" placeholder="papa@ejemplo.com" required class="candy-input text-lg">
                        </div>
                        <div class="text-left">
                            <label class="block font-bold mb-2 ml-3" style="color: var(--text-medium)">🔑 Contraseña</label>
                            <input type="password" name="password" placeholder="••••••••" required class="candy-input text-lg">
                        </div>
                        <button type="submit" id="loginBtn" class="candy-btn candy-btn-primary w-full py-4 text-xl mt-2">
                            ¡Entrar a Jugar! 🚀
                        </button>
                    </form>

                    <div class="mt-6 text-sm" style="color: var(--text-light)">
                        ¿No tienes cuenta? <a href="#" onclick="render('register')" class="font-bold hover:underline" style="color: var(--secondary)">Regístrate aquí ✨</a>
                    </div>
                    <div class="mt-6">
                        <a href="about.html" target="_blank" class="text-xs font-bold uppercase tracking-wider opacity-60 hover:opacity-100 transition-opacity" style="color: var(--text-medium)">
                            ℹ️ Acerca de MathQuest
                        </a>
                    </div>
                </div>
            </div>
        `,

        register: () => `
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="fixed top-16 right-16 w-44 h-44 rounded-full floating pointer-events-none" style="background: radial-gradient(circle, hsla(265,90%,78%,0.32), transparent 70%); filter: blur(22px);"></div>
                <div class="fixed bottom-16 left-16 w-36 h-36 rounded-full floating-slow pointer-events-none" style="background: radial-gradient(circle, hsla(344,100%,76%,0.3), transparent 70%); filter: blur(18px); animation-delay: 1s"></div>

                <div class="candy-card w-full max-w-md p-10 text-center relative z-10 animate-bounce-in">
                    <div class="mb-8">
                        <div class="text-6xl mb-3 floating" style="animation-delay: 0.2s">🌟</div>
                        <h1 class="text-5xl font-bold mb-2" style="background: linear-gradient(135deg, hsl(265,90%,63%), hsl(344,100%,65%)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">¡Únete a la Aventura!</h1>
                        <p class="font-medium" style="color: var(--text-medium)">Crea una cuenta para tus exploradores</p>
                    </div>

                    <form id="registerForm" class="space-y-5">
                        <div class="text-left">
                            <label class="block font-bold mb-2 ml-3" style="color: var(--text-medium)">✉️ Email</label>
                            <input type="email" name="email" placeholder="papa@ejemplo.com" required class="candy-input text-lg">
                        </div>
                        <div class="text-left">
                            <label class="block font-bold mb-2 ml-3" style="color: var(--text-medium)">🔑 Contraseña</label>
                            <input type="password" name="password" placeholder="••••••••" required class="candy-input text-lg">
                        </div>
                        <button type="submit" id="registerBtn" class="candy-btn candy-btn-purple w-full py-4 text-xl mt-2">
                            Registrarse ✨
                        </button>
                    </form>

                    <div class="mt-6 text-sm" style="color: var(--text-light)">
                        ¿Ya tienes cuenta? <a href="#" onclick="render('login')" class="font-bold hover:underline" style="color: var(--primary)">Inicia sesión 🚀</a>
                    </div>
                </div>
            </div>
        `,

        profileSelection: () => `
            <div class="min-h-screen p-8">
                <div class="max-w-5xl mx-auto">
                    <div class="text-center mb-14 animate-slide-down">
                        <div class="text-5xl mb-3">🎮</div>
                        <h2 class="text-5xl font-bold mb-3" style="background: linear-gradient(135deg, hsl(348,100%,60%), hsl(30,100%,58%), hsl(265,90%,68%)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">¿Quién va a explorar hoy?</h2>
                        <p class="text-xl font-medium" style="color: var(--text-medium)">Selecciona tu personaje aventurero 🌟</p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger">
                        ${state.children.map((child, i) => `
                            <div class="candy-card p-8 text-center group cursor-pointer animate-slide-up"
                                 onclick="selectChild(${child.id})"
                                 style="transition: transform 0.25s cubic-bezier(0.175,0.885,0.32,1.275), box-shadow 0.25s ease; animation-delay: ${i * 0.1}s"
                                 onmouseover="this.style.transform='translateY(-10px) scale(1.03)'"
                                 onmouseout="this.style.transform='translateY(0) scale(1)'">
                                <div class="w-32 h-32 rounded-full mx-auto mb-5 flex items-center justify-center text-6xl relative"
                                     style="background: linear-gradient(135deg, hsl(52,94%,72%), hsl(45,100%,62%)); box-shadow: 0 8px 0 hsl(45,100%,50%), 0 12px 30px hsla(52,94%,60%,0.4);">
                                    ${child.theme_icon
                ? (child.theme_icon.includes('.png')
                    ? `<img src="/software-educativo-matematicas/assets/img/icons/${child.theme_icon}" alt="Avatar" style="width: 64px; height: 64px; object-fit: contain;">`
                    : child.theme_icon)
                : (child.avatar_id == 2 ? '\uD83D\uDC67' : '\uD83D\uDC66')}
                                    ${child.theme_icon ? '<div class="absolute -top-2 -right-2 text-2xl floating">✨</div>' : ''}
                                </div>
                                <h3 class="text-2xl font-bold mb-1" style="color: var(--text-dark)">${child.name}</h3>
                                <p class="font-bold uppercase tracking-wider text-sm mb-1" style="color: var(--secondary)">${child.grade}\u00ba Grado</p>
                                <div class="flex items-center justify-center gap-2 mb-5">
                                    <img src="assets/img/coin.gif" width="20" height="20" class="inline-block" alt="Moneda">
                                    <span class="font-bold" style="color: hsl(35,100%,45%)">${child.coins}</span>
                                </div>
                                <button class="candy-btn candy-btn-primary w-full py-3 text-lg">
                                    ¡A Jugar! 🚀
                                </button>
                            </div>
                        `).join('')}

                        <div onclick="addChildPrompt()" class="candy-card p-8 text-center flex flex-col items-center justify-center cursor-pointer group animate-slide-up"
                             style="border: 3px dashed rgba(0,0,0,0.12); background: rgba(255,255,255,0.5); animation-delay: ${state.children.length * 0.1}s"
                             onmouseover="this.style.background='rgba(255,255,255,0.85)'; this.style.transform='translateY(-6px)'"
                             onmouseout="this.style.background='rgba(255,255,255,0.5)'; this.style.transform='translateY(0)'">
                            <div class="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-5 group-hover:scale-110 transition-transform"
                                 style="background: rgba(0,0,0,0.05)">
                                ➕
                            </div>
                            <p class="text-xl font-bold" style="color: var(--text-medium)">Añadir Explorador</p>
                            <p class="text-sm mt-1" style="color: var(--text-light)">Nuevo perfil de niño</p>
                        </div>
                    </div>

                    <div class="text-center mt-10">
                        <button onclick="logout()" class="candy-btn candy-btn-secondary px-8 py-3">
                            Cerrar Sesión 🚪
                        </button>
                    </div>
                </div>
            </div>
        `,

        levelMap: () => `
            <div class="min-h-screen p-4 pb-36">
                <!-- Header -->
                <header class="max-w-4xl mx-auto flex justify-between items-center mb-10 animate-slide-down">
                    <div class="flex items-center gap-4">
                        <div class="candy-card px-5 py-3 flex items-center gap-3">
                            <span class="text-3xl filter drop-shadow-sm">
                                ${getAvatarEmoji(state.activeChild.avatar_id)}
                            </span>
                            <div>
                                <p class="font-bold leading-tight" style="color: var(--text-dark)">${state.activeChild.name}</p>
                                <p class="text-xs font-bold uppercase" style="color: var(--secondary)">${state.activeChild.grade}\u00ba Grado</p>
                            </div>
                        </div>
                        ${state.user.role === 'admin' ? `
                            <button onclick="render('adminDashboard')" class="candy-card px-5 py-3 hover:scale-110 transition-transform bg-purple-500 text-white border-purple-300" title="Centro de Mando Administrativo">
                                <span class="text-2xl">⚙️</span>
                                <span class="hidden md:inline font-bold ml-1 text-sm uppercase">Admin</span>
                            </button>
                        ` : ''}
                    </div>
                    <div class="candy-card px-5 py-3 flex items-center gap-2">
                        <img src="assets/img/coin.gif" width="32" height="32" class="inline-block animate-bounce-in" alt="Moneda">
                        <span id="mapCoins" class="text-2xl font-bold" style="color: hsl(35,100%,45%)">${state.activeChild.coins}</span>
                    </div>
                </header>

                <!-- Title -->
                <div class="text-center mb-6 animate-slide-down" style="animation-delay:0.1s">
                    <h2 class="text-4xl font-bold drop-shadow-md" style="color: var(--primary); text-shadow: 2px 2px 0 rgba(0,0,0,0.15);">🗺️ Viaje Matemático</h2>
                    <p class="font-medium mt-1" style="color: var(--secondary); text-shadow: 1px 1px 0 rgba(0,0,0,0.2);">¡Llega al castillo para el gran desafío final!</p>
                </div>

                <!-- Adventure Map -->
                <div class="max-w-6xl mx-auto candy-card p-3 relative overflow-hidden bg-blue-50">
                    <div class="relative rounded-2xl border-4 border-white shadow-inner bg-blue-100 aspect-video w-full" style="max-height: 70vh;">
                        <div style="width: 100%; height: 100%; position: relative; background: url('assets/img/adventure/map.png?v=2') center/100% 100% no-repeat;">


                            <!-- Level Nodes -->
                            ${state.levels.map((level, i) => {
                                const isLocked = level.id > state.activeChild.current_level;
                                const isCompleted = level.id < state.activeChild.current_level;
                                const isActive = level.id === state.activeChild.current_level;
                                let nodeStyle = `position: absolute; left: ${level.pos.x}%; top: ${level.pos.y}%; transform: translate(-50%, -50%); z-index: 20;`;
                                let btnClass = "w-14 h-14 rounded-full font-bold text-xl border-4 shadow-lg flex items-center justify-center transition-all duration-300";
                                let bg, color, border;
                                
                                if (isLocked) {
                                    bg = 'bg-gray-200'; color = 'text-gray-400'; border = 'border-gray-400';
                                } else if (isCompleted) {
                                    bg = 'bg-green-400'; color = 'text-white'; border = 'border-white';
                                } else {
                                    bg = 'bg-yellow-400'; color = 'text-white'; border = 'border-white';
                                    btnClass += " animate-bounce";
                                }

                                return `
                                <div style="${nodeStyle}" class="group text-center">
                                    <button ${isLocked ? 'disabled' : ''} onclick="startLevel(${level.id})"
                                        class="${btnClass} ${bg} ${color} ${border} hover:scale-110">
                                        ${isLocked ? '🔒' : level.id}
                                    </button>
                                    <div class="${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} group-hover:opacity-100 group-hover:scale-100 transition-all absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-full shadow-md text-sm font-bold w-max pointer-events-none" style="color: var(--primary)">
                                        ${level.name}
                                    </div>
                                </div>
                                `;
                            }).join('')}

                            <!-- Player Character -->
                            <div id="playerCharacter" class="absolute z-30 transition-all duration-1000 ease-in-out pointer-events-none" 
                                style="width: 70px; height: 90px; transform: translate(-50%, -100%);">
                                <!-- The player character's position is updated in attachListeners or updateMap() -->
                                <img src="assets/img/adventure/${state.activeChild.avatar_id == 2 ? 'player_girl' : 'player_boy'}.png" class="w-full h-full object-contain" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4)); transform-origin: bottom center; animation: floating-fast 2s ease-in-out infinite;">
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bottom Nav -->
                <nav class="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-sm bottom-nav p-2 flex justify-around">
                    <button class="nav-btn">🗺️<span>Mapa</span></button>
                    <button onclick="render('pvpArena')" class="nav-btn text-red-500 hover:scale-110 transition-transform">⚔️<span class="font-bold text-red-500">Duelo</span></button>
                    <button onclick="render('rewards')" class="nav-btn">🎁<span>Premios</span></button>
                    <button onclick="render('dashboard')" class="nav-btn">📊<span>Panel</span></button>
                    <button onclick="render('profileSelection')" class="nav-btn">👥<span>Perfil</span></button>
                    <button onclick="logout()" class="nav-btn">🚪<span>Salir</span></button>
                </nav>
            </div>
        `,

        pvpArena: () => `
            <div class="min-h-screen p-4 flex flex-col relative" style="background: radial-gradient(circle at center, #1e293b, #0f172a); color: white;">
                
                <!-- Navbar -->
                <div class="flex justify-between items-center mb-4 z-10 px-4">
                    <button onclick="exitPvpMode()" class="candy-btn px-4 py-2 text-sm z-20 relative" style="background: rgba(255,255,255,0.1); color: white; border-color: rgba(255,255,255,0.2)">
                        ← Abandonar Arena
                    </button>
                    <h2 class="text-3xl font-black uppercase tracking-widest text-red-500 absolute left-1/2 -translate-x-1/2" style="text-shadow: 0 0 15px rgba(239, 68, 68, 0.5); pointer-events: none;">
                        Duelo Local ⚔️
                    </h2>
                </div>

                <!-- Equation Center -->
                <div class="absolute left-1/2 top-[40%] md:top-[20%] -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full max-w-sm pointer-events-none">
                    <div class="candy-card p-4 md:p-6 bg-slate-900 border-4 border-slate-700 mx-auto w-max shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                        <span class="text-xs uppercase font-bold text-slate-400 block mb-2">Resuelve Rápido!</span>
                        <div id="pvpEquation" class="text-5xl md:text-7xl font-black text-white" style="text-shadow: 0 0 10px rgba(255,255,255,0.5)">
                            ⏳
                        </div>
                    </div>
                </div>

                <!-- Split Screen Area -->
                <div class="flex-1 flex flex-col md:flex-row gap-4 relative z-0">
                    
                    <!-- Player 1 (Top/Left) -->
                    <div class="flex-1 rounded-2xl border-4 p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group" id="pvpArea1" style="border-color: #3b82f6; background: linear-gradient(135deg, rgba(59,130,246,0.1), transparent)">
                        <div class="absolute inset-0 bg-blue-500 opacity-0 group-[.damage]:opacity-30 transition-opacity duration-100"></div>
                        
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center z-10">
                            <div class="mb-4 md:mb-0">
                                <h3 class="text-2xl font-black text-blue-400 uppercase tracking-widest mb-1 shadow-sm">Jugador 1</h3>
                                <div class="text-[10px] bg-blue-900/50 text-blue-300 px-2 py-1 rounded inline-block">Teclas: A, S, D</div>
                            </div>
                            <!-- Health Bar -->
                            <div class="flex gap-1 bg-slate-800/80 p-2 rounded-xl border border-slate-700 shadow-xl" id="pvpHealth1">
                                <!-- Hearts generated by JS -->
                            </div>
                        </div>

                        <div class="flex justify-center gap-4 z-10 mt-auto pt-24 md:pt-0 pb-4">
                            <button id="p1btn0" onclick="handlePvpAnswer(1, 0)" class="w-full max-w-[120px] h-20 md:h-28 rounded-xl text-3xl md:text-4xl font-black bg-slate-800 border-b-8 border-slate-900 hover:bg-slate-700 hover:-translate-y-1 transition-all">?</button>
                            <button id="p1btn1" onclick="handlePvpAnswer(1, 1)" class="w-full max-w-[120px] h-20 md:h-28 rounded-xl text-3xl md:text-4xl font-black bg-slate-800 border-b-8 border-slate-900 hover:bg-slate-700 hover:-translate-y-1 transition-all">?</button>
                            <button id="p1btn2" onclick="handlePvpAnswer(1, 2)" class="w-full max-w-[120px] h-20 md:h-28 rounded-xl text-3xl md:text-4xl font-black bg-slate-800 border-b-8 border-slate-900 hover:bg-slate-700 hover:-translate-y-1 transition-all">?</button>
                        </div>
                    </div>

                    <!-- Divider Line -->
                    <div class="absolute inset-x-0 top-[60%] h-2 md:top-auto md:inset-y-0 md:left-1/2 md:w-2 md:h-full bg-slate-800 z-10 -translate-y-1/2 md:-translate-y-0 md:-translate-x-1/2 shadow-[0_0_20px_rgba(0,0,0,1)] border border-slate-700/50 rounded-full flex items-center justify-center pointer-events-none hidden md:flex">
                        <div class="bg-slate-900 text-slate-500 font-black text-xs px-2 py-1 rounded shadow-lg rotate-0 md:-rotate-90">VS</div>
                    </div>

                    <!-- Player 2 (Bottom/Right) -->
                    <div class="flex-1 rounded-2xl border-4 p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group" id="pvpArea2" style="border-color: #ef4444; background: linear-gradient(135deg, transparent, rgba(239,68,68,0.1))">
                        <div class="absolute inset-0 bg-red-500 opacity-0 group-[.damage]:opacity-30 transition-opacity duration-100"></div>

                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center z-10 md:flex-row-reverse">
                            <div class="text-left md:text-right mb-4 md:mb-0">
                                <h3 class="text-2xl font-black text-red-400 uppercase tracking-widest mb-1 shadow-sm">Jugador 2</h3>
                                <div class="text-[10px] bg-red-900/50 text-red-300 px-2 py-1 rounded inline-block">Teclas: J, K, L</div>
                            </div>
                            <!-- Health Bar -->
                            <div class="flex gap-1 flex-row-reverse md:flex-row-reverse bg-slate-800/80 p-2 rounded-xl border border-slate-700 shadow-xl" id="pvpHealth2">
                                <!-- Hearts generated by JS -->
                            </div>
                        </div>

                        <div class="flex justify-center gap-4 z-10 mt-auto pt-24 md:pt-0 pb-4">
                            <button id="p2btn0" onclick="handlePvpAnswer(2, 0)" class="w-full max-w-[120px] h-20 md:h-28 rounded-xl text-3xl md:text-4xl font-black bg-slate-800 border-b-8 border-slate-900 hover:bg-slate-700 hover:-translate-y-1 transition-all">?</button>
                            <button id="p2btn1" onclick="handlePvpAnswer(2, 1)" class="w-full max-w-[120px] h-20 md:h-28 rounded-xl text-3xl md:text-4xl font-black bg-slate-800 border-b-8 border-slate-900 hover:bg-slate-700 hover:-translate-y-1 transition-all">?</button>
                            <button id="p2btn2" onclick="handlePvpAnswer(2, 2)" class="w-full max-w-[120px] h-20 md:h-28 rounded-xl text-3xl md:text-4xl font-black bg-slate-800 border-b-8 border-slate-900 hover:bg-slate-700 hover:-translate-y-1 transition-all">?</button>
                        </div>
                    </div>

                </div>
            </div>
        `,

        game: () => `
            <div class="min-h-screen p-4 pb-8 flex items-center justify-center">
                <div class="w-full max-w-6xl">
                    <!-- Top Bar -->
                    <div class="flex justify-between items-center mb-6 animate-slide-down px-4">
                        <button onclick="render('levelMap')" class="candy-btn candy-btn-secondary px-4 py-2 text-xs">← Rendirse</button>
                        <div class="flex items-center gap-2">
                            <img src="assets/img/coin.gif" width="24" height="24" alt="Monedas">
                            <span id="gameCoins" class="font-bold text-xl" style="color: hsl(35,100%,45%)">${state.activeChild.coins}</span>
                        </div>
                    </div>

                    <!-- Layout: Grid if Boss, Single if Normal -->
                    <div id="gameLayout" class="grid grid-cols-1 ${gameData.levelInfo.boss_name ? 'lg:grid-cols-2' : ''} gap-8 items-start">
                        
                        <!-- Columna Izquierda: Jefe (Sólo si existe) -->
                        <div id="bossArea" class="${gameData.levelInfo.boss_name ? '' : 'hidden'} candy-card p-8 flex flex-col items-center justify-center animate-slide-right min-h-[400px]" 
                             style="background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(241, 245, 249, 0.9)); border: 4px solid var(--primary);">
                            <div class="flex flex-col items-center w-full">
                                <div id="bossIcon" class="mb-6 transform hover:scale-110 transition-transform">
                                    <!-- Icon or Image populated by JS -->
                                </div>
                                <h3 id="bossName" class="text-2xl font-black uppercase tracking-widest text-red-600 mb-4 text-center">Jefe Final</h3>
                                
                                <div class="w-full max-w-xs mb-6">
                                    <div class="flex justify-between items-center mb-1">
                                        <span class="font-bold text-xs uppercase text-slate-400">Energía del Jefe</span>
                                        <span id="bossHpText" class="font-bold text-xs text-red-500">3 / 3</span>
                                    </div>
                                    <div class="h-5 w-full bg-slate-200 rounded-full border-2 border-white shadow-inner overflow-hidden">
                                        <div id="bossHpBar" class="h-full bg-gradient-to-r from-red-500 to-orange-400 transition-all duration-500" style="width: 100%"></div>
                                    </div>
                                </div>

                                <div class="relative w-full">
                                    <p id="bossShout" class="bg-white px-6 py-4 rounded-3xl shadow-lg border-2 border-slate-100 text-lg font-bold text-slate-600 text-center italic animate-bounce-in min-h-[3rem] flex items-center justify-center">
                                        ¡Preparate para el reto!
                                    </p>
                                    <div class="absolute -top-3 left-1/2 -track-x-1/2 w-6 h-6 bg-white border-l-2 border-t-2 border-slate-100 rotate-45" style="left: 50%; transform: translateX(-50%) rotate(45deg);"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Columna Derecha: Ejercicios -->
                        <div class="flex flex-col gap-6">
                            <!-- Progress & Timer -->
                            <div class="candy-card p-6 animate-slide-down">
                                <div class="flex justify-between items-center mb-4">
                                    <div class="flex flex-col">
                                        <span class="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Tu Progreso</span>
                                        <h4 id="questionCounter" class="text-3xl font-black" style="color: var(--primary)">1 / 10</h4>
                                    </div>
                                    <div id="feedback" class="text-5xl opacity-0 scale-50 transition-all duration-300">✨</div>
                                </div>
                                <div class="progress-bar-track" style="height: 16px;">
                                    <div id="timerBar" class="progress-bar-fill" style="height: 100%; width: 100%;"></div>
                                </div>
                            </div>

                            <!-- Exercise Area -->
                            <div class="candy-card p-10 text-center relative overflow-visible animate-bounce-in min-h-[400px] flex flex-col justify-center items-center">
                                <!-- Mascot icon -->
                                <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center text-5xl border-4 border-white shadow-xl"
                                     style="background: linear-gradient(135deg, hsl(52,94%,72%), hsl(45,100%,62%)); animation: floating 2.5s ease-in-out infinite">
                                    🤔
                                </div>

                                <!-- Equation -->
                                <div id="equation" class="font-bold mb-10 tracking-wider flex items-center justify-center text-6xl text-gray-400 w-full" style="font-size: clamp(3rem, 10vw, 6rem);">
                                    <span class="animate-pulse">⏳</span>
                                </div>

                                <!-- Inputs -->
                                <div id="answerContainer" class="w-full max-w-sm mb-8">
                                    <input type="number" id="answerField" autofocus placeholder="?"
                                           class="candy-input-answer text-5xl" disabled>
                                </div>

                                <div id="fractionAnswerContainer" class="w-full max-w-sm mb-8 hidden">
                                    <div class="flex flex-col items-center gap-2">
                                         <input type="number" id="numerField" placeholder="?"
                                                class="candy-input-answer text-6xl w-40 py-4 text-center" 
                                                style="border-bottom: 8px solid var(--text-dark); border-radius: 20px 20px 0 0; background: white;">
                                         <input type="number" id="denomField" placeholder="?"
                                                class="candy-input-answer text-6xl w-40 py-4 text-center" 
                                                style="border-radius: 0 0 20px 20px; background: white;">
                                    </div>
                                </div>

                                <!-- Submit btn -->
                                <button id="submitBtn" onclick="submitAnswer()" class="candy-btn candy-btn-primary w-full max-w-sm py-6 text-3xl" disabled>
                                    ¡Listo! 🍬
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Feedback overlay -->
                <div id="feedback" class="fixed inset-0 pointer-events-none flex items-center justify-center z-50 transition-all duration-300 opacity-0 scale-50">
                    <div class="text-[10rem]"></div>
                </div>
            </div>
        `,

        rewards: () => `
            <div class="min-h-screen p-8">
                <div class="max-w-5xl mx-auto">
                    <!-- Header -->
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-12 animate-slide-down">
                        <div>
                            <h2 class="text-5xl font-bold drop-shadow-md" style="color: var(--primary); text-shadow: 2px 2px 0 rgba(0,0,0,0.15);">🎁 Bazár Mágico</h2>
                            <p class="font-medium mt-1" style="color: var(--secondary); text-shadow: 1px 1px 0 rgba(0,0,0,0.2);">¡Gasta tus monedas en tesoros increíbles!</p>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="candy-card px-6 py-3 flex items-center gap-3">
                                <img src="assets/img/coin.gif" width="32" height="32" class="inline-block" alt="Moneda">
                                <span class="text-2xl font-bold" style="color: hsl(35,100%,45%)">${state.activeChild.coins}</span>
                            </div>
                            <button onclick="render('levelMap')" class="candy-btn candy-btn-secondary px-7 py-3">Volver ←</button>
                        </div>
                    </div>

                    <!-- Grid -->
                    <div id="rewardsGrid" class="grid grid-cols-1 md:grid-cols-2 gap-10 stagger">
                        <div class="text-center col-span-full py-16">
                            <div class="text-6xl mb-4 floating">✨</div>
                            <p class="font-bold text-xl animate-pulse" style="color: var(--purple)">Cargando tesoros mágicos...</p>
                        </div>
                    </div>
                </div>
            </div>
        `,

        dashboard: () => `
            <div class="min-h-screen p-8">
                <div class="max-w-6xl mx-auto">
                    <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 animate-slide-down">
                        <div>
                            <h2 class="text-4xl font-bold drop-shadow-md" style="color: var(--primary); text-shadow: 2px 2px 0 rgba(0,0,0,0.15);">📊 Centro de Mando</h2>
                            <p class="font-medium" style="color: var(--secondary); text-shadow: 1px 1px 0 rgba(0,0,0,0.2);">Progreso y estadísticas detalladas</p>
                        </div>
                        <div class="flex flex-wrap items-center gap-3">
                            <select id="dashChildSelect" onchange="updateDashboard(this.value)" class="candy-input" style="border-radius: var(--radius-full); padding: 0.6rem 1.5rem; font-weight: 700; font-size: 1rem;">
                                ${state.children.map(c => `<option value="${c.id}">${c.id == state.activeChild.id ? '\uD83D\uDCCD ' : ''}${c.name}</option>`).join('')}
                            </select>
                            <button onclick="render('levelMap')" class="candy-btn candy-btn-secondary px-7 py-2">Volver ←</button>
                        </div>
                    </header>

                    <div id="dashStats" class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 stagger">
                        <!-- Stats cards populated by JS -->
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                        <div class="candy-card p-8 flex flex-col">
                            <h4 class="text-xl font-bold mb-6" style="color: var(--text-dark)">📈 Desempeño Semanal (Aciertos)</h4>
                            <div class="w-full h-[300px] flex justify-center overflow-hidden flex-1">
                                <canvas id="performanceChart"></canvas>
                            </div>
                        </div>
                        <div class="candy-card p-8 flex flex-col">
                            <h4 class="text-xl font-bold mb-6" style="color: var(--text-dark)">🎯 Balance de Aciertos y Fallas</h4>
                            <div class="w-full h-[300px] flex justify-center overflow-hidden flex-1">
                                <canvas id="hitsChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                        <div class="candy-card p-8 flex flex-col">
                            <h4 class="text-xl font-bold mb-6" style="color: var(--text-dark)">🔍 Diagnóstico por Tema</h4>
                            <div class="w-full h-[300px] flex justify-center overflow-hidden flex-1">
                                <canvas id="diagChartChild"></canvas>
                            </div>
                        </div>
                        <div class="candy-card p-8 border-orange-500/20" style="background: linear-gradient(135deg, rgba(251, 146, 60, 0.05), transparent);">
                            <h4 class="text-xl font-bold mb-6 text-orange-600 flex items-center gap-2"><span>🚨</span> Áreas Críticas</h4>
                            <div id="criticalAreasChild" class="space-y-4">
                                <p class="text-sm text-slate-400 italic">Analizando debilidades...</p>
                            </div>
                        </div>
                    </div>

                    <div class="candy-card p-8 mb-10">
                        <h4 class="text-xl font-bold mb-6" style="color: var(--text-dark)">📊 Historial de Actividad y Progresos</h4>
                        <div class="overflow-x-auto">
                            <table class="w-full text-left">
                                <thead>
                                    <tr style="border-bottom: 2px solid rgba(0,0,0,0.06)">
                                        <th class="pb-4 font-bold uppercase text-xs" style="color: var(--text-light)">Acción</th>
                                        <th class="pb-4 font-bold uppercase text-xs" style="color: var(--text-light)">Detalle</th>
                                        <th class="pb-4 font-bold uppercase text-xs" style="color: var(--text-light)">Fecha/Hora</th>
                                    </tr>
                                </thead>
                                <tbody id="auditLogsBody" class="text-sm">
                                    <!-- Populated by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `,

        adminDashboard: () => `
            <div class="flex h-screen bg-slate-900 overflow-hidden font-sans text-slate-200">
                <!-- Sidebar -->
                <aside class="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
                    <div class="p-8">
                        <h2 class="text-xl font-bold text-white flex items-center gap-3">
                            <span class="bg-blue-600 p-2 rounded-lg shadow-lg">🛡️</span>
                            <span>System <br/><small class="text-blue-400 opacity-80 uppercase tracking-widest text-[10px]">Administrator</small></span>
                        </h2>
                    </div>
                    
                    <nav class="flex-1 px-4 space-y-1 mt-6">
                        <button onclick="changeAdminTab('general')" class="admin-nav-btn active" id="btn-admin-general">
                            <span class="text-xl">📊</span> <span>Resumen General</span>
                        </button>
                        <button onclick="changeAdminTab('users')" class="admin-nav-btn" id="btn-admin-users">
                            <span class="text-xl">👥</span> <span>Gestión de Padres</span>
                        </button>
                        <button onclick="changeAdminTab('logs')" class="admin-nav-btn" id="btn-admin-logs">
                            <span class="text-xl">📋</span> <span>Bitácora Maestra</span>
                        </button>
                        <div class="pt-4 pb-2 px-4 uppercase text-[10px] font-bold text-slate-500 tracking-widest">Configuración</div>
                        <button onclick="changeAdminTab('config')" class="admin-nav-btn" id="btn-admin-config">
                            <span class="text-xl">⚙️</span> <span>Ajustes Globales</span>
                        </button>
                    </nav>

                    <div class="p-4 border-t border-slate-700">
                        <div class="flex items-center gap-3 px-4 py-3 mb-4 bg-slate-900/50 rounded-xl">
                            <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">A</div>
                            <div class="overflow-hidden">
                                <p class="text-xs font-bold truncate">${state.user.email}</p>
                                <p class="text-[10px] text-blue-400 capitalize">${state.user.role}</p>
                            </div>
                        </div>
                        <button onclick="logout()" class="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-xl transition-all font-bold text-sm">
                            <span class="text-lg">🚪</span> Salir del Sistema
                        </button>
                    </div>
                </aside>

                <!-- Main Content -->
                <main class="flex-1 overflow-y-auto p-10 bg-slate-900">
                    <div id="adminContent" class="max-w-6xl mx-auto animate-slide-up">
                        <!-- Content loaded by changeAdminTab -->
                        <div class="flex items-center justify-center h-full opacity-50">
                            <div class="text-center">
                                <div class="animate-spin text-4xl mb-4">⌛</div>
                                <p>Cargando panel...</p>
                            </div>
                        </div>
                    </div>
                </main>

                <style>
                    .admin-nav-btn {
                        width: 100%;
                        display: flex;
                        items-center: center;
                        gap: 12px;
                        padding: 12px 16px;
                        border-radius: 12px;
                        transition: all 0.2s;
                        font-weight: 600;
                        font-size: 0.875rem;
                        color: #94a3b8;
                    }
                    .admin-nav-btn:hover {
                        background-color: #334155;
                        color: #f8fafc;
                    }
                    .admin-nav-btn.active {
                        background-color: #2563eb;
                        color: #ffffff;
                        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
                    }
                    .admin-card {
                        background-color: #1e293b;
                        border: 1px solid #334155;
                        border-radius: 20px;
                        padding: 24px;
                    }
                    .admin-stat-card {
                        background: linear-gradient(135deg, #1e293b, #0f172a);
                        border: 1px solid #334155;
                        border-radius: 16px;
                        padding: 20px;
                    }
                </style>
            </div>
        `
    };

    // Render Function
    window.render = function (viewName) {
        return new Promise(resolve => {
            const app = document.getElementById('app');
            const loader = document.getElementById('loader');

            loader.classList.remove('opacity-0');
            loader.style.pointerEvents = 'all';

            setTimeout(() => {
                app.innerHTML = views[viewName]();
                state.view = viewName;
                attachListeners();
                loader.classList.add('opacity-0');
                loader.style.pointerEvents = 'none';
                resolve();
            }, 300);
        });
    }

    function attachListeners() {
        if (state.view === 'pvpArena') {
            initPvpMode();
        }
        if (state.view === 'login') {
            document.getElementById('loginForm').onsubmit = handleLogin;
        }
        if (state.view === 'register') {
            document.getElementById('registerForm').onsubmit = handleRegister;
        }
        if (state.view === 'game') {
            document.getElementById('answerField').focus();
            document.getElementById('answerField').onkeypress = (e) => {
                if (e.key === 'Enter') submitAnswer();
            };
        }
        if (state.view === 'rewards') {
            loadRewards();
        }
        if (state.view === 'dashboard') {
            updateDashboard(document.getElementById('dashChildSelect').value);
        }
        if (state.view === 'adminDashboard') {
            loadAdminStats();
        }
        if (state.view === 'levelMap') {
            const player = document.getElementById('playerCharacter');
            const mapContainer = document.querySelector('.overflow-x-auto');
            if (player && state.activeChild && mapContainer) {
                const currentLevelId = Math.min(state.activeChild.current_level, 10);
                const levelData = state.levels.find(l => l.id === currentLevelId) || state.levels[0];
                
                player.style.transition = 'none';
                player.style.left = levelData.pos.x + '%';
                player.style.top = levelData.pos.y + '%';
                
                // Scroll the container so the player is roughly centered horizontally
                // Total width is min-width = 1200px.
                const mapWidth = 1200;
                const playerX_px = (levelData.pos.x / 100) * mapWidth;
                const containerWidth = mapContainer.clientWidth;
                const scrollTarget = playerX_px - (containerWidth / 2);
                
                mapContainer.scrollLeft = Math.max(0, scrollTarget);

                // Drag-to-scroll
                let isDragging = false;
                let startX, scrollLeftStart;
                mapContainer.addEventListener('mousedown', (e) => {
                    isDragging = true;
                    startX = e.pageX - mapContainer.offsetLeft;
                    scrollLeftStart = mapContainer.scrollLeft;
                    mapContainer.style.cursor = 'grabbing';
                    mapContainer.style.userSelect = 'none';
                });
                mapContainer.addEventListener('mouseleave', () => {
                    isDragging = false;
                    mapContainer.style.cursor = 'grab';
                });
                mapContainer.addEventListener('mouseup', () => {
                    isDragging = false;
                    mapContainer.style.cursor = 'grab';
                });
                mapContainer.addEventListener('mousemove', (e) => {
                    if (!isDragging) return;
                    e.preventDefault();
                    const x = e.pageX - mapContainer.offsetLeft;
                    const walk = (x - startX) * 1.5;
                    mapContainer.scrollLeft = scrollLeftStart - walk;
                });
            }
        }
    }

    // --- Actions ---

    async function handleLogin(e) {
        playSound('click');
        e.preventDefault();
        const btn = document.getElementById('loginBtn');
        btn.disabled = true;
        btn.innerText = 'Cargando...';

        const formData = new FormData(e.target);
        try {
            const res = await fetch('api/auth.php?action=login', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (data.success) {
                state.user = data.user;
                state.children = data.children;
                await fetchGlobalSettings();
                
                if (state.user.role === 'admin') {
                    render('adminDashboard');
                } else {
                    render('profileSelection');
                }
                playSound('bgm');
            } else {
                playSound('wrong');
                Swal.fire('¡Ups!', data.error, 'error');
            }
        } catch (err) {
            Swal.fire('Error', 'Error al conectar con el servidor', 'error');
        } finally {
            btn.disabled = false;
            btn.innerText = '¡Entrar a Jugar! 🚀';
        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        const btn = document.getElementById('registerBtn');
        btn.disabled = true;
        btn.innerText = 'Registrando...';

        const formData = new FormData(e.target);
        try {
            const res = await fetch('api/auth.php?action=register', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (data.success) {
                Swal.fire('¡Bienvenido!', data.message, 'success');
                render('login');
            } else {
                Swal.fire('¡Ups!', data.error, 'error');
            }
        } catch (err) {
            Swal.fire('Error', 'Error al conectar con el servidor', 'error');
        } finally {
            btn.disabled = false;
            btn.innerText = 'Registrarse ✨';
        }
    }

    window.selectChild = (id) => {
        state.activeChild = state.children.find(c => c.id == id);
        localStorage.setItem('activeChildId', id);
        applyTheme(state.activeChild); // Apply theme on select
        render('levelMap');
    };

    window.addChildPrompt = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Nuevo Explorador',
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Nombre del niño">' +
                '<select id="swal-input2" class="swal2-input">' +
                '<option value="1">1er Grado</option>' +
                '<option value="2">2do Grado</option>' +
                '<option value="3">3er Grado</option>' +
                '</select>' +
                '<select id="swal-input3" class="swal2-input">' +
                '<option value="1">Avatar: Niño 👦</option>' +
                '<option value="2">Avatar: Niña 👧</option>' +
                '</select>',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value,
                    document.getElementById('swal-input3').value
                ]
            }
        });

        if (formValues) {
            const [name, grade, avatar_id] = formValues;
            if (!name) return Swal.fire('¡Ups!', 'El nombre es obligatorio', 'warning');

            const formData = new FormData();
            formData.append('name', name);
            formData.append('grade', grade);
            formData.append('avatar_id', avatar_id);

            try {
                const res = await fetch('api/add_child.php', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();

                if (data.success) {
                    state.children = data.children;
                    Swal.fire('¡Genial!', data.message, 'success');
                    render('profileSelection');
                } else {
                    Swal.fire('Error', data.error, 'error');
                }
            } catch (err) {
                Swal.fire('Error', 'No se pudo crear el perfil', 'error');
            }
        }
    };

    // --- Game Logic ---
    let gameData = {
        levelId: 0,
        currentQuestion: 1,
        correct: 0,
        total: 10,
        currentAnswer: 0,
        startTime: 0,
        timer: null,
        levelInfo: null,
        bossHp: 3,
        maxBossHp: 3
    };

    window.startLevel = async (levelId) => {
        try {
            // First, fetch the problem to get the story/boss metadata
            const res = await fetch(`api/generate_problem.php?level_id=${levelId}`);
            const data = await res.json();
            
            gameData.levelId = levelId;
            gameData.currentQuestion = 1;
            gameData.correct = 0;
            gameData.startTime = Date.now();
            gameData.levelInfo = data.level_info;
            gameData.maxBossHp = 3; // Fixed for now, last 3 questions
            gameData.bossHp = 3;

            const bossIconData = gameData.levelInfo.boss_icon || '👹';
            const bossDisplayBase = bossIconData.includes('.png') 
                ? `<img src="assets/img/bosses/${bossIconData}" class="w-24 h-24 mx-auto object-contain drop-shadow-md mb-2">`
                : `<span class="text-3xl">${bossIconData}</span>`;

            // Show Story Intro Modal
            await Swal.fire({
                title: '🏰 ¡Nueva Aventura!',
                html: `
                    <div class="text-center p-4">
                        <div class="text-6xl mb-4 animate-bounce-in">📖</div>
                        <p class="text-lg font-medium leading-relaxed" style="color: var(--text-dark)">${gameData.levelInfo.story_intro || '¡Tu viaje continúa!'}</p>
                        <div class="mt-6 p-4 bg-red-100 rounded-xl border-2 border-red-200">
                             <p class="text-[10px] font-black uppercase text-red-500 tracking-widest mb-1">Cuidado con el Jefe</p>
                             <div class="flex items-center justify-center gap-3">
                                ${bossDisplayBase}
                                <span class="font-black text-slate-800">${gameData.levelInfo.boss_name || 'Desconocido'}</span>
                             </div>
                        </div>
                    </div>
                `,
                confirmButtonText: '¡ACEPTAR EL RETO! ⚔️',
                confirmButtonColor: 'var(--primary)',
                background: '#fff url(assets/img/adventure/modal_bg.png)',
                showClass: { popup: 'animate__animated animate__zoomIn' },
                hideClass: { popup: 'animate__animated animate__zoomOut' }
            });

            await render('game');
            // We already have the data for the first question
            processQuestionData(data);
        } catch (err) {
            Swal.fire('Error', 'No se pudo iniciar el nivel', 'error');
        }
    };

    function processQuestionData(data) {
        gameData.currentAnswer = data.answer;
        gameData.total = data.total_questions || 10;
        document.getElementById('questionCounter').innerText = `${gameData.currentQuestion} / ${gameData.total}`;

        // Show Boss area immediately if it's a boss level
        if (gameData.levelInfo.boss_name) {
            const bossArea = document.getElementById('bossArea');
            if (bossArea) {
                bossArea.classList.remove('hidden');
                document.getElementById('bossName').innerText = gameData.levelInfo.boss_name;
                
                const iconEl = document.getElementById('bossIcon');
                const bIcon = gameData.levelInfo.boss_icon || '👺';
                if (bIcon.includes('.png')) {
                    iconEl.innerHTML = `<img src="assets/img/bosses/${bIcon}" class="w-32 h-32 object-contain drop-shadow-lg" alt="Boss">`;
                    iconEl.classList.remove('text-5xl');
                } else {
                    iconEl.innerText = bIcon;
                    iconEl.classList.add('text-5xl');
                }
                updateBossUI();
                
                // Initial shout only on first question
                if (gameData.currentQuestion === 1) {
                    updateBossShout('start');
                }
            }
        }

        if (data.operator === 'fraccion') {
            document.getElementById('answerContainer').classList.add('hidden');
            document.getElementById('fractionAnswerContainer').classList.remove('hidden');
            document.getElementById('numerField').value = '';
            document.getElementById('denomField').value = '';
            document.getElementById('numerField').disabled = false;
            document.getElementById('denomField').disabled = false;
            document.getElementById('numerField').focus();
            
            document.getElementById('equation').innerHTML = renderFractionVisual(data.fraction_data);
        } else {
            document.getElementById('answerContainer').classList.remove('hidden');
            document.getElementById('fractionAnswerContainer').classList.add('hidden');
            document.getElementById('equation').innerText = `${data.n1} ${data.operator} ${data.n2}`;
            document.getElementById('equation').style.color = 'var(--text-dark)';
            document.getElementById('answerField').value = '';
            document.getElementById('answerField').disabled = false;
            document.getElementById('answerField').focus();
        }
        
        document.getElementById('submitBtn').disabled = false;
        startTimer();
    }

    function updateBossUI() {
        const hpBar = document.getElementById('bossHpBar');
        const hpText = document.getElementById('bossHpText');
        if (!hpBar || !hpText) return;

        const pct = (gameData.bossHp / gameData.maxBossHp) * 100;
        hpBar.style.width = `${pct}%`;
        hpText.innerText = `${gameData.bossHp} / ${gameData.maxBossHp}`;
    }

    function updateBossShout(type) {
        const bossShout = document.getElementById('bossShout');
        if (!bossShout || !gameData.levelInfo.boss_name) return;

        const phrases = {
            'Duende Sumón': {
                'start': ['¡Suma esto a tu derrota!', '¡Mis cálculos dicen que vas a perder!'],
                'correct': ['¡Argh! ¡Suerte de principiante!', '¡Eso fue fácil!'],
                'wrong': ['¡JAJAJA! ¡Ni siquiera estuviste cerca!', '¡Suma mal y llorarás!']
            },
            'Dragón Numérico': {
                'start': ['¡Mi fuego es tan caliente como estos números!', '¡RUAAAR! ¡Resuelve esto!'],
                'correct': ['¡Quemaste mis defensas!', '¡Inesperado!'],
                'wrong': ['¡Siente el calor del error!', '¡Demasiado lento para mis alas!']
            },
            'Mago Restador': {
                'start': ['¡Desapareceré tus puntos!', '¡Abra Kadabra! ¡Resta sin miedo!'],
                'correct': ['¡Mi truco falló!', '¡Imposible!'],
                'wrong': ['¡Puf! ¡Tus puntos se esfumaron!', '¡Menos es más... difícil para ti!']
            },
            'Reina Multiplicadora': {
                'start': ['¡Mis ejércitos se multiplican!', '¡Doble o nada, pequeño héroe!'],
                'correct': ['¡Dividiste mi poder!', '¡No puede ser!'],
                'wrong': ['¡Multiplica tu esfuerzo o perderás!', '¡Siete veces siete... y te vencí!']
            },
            'Chef Caos': {
                'start': ['¡Mi receta para el desastre te espera!', '¡Corta la pizza, no tus esperanzas!'],
                'correct': ['¡Quemaste mi pizza!', '¡Sabor amargo!'],
                'wrong': ['¡Media victoria no sirve de nada!', '¡Una pizca de duda y una porción de error!']
            }
        };

        const bossName = gameData.levelInfo.boss_name;
        const pool = phrases[bossName] ? phrases[bossName][type] : ['¡No podrás conmigo!', '¡Sigue intentando!', '¡JA!'];
        bossShout.innerText = pool[Math.floor(Math.random() * pool.length)];
    }

    async function nextQuestion() {
        if (gameData.currentQuestion > gameData.total) {
            finishGame();
            return;
        }

        try {
            document.getElementById('equation').innerHTML = '<span class="animate-pulse text-6xl text-gray-400 flex items-center justify-center">⏳</span>';
            document.getElementById('equation').style.color = '';
            document.getElementById('answerField').disabled = true;
            document.getElementById('submitBtn').disabled = true;

            const res = await fetch(`api/generate_problem.php?level_id=${gameData.levelId}`);
            const data = await res.json();

            processQuestionData(data);
        } catch (err) {
            Swal.fire('Error', 'Error al generar pregunta', 'error');
        }
    }

    function startTimer() {
        clearInterval(gameData.timer);
        const bar = document.getElementById('timerBar');
        const duration = parseInt(state.settings.game_timer_sec) || 20;

        bar.style.width = '100%';
        bar.style.transition = 'none';

        setTimeout(() => {
            bar.style.transition = `width ${duration}s linear`;
            bar.style.width = '0%';
        }, 10);

        gameData.timer = setTimeout(() => submitAnswer(true), duration * 1000);
    }

    window.submitAnswer = async (timeout = false) => {
        clearTimeout(gameData.timer);
        
        let isCorrect = false;
        if (!timeout) {
            if (typeof gameData.currentAnswer === 'object') {
                const uNumer = parseInt(document.getElementById('numerField').value);
                const uDenom = parseInt(document.getElementById('denomField').value);
                isCorrect = uNumer === gameData.currentAnswer.numer && uDenom === gameData.currentAnswer.denom;
            } else {
                const input = document.getElementById('answerField');
                const userAnswer = parseInt(input.value);
                isCorrect = userAnswer === gameData.currentAnswer;
            }
        }

        if (isCorrect) {
            playSound('correct');
            gameData.correct++;
            state.activeChild.coins += 5;
            document.getElementById('gameCoins').innerText = state.activeChild.coins;
            
            // Damage Boss if in boss level
            if (gameData.levelInfo.boss_name) {
                const bossThreshold = gameData.total - 2;
                if (gameData.currentQuestion >= bossThreshold) {
                    gameData.bossHp--;
                    updateBossUI();
                    const bossIcon = document.getElementById('bossIcon');
                    bossIcon.classList.add('animate-shake');
                    setTimeout(() => bossIcon.classList.remove('animate-shake'), 500);
                }
                updateBossShout('correct');
            }

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FF85A1', '#7BDFF2', '#F9F871']
            });
        } else {
            playSound('wrong');
            if (gameData.levelInfo.boss_name) {
                updateBossShout('wrong');
            }
        }

        showFeedback(isCorrect);

        setTimeout(() => {
            gameData.currentQuestion++;
            nextQuestion();
        }, 1000);
    }

    function getPizzaSlice(centerX, centerY, radius, startAngle, endAngle, isSelected) {
        const startRad = (Math.PI * (startAngle - 90)) / 180;
        const endRad = (Math.PI * (endAngle - 90)) / 180;
        const x1 = centerX + radius * Math.cos(startRad);
        const y1 = centerY + radius * Math.sin(startRad);
        const x2 = centerX + radius * Math.cos(endRad);
        const y2 = centerY + radius * Math.sin(endRad);
        
        const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
        
        if (!isSelected) {
            return `<path d="${pathData}" fill="rgba(0,0,0,0.03)" stroke="rgba(0,0,0,0.1)" stroke-width="1" />`;
        }

        // Selected slice: Pizza style
        // Cheese layer
        let slice = `<path d="${pathData}" fill="#FFD93D" stroke="#F1C40F" stroke-width="1" />`;
        
        // Toppings (Pepperoni)
        const midAngle = (startAngle + endAngle) / 2;
        const midRad = (Math.PI * (midAngle - 90)) / 180;
        const pDist = radius * 0.65;
        const px = centerX + pDist * Math.cos(midRad);
        const py = centerY + pDist * Math.sin(midRad);
        slice += `<circle cx="${px}" cy="${py}" r="${radius * 0.12}" fill="#D63031" />`;
        
        // Crust (thicker orange border on the outer edge)
        slice += `<path d="M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}" fill="none" stroke="#E67E22" stroke-width="${radius * 0.15}" stroke-linecap="round" />`;

        return slice;
    }

    function renderFractionVisual(data) {
        const { numer, denom, food } = data;
        const radius = 60;
        const centerX = 80;
        const centerY = 80;
        let paths = '';

        for (let i = 0; i < denom; i++) {
            const startAngle = (i * 360) / denom;
            const endAngle = ((i + 1) * 360) / denom;
            paths += getPizzaSlice(centerX, centerY, radius, startAngle, endAngle, i < numer);
        }

        return `
            <div class="flex flex-col items-center gap-4 animate-pop-in">
                <div class="candy-card p-3 mb-2 bg-orange-100 border-orange-200">
                    <h3 class="text-xl font-black text-orange-600 font-fredoka uppercase tracking-wider flex items-center gap-2">
                        <span>🍕</span> ¡Desafío de Pizza!
                    </h3>
                </div>
                <p class="text-sm font-bold text-slate-500 mb-2">¿Cuántas porciones de pizza hay en la caja?</p>
                <div class="relative w-48 h-48 mb-4 p-4 bg-[#FDF2E9] rounded-2xl border-4 border-[#E67E22] shadow-xl overflow-hidden">
                    <div class="absolute top-2 left-2 text-[8px] text-[#E67E22] font-black opacity-40">CANDY PIZZA CO.</div>
                    <svg viewBox="0 0 160 160" class="w-full h-full drop-shadow-md">
                        ${paths}
                    </svg>
                </div>
                </div>
            </div>
        `;
    }

    function showFeedback(correct) {
        const f = document.getElementById('feedback');
        f.innerText = correct ? '🌟' : '❌';
        f.classList.remove('opacity-0', 'scale-50');
        f.classList.add('opacity-100', 'scale-100');
        setTimeout(() => {
            f.classList.add('opacity-0', 'scale-50');
            f.classList.remove('opacity-100', 'scale-100');
        }, 800);
    }

    async function finishGame() {
        const timeTaken = Math.floor((Date.now() - gameData.startTime) / 1000);

        const formData = new FormData();
        formData.append('child_id', state.activeChild.id);
        formData.append('level_id', gameData.levelId);
        formData.append('score_correct', gameData.correct);
        formData.append('score_total', gameData.total);
        formData.append('time_sec', timeTaken);

        try {
            const res = await fetch('api/save_score.php', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            if (data.success) {
                if (data.passed && gameData.levelId == state.activeChild.current_level) {
                    state.activeChild.current_level++;
                }
                playSound('win');
                
                let winTitle = '¡Nivel Completado!';
                let winText = `Lograste ${gameData.correct} aciertos y ganaste ${data.coins_earned} monedas.`;

                if (gameData.bossHp <= 0) {
                    winTitle = '¡VICTORIA ÉPICA! 🏆';
                    winText = `¡Has derrotado al ${gameData.levelInfo.boss_name}! El reino está a salvo. Ganaste ${data.coins_earned} monedas.`;
                    confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
                }

                Swal.fire({
                    title: winTitle,
                    text: winText,
                    icon: 'success',
                    confirmButtonText: '¡Genial! 🍭',
                    background: '#fff url(assets/img/adventure/victory_bg.png)',
                });
                render('levelMap');
            }
        } catch (err) {
            Swal.fire('Error', 'Error al guardar progreso', 'error');
            render('levelMap');
        }
    }

    // --- Shop ---
    async function loadRewards() {
        const grid = document.getElementById('rewardsGrid');
        grid.innerHTML = `<div class="text-center col-span-full py-16">
            <div class="text-6xl mb-4 floating">✨</div>
            <p class="font-bold text-xl animate-pulse" style="color: var(--purple)">Cargando tesoros mágicos...</p>
        </div>`;

        try {
            const res = await fetch(`api/get_rewards.php?child_id=${state.activeChild.id}`);
            const data = await res.json();

            if (!data.success) throw new Error('Error de datos');

            const isAnyEquipped = state.activeChild.equipped_reward_id == null;
            const defaultCard = `
                <div class="reward-card p-6 text-center animate-slide-up" 
                     style="min-height: 550px; display: flex; flex-direction: column; justify-content: space-between; border: 4px dashed rgba(0,0,0,0.1); background: rgba(255,255,255,0.5);">
                    <div style="height: 400px; display:flex; justify-content:center; align-items:center;">
                        <span style="font-size: 8rem; filter: grayscale(1)">🧥</span>
                    </div>
                    <h4 class="font-bold mb-2">Estilo Normal</h4>
                    <p class="text-xs text-slate-400 mb-4">Vuelve al estilo original</p>
                    ${isAnyEquipped 
                        ? `<button disabled class="candy-btn w-full py-2" style="background: #ccc; color: white;">✅ Por Defecto</button>`
                        : `<button onclick="handleRewardAction(0, 0, true)" class="candy-btn candy-btn-secondary w-full py-2">Restaurar</button>`
                    }
                </div>
            `;

            grid.innerHTML = defaultCard + data.rewards.map((item, i) => {
                let btnHtml = '';
                const isEquipped = item.equipped == 1;
                const isOwned = item.owned == 1;
                const canAfford = state.activeChild.coins >= item.cost;

                if (isEquipped) {
                    btnHtml = `<button disabled class="candy-btn w-full py-2" style="background: linear-gradient(135deg, hsl(132,58%,48%), hsl(132,58%,38%)); color: white; cursor: default">✅ ¡Equipado!</button>`;
                } else if (isOwned) {
                    btnHtml = `<button onclick="handleRewardAction(${item.id}, ${item.cost}, true)" class="candy-btn candy-btn-accent w-full py-2">🎒 Equipar</button>`;
                } else {
                    btnHtml = `<button onclick="handleRewardAction(${item.id}, ${item.cost}, false)"
                        ${!canAfford ? 'disabled' : ''}
                        class="candy-btn ${!canAfford ? '' : 'candy-btn-primary'} w-full py-2"
                        style="${!canAfford ? 'background: rgba(0,0,0,0.08); color: var(--text-light); border-bottom-color: rgba(0,0,0,0.05);' : ''}">
                        ${!canAfford ? '🔒 Sin monedas' : '🛋 Comprar'}
                    </button>`;
                }

                // Determine if icon is emoji or image file
                let iconDisplay = item.icon;
                if (item.icon && (item.icon.includes('.png') || item.icon.includes('icon_'))) {
                    iconDisplay = `<img class="reward-icon-img" src="/software-educativo-matematicas/assets/img/icons/${item.icon}?v=3" alt="${item.name}" style="width: 400px; height: 400px; object-fit: contain; display:block; margin: 0 auto; filter: drop-shadow(0px 8px 14px rgba(0,0,0,0.4)); transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);">`;
                }

                return `
                <div class="reward-card p-6 text-center ${isEquipped ? 'equipped' : isOwned ? 'owned' : ''} ${state.activeChild.coins < item.cost && !isOwned ? 'opacity-60' : ''} animate-slide-up" style="animation-delay: ${i * 0.07}s; min-height: 550px; display: flex; flex-direction: column; justify-content: space-between; overflow: visible !important;">
                    <div style="position:relative; display:flex; justify-content:center; align-items:center; height: 400px; width: 100%; margin-bottom: 20px;"
                         onmouseover="let img = this.querySelector('.reward-icon-img'); if(img) img.style.transform='scale(1.05) translateY(-5px)'"
                         onmouseout="let img = this.querySelector('.reward-icon-img'); if(img) img.style.transform='scale(1) translateY(0)'">${iconDisplay}</div>
                    <h4 class="font-bold mb-2" style="color: hsl(220, 20%, 20%)">${item.name}</h4>
                    <div class="flex items-center justify-center gap-2 mb-5">
                        <img src="assets/img/coin.gif" width="22" height="22" class="inline-block" alt="Moneda">
                        <span class="font-bold" style="color: hsl(35,100%,45%)">${item.cost}</span>
                    </div>
                    ${btnHtml}
                </div>
            `}).join('');

        } catch (err) {
            grid.innerHTML = `
                        <div class="col-span-full text-center p-10 candy-card" style="border-color: hsla(0,80%,65%,0.3)">
                    <div class="text-5xl mb-4">🙈</div>
                    <p class="font-bold text-xl mb-4" style="color: var(--primary)">¡Oh no! Los tesoros se escondieron.</p>
                    <button onclick="loadRewards()" class="candy-btn candy-btn-secondary px-6 py-2">Intentar de nuevo</button>
                </div>
            `;
        }
    }

    // Unified Handler for Shop
    window.handleRewardAction = async (id, price, isOwned) => {
        if (isOwned) {
            // EQUIP LOGIC
            const formData = new FormData();
            formData.append('child_id', state.activeChild.id);
            formData.append('reward_id', id);

            try {
                const resEq = await fetch('api/equip_reward.php', { method: 'POST', body: formData });
                const dataEq = await resEq.json();

                if (dataEq.success) {
                    state.activeChild.equipped_reward_id = id;
                    state.activeChild.theme_class = dataEq.theme.theme_class;
                    state.activeChild.bgm_file = dataEq.theme.bgm_file;
                    state.activeChild.theme_icon = dataEq.theme.icon;
                    applyTheme(state.activeChild);
                    playSound('win');
                    Swal.fire('¡Equipado!', '¡Te has transformado! 🦸‍♂️', 'success');
                    loadRewards(); // Refresh UI
                } else {
                    Swal.fire('Error', dataEq.error, 'error');
                }
            } catch (err) { Swal.fire('Error', 'Conexión fallida', 'error'); }
        } else {
            // BUY LOGIC
            Swal.fire({
                title: '¿Comprar este artículo?',
                text: `Cuesta ${price} monedas.`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: '¡Sí, comprar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    buyReward(id, price);
                }
            });
        }
    };

    window.buyReward = async (id, price) => {
        const formData = new FormData();
        formData.append('child_id', state.activeChild.id);
        formData.append('reward_id', id);

        try {
            const res = await fetch('api/buy_reward.php', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.success) {
                state.activeChild.coins = data.new_balance;
                playSound('correct');
                Swal.fire('¡Comprado!', '¡Ahora puedes equiparlo! 🎒', 'success');
                loadRewards(); // Refresh UI
            } else {
                Swal.fire('Monedas insuficientes', data.error, 'warning');
            }
        } catch (err) { Swal.fire('Error', 'Error en la transacción', 'error'); }
    };

    // --- Dashboard ---
    window.updateDashboard = async (childId) => {
        try {
            const res = await fetch(`api/get_reports.php?child_id=${childId}`);
            const data = await res.json();

            // Stats
            const stats = data.stats || { avg_score: 0, avg_time: 0, current_coins: 0 };

            // Sync local state coins if available
            const localChild = state.children.find(c => c.id == childId);
            if (localChild && stats.current_coins !== undefined) {
                localChild.coins = stats.current_coins;
            }

            const avgScore = stats.avg_score || 0;
            const avgTime = stats.avg_time || 0;
            const currentCoins = localChild ? localChild.coins : (stats.current_coins || 0);

            document.getElementById('dashStats').innerHTML = `
                <div class="stat-card animate-slide-up">
                    <span class="stat-card-icon">🎯</span>
                    <p class="font-bold text-sm uppercase mb-1" style="color: var(--text-medium)">Aciertos Promedio</p>
                    <h3 class="text-5xl font-bold" style="background: linear-gradient(135deg, var(--primary), var(--purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${Math.round(avgScore * 100)}%</h3>
                </div>
                <div class="stat-card animate-slide-up" style="animation-delay: 0.1s">
                    <span class="stat-card-icon">⏱️</span>
                    <p class="font-bold text-sm uppercase mb-1" style="color: var(--text-medium)">Tiempo de Respuesta</p>
                    <h3 class="text-5xl font-bold" style="background: linear-gradient(135deg, var(--secondary), var(--candy-blue)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${parseFloat(avgTime).toFixed(1)}s</h3>
                </div>
                <div class="stat-card animate-slide-up" style="animation-delay: 0.2s">
                    <span class="stat-card-icon">&#x1F4B0;</span>
                    <p class="font-bold text-sm uppercase mb-1" style="color: var(--text-medium)">Monedas Totales</p>
                    <div class="flex items-center gap-3">
                        <img src="assets/img/coin.gif" width="36" height="36" class="inline-block" alt="Moneda">
                        <h3 class="text-5xl font-bold" style="color: hsl(35,100%,45%)">${currentCoins}</h3>
                    </div>
                </div>
            `;

            // Logs
            const safeLogs = Array.isArray(data.logs) ? data.logs : [];
            document.getElementById('auditLogsBody').innerHTML = safeLogs.map(log => `
                <tr style="border-bottom: 1px solid rgba(0,0,0,0.04)">
                    <td class="py-3 font-bold" style="color: var(--primary)">${log.action_type || 'Acción'}</td>
                    <td class="py-3" style="color: var(--text-medium)">${log.details || ''}</td>
                    <td class="py-3 font-mono text-xs" style="color: var(--text-light)">${log.timestamp || '--'}</td>
                </tr>
            `).join('');

            // Charts
            const history = Array.isArray(data.history) ? data.history : [];
            initPerformanceChart(history);
            initHitsChart(stats.total_hits || 0, stats.total_errors || 0);

            // Diagnostics & Critical Areas
            const diagnostics = Array.isArray(data.diagnostics) ? data.diagnostics : [];
            initDiagChartChild(diagnostics);
            renderCriticalAreasChild(diagnostics);

        } catch (err) {
            console.error('Error dashboard:', err);
            const ds = document.getElementById('dashStats');
            if (ds) ds.innerHTML = '<div class="col-span-full text-center p-8 text-red-500 font-bold">Error de conexión al obtener datos.</div>';
        }
    };

    let performanceChart = null;
    let hitsChart = null;

    function initPerformanceChart(history) {
        const ctx = document.getElementById('performanceChart').getContext('2d');
        if (performanceChart) performanceChart.destroy();

        // Create gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, 280);
        gradient.addColorStop(0, 'hsla(344,100%,70%,0.4)');
        gradient.addColorStop(1, 'hsla(344,100%,70%,0.01)');

        performanceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: history.length ? history.map(h => h.date) : ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
                datasets: [{
                    label: 'Aciertos',
                    data: history.length ? history.map(h => h.avg_correct) : [0, 0, 0, 0, 0],
                    borderColor: 'hsl(344,100%,65%)',
                    backgroundColor: gradient,
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: 'hsl(344,100%,65%)',
                    pointBorderColor: 'white',
                    pointBorderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 9
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        titleColor: 'hsl(344,100%,60%)',
                        bodyColor: '#555',
                        borderColor: 'rgba(0,0,0,0.08)',
                        borderWidth: 1,
                        cornerRadius: 12,
                        padding: 10
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 10,
                        ticks: { stepSize: 2, color: '#aaa', font: { family: 'Fredoka', size: 13 } },
                        grid: { color: 'rgba(0,0,0,0.04)' }
                    },
                    x: {
                        ticks: { color: '#aaa', font: { family: 'Fredoka', size: 13 } },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    function initHitsChart(hits, errors) {
        const ctx = document.getElementById('hitsChart').getContext('2d');
        if (hitsChart) hitsChart.destroy();

        const total = hits + errors;
        const hitsPercent = total > 0 ? Math.round((hits / total) * 100) : 0;

        hitsChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Aciertos', 'Fallas'],
                datasets: [{
                    data: [hits, errors],
                    backgroundColor: [
                        'hsl(150, 80%, 45%)', // Green for hits
                        'hsl(0, 80%, 65%)'    // Red for errors
                    ],
                    borderWidth: 5,
                    borderColor: '#ffffff',
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { family: 'Fredoka', size: 14, weight: 'bold' },
                            padding: 20,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        titleColor: '#333',
                        bodyColor: '#666',
                        borderColor: 'rgba(0,0,0,0.1)',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 12,
                        callbacks: {
                            label: function(context) {
                                const val = context.raw;
                                const pct = total > 0 ? Math.round((val / total) * 100) : 0;
                                return ` ${context.label}: ${val} (${pct}%)`;
                            }
                        }
                    }
                }
            },
            plugins: [{
                id: 'centerText',
                afterDraw: (chart) => {
                    const { ctx, chartArea: { left, top, right, bottom } } = chart;
                    ctx.save();
                    ctx.font = 'bold 2rem Fredoka';
                    ctx.fillStyle = 'hsl(150, 80%, 35%)';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(hitsPercent + '%', (left + right) / 2, (top + bottom) / 2);
                    ctx.restore();
                }
            }]
        });
    }

    // --- Administrator Functions ---
    window.adminTab = 'general';

    window.changeAdminTab = (tab) => {
        window.adminTab = tab;
        document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`btn-admin-${tab}`).classList.add('active');
        renderAdminContent();
    };

    async function renderAdminContent() {
        const container = document.getElementById('adminContent');
        if (!container) return;

        if (window.adminTab === 'general') {
            container.innerHTML = `
                <div class="mb-10">
                    <h2 class="text-3xl font-bold mb-2">Visión General</h2>
                    <p class="text-slate-400">Estado global del ecosistema educativo</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div class="admin-stat-card">
                        <p class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Padres</p>
                        <h3 id="adminTotalUsers" class="text-3xl font-bold text-blue-400">--</h3>
                    </div>
                    <div class="admin-stat-card">
                        <p class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Estudiantes</p>
                        <h3 id="adminTotalChildren" class="text-3xl font-bold text-purple-400">--</h3>
                    </div>
                    <div class="admin-stat-card">
                        <p class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Sesiones</p>
                        <h3 id="adminTotalSessions" class="text-3xl font-bold text-green-400">--</h3>
                    </div>
                    <div class="admin-stat-card">
                        <p class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Rendimiento</p>
                        <h3 id="adminGlobalHits" class="text-3xl font-bold text-orange-400">--%</h3>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <div class="admin-card">
                        <h4 class="text-lg font-bold mb-6 flex items-center gap-2"><span>📊</span> Rendimiento Global</h4>
                        <div class="h-64">
                             <canvas id="adminGlobalPerformance"></canvas>
                        </div>
                    </div>
                    <div class="admin-card">
                        <h4 class="text-lg font-bold mb-6 flex items-center gap-2"><span>🔍</span> Diagnóstico por Tema</h4>
                        <div class="h-64">
                             <canvas id="adminDiagnosticChart"></canvas>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
                    <div class="xl:col-span-2 admin-card">
                        <h4 class="text-xl font-bold mb-6 flex items-center gap-2"><span>📈</span> Distribución de Progreso</h4>
                        <div id="levelDistChart" class="h-64 flex items-end gap-2 border-b border-slate-700 pb-2">
                            <p class="w-full text-center opacity-30 text-sm">Cargando distribución...</p>
                        </div>
                    </div>
                    <div class="admin-card border-orange-500/20 bg-orange-500/5">
                        <h4 class="text-xl font-bold mb-6 flex items-center gap-2 text-orange-400"><span>🚨</span> Áreas Críticas</h4>
                        <div id="criticalAreasList" class="space-y-4">
                            <p class="text-sm text-slate-500 italic">Analizando debilidades...</p>
                        </div>
                    </div>
                </div>
            `;
            const stats = await fetchAdminStats();
            if (stats) populateGeneralStats(stats);
        }

        if (window.adminTab === 'users') {
            container.innerHTML = `
                <div class="flex justify-between items-end mb-8">
                    <div>
                        <h2 class="text-3xl font-bold mb-2">Gestión de Padres</h2>
                        <p class="text-slate-400">Supervisión y control de cuentas de tutores</p>
                    </div>
                    <button onclick="createUserPrompt()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95">
                         ➕ Crear Nuevo Padre
                    </button>
                </div>

                <div class="admin-card">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead class="text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-700">
                                <tr>
                                    <th class="pb-4 px-2">Identificador (Email)</th>
                                    <th class="pb-4 text-center">Hijos</th>
                                    <th class="pb-4 text-center">Registrado</th>
                                    <th class="pb-4 text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody id="adminUsersTable" class="divide-y divide-slate-700/50">
                                <!-- Users by JS -->
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            const stats = await fetchAdminStats();
            if (stats) populateUsersTable(stats.users);
        }

        if (window.adminTab === 'logs') {
            container.innerHTML = `
                 <div class="mb-10">
                    <h2 class="text-3xl font-bold mb-2">Bitácora Maestra</h2>
                    <p class="text-slate-400">Monitoreo de actividad del sistema en tiempo real</p>
                </div>
                <div class="admin-card max-h-[70vh] overflow-y-auto space-y-3" id="adminMasterLogs">
                    <!-- Logs by JS -->
                    <p class="text-center opacity-30">Cargando bitácora...</p>
                </div>
            `;
            const stats = await fetchAdminStats();
            if (stats) populateMasterLogs(stats.logs);
        }

        if (window.adminTab === 'config') {
            container.innerHTML = `
                 <div class="mb-10">
                    <h2 class="text-3xl font-bold mb-2">Ajustes Globales</h2>
                    <p class="text-slate-400">Parámetros operativos críticos del sistema</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="admin-card">
                        <h4 class="text-lg font-bold mb-4 flex items-center gap-2"><span>⏱️</span> Tiempos de Juego</h4>
                        <div class="space-y-4">
                            <div>
                                <label class="text-xs text-slate-500 font-bold uppercase">Segundos por pregunta</label>
                                <input type="number" id="cfg-timer" value="${state.settings.game_timer_sec}" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white mt-1">
                                <p class="text-[10px] text-slate-500 mt-2">Dificultad base. Recomendado: 15-30s.</p>
                            </div>
                        </div>
                    </div>
                    <div class="admin-card">
                        <h4 class="text-lg font-bold mb-4 flex items-center gap-2"><span>💰</span> Economía (Premios)</h4>
                        <div class="space-y-4">
                            <div>
                                <label class="text-xs text-slate-500 font-bold uppercase">Precio Base Recompensas</label>
                                <input type="number" id="cfg-rewards" value="${state.settings.base_reward_price}" class="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white mt-1">
                                <p class="text-[10px] text-slate-500 mt-2">Monedas necesarias para canjear un premio.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-10 flex justify-end">
                    <button onclick="saveGlobalSettings()" class="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 flex items-center gap-3">
                        💾 Guardar Ajustes Globales
                    </button>
                </div>
            `;
        }
    }

    async function fetchGlobalSettings() {
        try {
            const res = await fetch('api/admin_actions.php?action=get_settings');
            const data = await res.json();
            if (data.success) {
                state.settings = { ...state.settings, ...data.settings };
            }
        } catch (err) {
            console.error('Error fetching settings:', err);
        }
    }

    window.saveGlobalSettings = async () => {
        const timer = document.getElementById('cfg-timer').value;
        const rewards = document.getElementById('cfg-rewards').value;

        const formData = new FormData();
        formData.append('settings[game_timer_sec]', timer);
        formData.append('settings[base_reward_price]', rewards);

        try {
            const res = await fetch('api/admin_actions.php?action=update_settings', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                Swal.fire('Éxito', 'Configuración guardada correctamente', 'success');
                await fetchGlobalSettings();
            } else {
                Swal.fire('Error', data.error, 'error');
            }
        } catch (err) {
            Swal.fire('Error', 'Error al guardar configuración', 'error');
        }
    };

    async function fetchAdminStats() {
        try {
            const res = await fetch('api/get_admin_stats.php');
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            return data;
        } catch (err) {
            console.error('Admin Error:', err);
            return null;
        }
    }

    function populateGeneralStats(data) {
        document.getElementById('adminTotalUsers').innerText = data.totals.users;
        document.getElementById('adminTotalChildren').innerText = data.totals.children;
        document.getElementById('adminTotalSessions').innerText = data.totals.sessions;
        
        const p = data.performance;
        const total = parseInt(p.hits) + parseInt(p.errors);
        const pct = total > 0 ? Math.round((p.hits / total) * 100) : 0;
        document.getElementById('adminGlobalHits').innerText = pct + '%';

        // Level distribution bars
        const distContainer = document.getElementById('levelDistChart');
        if (distContainer) {
            const max = Math.max(...data.level_distribution.map(d => parseInt(d.count)), 1);
            distContainer.innerHTML = data.level_distribution.map(d => `
                <div class="flex-1 flex flex-col items-center group relative">
                    <div class="text-[10px] font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">${d.count} exploradores</div>
                    <div class="w-full bg-blue-600 rounded-t-md transition-all duration-500 hover:bg-blue-400" style="height: ${(d.count / max) * 100}%"></div>
                    <div class="text-[9px] mt-2 font-bold text-slate-500">NIVEL ${d.current_level}</div>
                </div>
            `).join('');
        }

        // Diagnostics and Critical Areas
        if (data.performance) initAdminGlobalChart(data.performance);
        if (data.diagnostics) {
            initDiagnosticChart(data.diagnostics);
            populateCriticalAreas(data.diagnostics);
        }
    }

    let adminGlobalChart = null;
    let adminDiagChart = null;

    function initAdminGlobalChart(perf) {
        const ctx = document.getElementById('adminGlobalPerformance');
        if (!ctx) return;
        if (adminGlobalChart) adminGlobalChart.destroy();
        adminGlobalChart = new Chart(ctx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Aciertos', 'Fallas'],
                datasets: [{
                    data: [perf.hits, perf.errors],
                    backgroundColor: ['#10b981', '#ef4444'],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: '#94a3b8', font: { weight: 'bold' } } }
                },
                cutout: '70%'
            }
        });
    }

    function initDiagnosticChart(diagnostics) {
        const ctx = document.getElementById('adminDiagnosticChart');
        if (!ctx) return;
        if (adminDiagChart) adminDiagChart.destroy();

        const labels = diagnostics.map(d => {
            const level = state.levels.find(l => l.id == d.level_id);
            return level ? level.name.split(' ')[0] + ' ' + (level.name.split(' ')[1] || '') : `Nivel ${d.level_id}`;
        });

        adminDiagChart = new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Aciertos',
                        data: diagnostics.map(d => d.total_hits),
                        backgroundColor: '#10b981',
                        borderRadius: 6,
                    },
                    {
                        label: 'Fallas',
                        data: diagnostics.map(d => d.total_errors),
                        backgroundColor: '#ef4444',
                        borderRadius: 6,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { stacked: true, grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 10 } } },
                    y: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: '#1e293b',
                        titleColor: '#f8fafc',
                        bodyColor: '#cbd5e1'
                    }
                }
            }
        });
    }

    function populateCriticalAreas(diagnostics) {
        const container = document.getElementById('criticalAreasList');
        if (!container) return;

        const analyzed = diagnostics.map(d => {
            const total = parseInt(d.total_hits) + parseInt(d.total_errors);
            const errorRate = total > 0 ? (d.total_errors / total) * 100 : 0;
            const level = state.levels.find(l => l.id == d.level_id);
            return {
                id: d.level_id,
                name: level ? level.name : `Nivel ${d.level_id}`,
                errorRate: errorRate,
                total: total
            };
        }).filter(a => a.total > 0 && a.errorRate > 20)
          .sort((a,b) => b.errorRate - a.errorRate)
          .slice(0, 3);

        if (analyzed.length === 0) {
            container.innerHTML = `
                <div class="text-center py-6">
                    <div class="text-3xl mb-2">⭐</div>
                    <p class="text-sm text-green-400 font-bold">¡Buen trabajo!</p>
                    <p class="text-[10px] text-slate-500">No se detectan áreas críticas de atención inmediata.</p>
                </div>
            `;
            return;
        }

        const adviceMap = {
            'Suma': 'Reforzar el concepto de agrupación y el valor posicional con bloques base diez.',
            'Resta': 'Practicar la recta numérica y el concepto de "quitar" con objetos físicos.',
            'Reloj': 'Usar relojes analógicos manipulables y asociar horas con rutinas diarias.',
            'Fracción': 'Utilizar regletas de colores o círculos de fracciones para visualizar partes-todo.',
            'Equiv': 'Realizar juegos de emparejamiento con diferentes representaciones de una misma cantidad.'
        };

        container.innerHTML = analyzed.map(a => {
            let advice = 'Revisar conceptos base de este nivel.';
            for (let [key, val] of Object.entries(adviceMap)) {
                if (a.name.includes(key)) { advice = val; break; }
            }

            return `
                <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                    <div class="flex justify-between items-start mb-2">
                        <h5 class="font-bold text-sm text-slate-200">${a.name}</h5>
                        <span class="text-[10px] bg-red-900/30 text-red-400 px-2 py-0.5 rounded-full border border-red-500/20">${Math.round(a.errorRate)}% falla</span>
                    </div>
                    <p class="text-[11px] text-slate-400 leading-relaxed">
                        <span class="text-orange-400 font-bold uppercase text-[9px]">Sugerencia:</span> ${advice}
                    </p>
                </div>
            `;
        }).join('');
    }

    function populateUsersTable(users) {
        const table = document.getElementById('adminUsersTable');
        if (!table) return;
        table.innerHTML = users.map(u => `
            <tr class="hover:bg-slate-800/30 transition-colors">
                <td class="py-5 px-2 font-bold text-slate-200">${u.email}</td>
                <td class="py-5 text-center"><span class="bg-blue-900/40 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold">${u.children_count}</span></td>
                <td class="py-5 text-center text-slate-500 text-xs">${new Date(u.created_at).toLocaleDateString()}</td>
                <td class="py-5 text-right">
                    <button onclick="deleteUser(${u.id}, '${u.email}')" class="text-red-400 hover:text-white p-2 hover:bg-red-900/40 rounded-lg transition-all text-xs font-bold">🗑️ Eliminar</button>
                </td>
            </tr>
        `).join('');
    }

    window.createUserPrompt = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Crear Nuevo Usuario (Padre)',
            html:
                '<input id="swal-email" class="swal2-input" placeholder="Email del padre">' +
                '<input id="swal-pass" type="password" class="swal2-input" placeholder="Contraseña">',
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-email').value,
                    document.getElementById('swal-pass').value
                ]
            }
        });

        if (formValues) {
            const [email, password] = formValues;
            if (!email || !password) return Swal.fire('Error', 'Todos los campos son obligatorios', 'error');

            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            try {
                const res = await fetch('api/admin_actions.php?action=create_user', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                if (data.success) {
                    Swal.fire('Creado', data.message, 'success');
                    renderAdminContent(); // Refresh users list
                } else {
                    Swal.fire('Error', data.error, 'error');
                }
            } catch (err) {
                Swal.fire('Error', 'Error al crear usuario', 'error');
            }
        }
    };

    window.deleteUser = async (id, email) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `Vas a eliminar la cuenta de: ${email}. Esto es irreversible.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            const formData = new FormData();
            formData.append('user_id', id);

            try {
                const res = await fetch('api/admin_actions.php?action=delete_user', {
                    method: 'POST',
                    body: formData
                });
                const data = await res.json();
                if (data.success) {
                    Swal.fire('Eliminado', data.message, 'success');
                    renderAdminContent();
                } else {
                    Swal.fire('Error', data.error, 'error');
                }
            } catch (err) {
                Swal.fire('Error', 'Error al eliminar usuario', 'error');
            }
        }
    };

    function populateMasterLogs(logs) {
        const logContainer = document.getElementById('adminMasterLogs');
        if (!logContainer) return;
        logContainer.innerHTML = logs.map(log => `
            <div class="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${log.action_type.includes('failed') ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}">
                    ${log.action_type.includes('login') ? '🔑' : (log.action_type.includes('registered') ? '📝' : '⚡')}
                </div>
                <div class="flex-1">
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-xs font-bold uppercase tracking-wider ${log.action_type.includes('failed') ? 'text-red-400' : 'text-blue-400'}">${log.action_type}</span>
                        <span class="text-[10px] text-slate-500 font-mono">${log.timestamp}</span>
                    </div>
                    <p class="text-sm text-slate-300">${log.details}</p>
                    <div class="text-[10px] text-slate-500 mt-2 font-medium">${log.email || 'Sistema'}</div>
                </div>
            </div>
        `).join('');
    }

    window.loadAdminStats = async () => {
        // Redirection to the new tab-based logic
        renderAdminContent();
    };

    window.logout = async () => {
        await fetch('api/auth.php?action=logout');
        localStorage.removeItem('activeChildId');
        location.reload();
    };

    async function checkSession() {
        try {
            const res = await fetch('api/auth.php?action=check');
            const data = await res.json();
            if (data.success) {
                state.user = data.user;
                state.children = data.children;
                await fetchGlobalSettings();

                if (state.user.role === 'admin') {
                    return render('adminDashboard');
                }

                const savedChildId = localStorage.getItem('activeChildId');
                if (savedChildId) {
                    state.activeChild = state.children.find(c => c.id == savedChildId);
                    if (state.activeChild) {
                        applyTheme(state.activeChild); // Restore theme on reload
                        return render('levelMap');
                    }
                }
                render('profileSelection');
            } else {
                render('login');
            }
        } catch (err) {
            render('login');
        }
    }

    let diagChartChild = null;
    function initDiagChartChild(diagnostics) {
        const ctxEl = document.getElementById('diagChartChild');
        if (!ctxEl) return;
        const ctx = ctxEl.getContext('2d');
        if (diagChartChild) diagChartChild.destroy();

        const labels = diagnostics.map(d => {
            const level = state.levels.find(l => l.id == d.level_id);
            return level ? level.name.split(' ')[0] + ' ' + (level.name.split(' ')[1] || '') : `Nivel ${d.level_id}`;
        });

        diagChartChild = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Aciertos',
                        data: diagnostics.map(d => d.total_hits),
                        backgroundColor: 'hsl(150, 80%, 45%)',
                        borderRadius: 8,
                    },
                    {
                        label: 'Fallas',
                        data: diagnostics.map(d => d.total_errors),
                        backgroundColor: 'hsl(0, 80%, 65%)',
                        borderRadius: 8,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { stacked: true, grid: { display: false }, ticks: { font: { family: 'Fredoka' } } },
                    y: { stacked: true, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { family: 'Fredoka' } } }
                },
                plugins: {
                    legend: { position: 'bottom', labels: { font: { family: 'Fredoka', weight: 'bold' } } }
                }
            }
        });
    }

    function renderCriticalAreasChild(diagnostics) {
        const container = document.getElementById('criticalAreasChild');
        if (!container) return;

        const analyzed = diagnostics.map(d => {
            const total = parseInt(d.total_hits) + parseInt(d.total_errors);
            const errorRate = total > 0 ? (d.total_errors / total) * 100 : 0;
            const level = state.levels.find(l => l.id == d.level_id);
            return {
                id: d.level_id,
                name: level ? level.name : `Nivel ${d.level_id}`,
                errorRate: errorRate,
                total: total
            };
        }).filter(a => a.total > 0 && a.errorRate > 20)
          .sort((a,b) => b.errorRate - a.errorRate)
          .slice(0, 3);

        if (analyzed.length === 0) {
            container.innerHTML = `
                <div class="text-center py-6">
                    <div class="text-4xl mb-2">⭐</div>
                    <p class="font-bold text-green-600">¡Todo va genial!</p>
                    <p class="text-xs text-slate-500">No se detectan debilidades importantes por ahora.</p>
                </div>
            `;
            return;
        }

        const adviceMap = {
            'Suma': 'Refuerza sumas con objetos reales o el ábaco.',
            'Resta': 'Usa la recta numérica para practicar los saltos hacia atrás.',
            'Reloj': 'Practica con un reloj de cartón moviendo las manecillas.',
            'Fracción': '¡Hora de la pizza! Cortar comida es genial para entender fracciones.',
            'Equiv': 'Busca diferentes formas de representar un mismo número.'
        };

        container.innerHTML = analyzed.map(a => {
            let advice = 'Repasar los conceptos de este nivel.';
            for (let [key, val] of Object.entries(adviceMap)) {
                if (a.name.includes(key)) { advice = val; break; }
            }

            return `
                <div class="p-4 rounded-2xl" style="background: rgba(255,255,255,0.4); border: 1px solid rgba(0,0,0,0.05)">
                    <div class="flex justify-between items-center mb-1">
                        <span class="font-bold text-sm" style="color: var(--text-dark)">${a.name}</span>
                        <span class="text-[10px] bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">${Math.round(a.errorRate)}% error</span>
                    </div>
                    <p class="text-[11px] leading-relaxed" style="color: var(--text-medium)">
                        <b class="text-orange-500">CONSEJO:</b> ${advice}
                    </p>
                </div>
            `;
        }).join('');
    }

    // --- PvP System ---
    let pvpState = {
        p1Hp: 5,
        p2Hp: 5,
        correctBtn: -1,
        active: false,
        p1Locked: false,
        p2Locked: false
    };

    window.initPvpMode = function() {
        pvpState = { p1Hp: 5, p2Hp: 5, correctBtn: -1, active: true, p1Locked: false, p2Locked: false };
        
        // Reset UI filters
        document.getElementById('pvpArea1').style.filter = 'none';
        document.getElementById('pvpArea2').style.filter = 'none';
        document.getElementById('pvpArea1').classList.remove('damage');
        document.getElementById('pvpArea2').classList.remove('damage');

        updatePvpUi();

        // BGM Change
        sounds.bgm.pause();
        const pvpAudioSrc = 'assets/sounds/bgm_pvp.mp3';
        if(sounds.bgm.src.indexOf('bgm_pvp') === -1) {
             sounds.bgm.src = pvpAudioSrc;
        }
        if(soundEnabled) {
            sounds.bgm.play().catch(e => console.log('BGM wait', e));
        }

        generatePvpProblem();
        
        // Remove old listener if any and add new
        document.removeEventListener('keydown', handlePvpKeydown);
        document.addEventListener('keydown', handlePvpKeydown);
    };

    window.exitPvpMode = function() {
        pvpState.active = false;
        document.removeEventListener('keydown', handlePvpKeydown);
        
        // Restore BGM based on equipped theme
        if (state.activeChild) {
             applyTheme(state.activeChild); 
        } else {
             sounds.bgm.src = 'assets/sounds/bgm.mp3';
             if(soundEnabled) sounds.bgm.play();
        }
        render('levelMap');
    };

    function updatePvpUi() {
        // Render Hearts P1
        let p1h = '';
        for(let i=0; i<5; i++) {
            p1h += `<span class="text-xl md:text-2xl filter drop-shadow-md transition-all duration-300 ${i < pvpState.p1Hp ? 'scale-100' : 'scale-50 opacity-20 grayscale'}">❤️</span>`;
        }
        document.getElementById('pvpHealth1').innerHTML = p1h;

        // Render Hearts P2
        let p2h = '';
        for(let i=0; i<5; i++) {
            p2h += `<span class="text-xl md:text-2xl filter drop-shadow-md transition-all duration-300 ${i < pvpState.p2Hp ? 'scale-100' : 'scale-50 opacity-20 grayscale'}">❤️</span>`;
        }
        document.getElementById('pvpHealth2').innerHTML = p2h;
    }

    function generatePvpProblem() {
        if(!pvpState.active) return;
        
        // Unlock players implicitly on new question (fair play)
        pvpState.p1Locked = false;
        pvpState.p2Locked = false;
        document.getElementById('pvpArea1').style.filter = 'none';
        document.getElementById('pvpArea2').style.filter = 'none';

        const isAddition = Math.random() > 0.5;
        const isMultiplication = Math.random() > 0.8;
        
        let n1, n2, correctAnswer, sign;

        if (isMultiplication) {
            n1 = Math.floor(Math.random() * 10) + 1;
            n2 = Math.floor(Math.random() * 10) + 1;
            correctAnswer = n1 * n2;
            sign = 'x';
        } else if (isAddition) {
            n1 = Math.floor(Math.random() * 20) + 1;
            n2 = Math.floor(Math.random() * 20) + 1;
            correctAnswer = n1 + n2;
            sign = '+';
        } else {
            n1 = Math.floor(Math.random() * 20) + 1;
            n2 = Math.floor(Math.random() * 20) + 1;
            const max = Math.max(n1, n2);
            const min = Math.min(n1, n2);
            n1 = max;
            n2 = min;
            correctAnswer = n1 - n2;
            sign = '-';
        }

        document.getElementById('pvpEquation').innerText = `${n1} ${sign} ${n2}`;
        
        // Generate options (1 correct, 2 wrong)
        let options = [correctAnswer];
        while(options.length < 3) {
             let variance = isMultiplication ? (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1) : (Math.floor(Math.random() * 10) - 5);
             let wrong = correctAnswer + variance;
             if(wrong !== correctAnswer && wrong >= 0 && !options.includes(wrong)) {
                 options.push(wrong);
             }
        }
        
        // Shuffle
        options.sort(() => Math.random() - 0.5);
        
        pvpState.correctBtn = options.indexOf(correctAnswer);
        
        // Assign to buttons
        for(let i=0; i<3; i++) {
            const btn1 = document.getElementById(`p1btn${i}`);
            const btn2 = document.getElementById(`p2btn${i}`);
            if(btn1) { btn1.innerText = options[i]; btn1.disabled = false; }
            if(btn2) { btn2.innerText = options[i]; btn2.disabled = false; }
        }
    }

    function handlePvpKeydown(e) {
        if(!pvpState.active) return;
        
        const key = e.key.toLowerCase();
        // P1: A, S, D
        if(!pvpState.p1Locked) {
             if(key === 'a') handlePvpAnswer(1, 0);
             else if(key === 's') handlePvpAnswer(1, 1);
             else if(key === 'd') handlePvpAnswer(1, 2);
        }
        
        // P2: J, K, L or ArrowLeft, ArrowDown, ArrowRight
        if(!pvpState.p2Locked) {
             if(key === 'j' || key === 'arrowleft') handlePvpAnswer(2, 0);
             else if(key === 'k' || key === 'arrowdown') handlePvpAnswer(2, 1);
             else if(key === 'l' || key === 'arrowright') handlePvpAnswer(2, 2);
        }
    }

    window.handlePvpAnswer = function(playerNum, btnIndex) {
        if(!pvpState.active) return;
        
        if (playerNum === 1 && pvpState.p1Locked) return;
        if (playerNum === 2 && pvpState.p2Locked) return;

        playSound('click'); // Quick feedback
        
        const isCorrect = (btnIndex === pvpState.correctBtn);

        if (isCorrect) {
            playSound('correct');
            // Deal damage to the OTHER player
            const targetPlayer = playerNum === 1 ? 2 : 1;
            dealPvpDamage(targetPlayer);
        } else {
            playSound('wrong');
            // Punish THIS player by locking them
            lockPvpPlayer(playerNum);
        }
    };

    function dealPvpDamage(targetPlayer) {
        if (targetPlayer === 1) pvpState.p1Hp--;
        else pvpState.p2Hp--;
        
        updatePvpUi();
        
        // Visual flash (CSS class defined implicitly in template)
        const area = document.getElementById(`pvpArea${targetPlayer}`);
        if(area) {
            area.classList.add('damage');
            setTimeout(() => area.classList.remove('damage'), 150);
        }

        if (pvpState.p1Hp <= 0 || pvpState.p2Hp <= 0) {
            const winner = targetPlayer === 1 ? 2 : 1;
            endPvpMatch(winner);
        } else {
            // Next problem immediately
            generatePvpProblem();
        }
    }

    function lockPvpPlayer(playerNum) {
        const area = document.getElementById(`pvpArea${playerNum}`);
        if(area) area.style.filter = 'grayscale(0.8) brightness(0.7)';
        
        if (playerNum === 1) pvpState.p1Locked = true;
        else pvpState.p2Locked = true;
        
        setTimeout(() => {
             if (playerNum === 1) pvpState.p1Locked = false;
             else pvpState.p2Locked = false;
             
             if(pvpState.active && area) {
                area.style.filter = 'none';
             }
        }, 1200); // 1.2 seconds penalty
    }

    function endPvpMatch(winnerId) {
        pvpState.active = false;
        playSound('win');
        
        if(window.confetti) {
             confetti({ particleCount: 200, spread: 360, origin: {y: 0.4} });
        }
        
        const winnerColor = winnerId === 1 ? 'text-blue-400' : 'text-red-500';
        document.getElementById('pvpEquation').innerHTML = `
            <div class="text-3xl md:text-5xl ${winnerColor} drop-shadow-lg mb-4 leading-tight">¡GANA JUGADOR ${winnerId}! 🎉</div>
            <button onclick="initPvpMode()" class="candy-btn candy-btn-primary px-8 py-3 text-2xl mt-4">Revancha ⚔️</button>
        `;
        
        // Disable all buttons
        for(let i=0; i<3; i++) {
            const btn1 = document.getElementById(`p1btn${i}`);
            const btn2 = document.getElementById(`p2btn${i}`);
            if(btn1) btn1.disabled = true;
            if(btn2) btn2.disabled = true;
        }
    }

    checkSession();
});

