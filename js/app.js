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

        // 1. Reset Classes (remove old themes)
        body.classList.remove('theme-hero', 'theme-space', 'theme-dino', 'theme-fantasy', 'theme-royal');

        // 2. Apply New Theme if equipped
        if (child.theme_class) {
            body.classList.add(child.theme_class);
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

            if (child.theme_class === 'theme-hero') {
                particleOptions = {
                    particles: {
                        number: { value: 40, density: { enable: true, area: 800 } },
                        color: { value: ["#FF6B6B", "#FF85A1", "#F9F871"] },
                        shape: { type: "circle" },
                        opacity: { value: 0.6, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
                        size: { value: { min: 3, max: 7 }, random: true },
                        move: { enable: true, speed: 2, direction: "top", random: true, outModes: "out" },
                        wobble: { enable: true, distance: 5, speed: 10 }
                    }
                };
            } else if (child.theme_class === 'theme-space') {
                particleOptions = {
                    particles: {
                        number: { value: 100, density: { enable: true, area: 800 } },
                        color: { value: "#ffffff" },
                        shape: { type: "circle" },
                        opacity: { value: { min: 0.1, max: 0.8 }, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
                        size: { value: { min: 1, max: 3 }, random: true },
                        links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 1 },
                        move: { enable: true, speed: 0.5, direction: "none", random: true, outModes: "out" }
                    },
                    interactivity: {
                        events: { onHover: { enable: true, mode: "grab" }, onClick: { enable: true, mode: "push" } },
                        modes: { grab: { distance: 140, links: { opacity: 0.5 } }, push: { quantity: 4 } }
                    }
                };
            } else if (child.theme_class === 'theme-dino') {
                particleOptions = {
                    particles: {
                        number: { value: 50, density: { enable: true, area: 800 } },
                        color: { value: ["#4ECDC4", "#FFD93D", "#6BCB77"] },
                        shape: { type: ["circle", "polygon"], options: { polygon: { sides: 5 } } },
                        opacity: { value: 0.5, random: true },
                        size: { value: { min: 4, max: 10 }, random: true },
                        move: { enable: true, speed: 1.5, direction: "bottom", random: true, outModes: "out" },
                        rotate: { value: { min: 0, max: 360 }, direction: "random", animation: { enable: true, speed: 5 } }
                    }
                };
            } else if (child.theme_class === 'theme-fantasy') {
                particleOptions = {
                    particles: {
                        number: { value: 60, density: { enable: true, area: 800 } },
                        color: { value: ["#B088F9", "#FF85A1", "#7BDFF2"] },
                        shape: { type: "star" },
                        opacity: { value: { min: 0.3, max: 0.9 }, random: true, anim: { enable: true, speed: 2, opacity_min: 0.1, sync: false } },
                        size: { value: { min: 2, max: 5 }, random: true },
                        move: { enable: true, speed: 1.2, direction: "none", random: true, outModes: "out" },
                        twinkle: { particles: { enable: true, color: "#ffffff", frequency: 0.05, opacity: 1 } }
                    }
                };
            } else if (child.theme_class === 'theme-royal') {
                particleOptions = {
                    particles: {
                        number: { value: 40, density: { enable: true, area: 800 } },
                        color: { value: "#F9F871" },
                        shape: { type: "polygon", options: { polygon: { sides: 6 } } },
                        opacity: { value: 0.7, random: true },
                        size: { value: { min: 3, max: 8 }, random: true },
                        move: { enable: true, speed: 2, direction: "bottom-right", random: true, outModes: "out" },
                        rotate: { value: { min: 0, max: 360 }, animation: { enable: true, speed: 8 } },
                        roll: { enable: true, speed: { min: 5, max: 15 }, darked: 0.3, lightened: 0.2 }
                    }
                };
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

    // Initial State
    const state = {
        user: null,
        activeChild: null,
        view: 'login',
        children: [],
        levels: [
            { id: 1, name: "Nivel 1" },
            { id: 2, name: "Nivel 2" },
            { id: 3, name: "Nivel 3" },
            { id: 4, name: "Nivel 4" },
            { id: 5, name: "Nivel 5" },
            { id: 6, name: "Nivel 6" }
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
                        <div class="text-6xl mb-3 floating">🧮</div>
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
                                    ${child.theme_icon ? child.theme_icon : (child.avatar_id == 2 ? '👧' : '👦')}
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
                    <div class="candy-card px-5 py-3 flex items-center gap-3">
                        <span class="text-3xl floating">${state.activeChild.theme_icon || (state.activeChild.avatar_id == 2 ? '👧' : '👦')}</span>
                        <div>
                            <p class="font-bold leading-tight" style="color: var(--text-dark)">${state.activeChild.name}</p>
                            <p class="text-xs font-bold uppercase" style="color: var(--secondary)">${state.activeChild.grade}\u00ba Grado</p>
                        </div>
                    </div>
                    <div class="candy-card px-5 py-3 flex items-center gap-2">
                        <img src="assets/img/coin.gif" width="32" height="32" class="inline-block animate-bounce-in" alt="Moneda">
                        <span id="mapCoins" class="text-2xl font-bold" style="color: hsl(35,100%,45%)">${state.activeChild.coins}</span>
                    </div>
                </header>

                <!-- Title -->
                <div class="text-center mb-10 animate-slide-down" style="animation-delay:0.1s">
                    <h2 class="text-4xl font-bold" style="background: linear-gradient(135deg, hsl(348,100%,60%), hsl(265,90%,68%)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">🗺️ Mapa de Aventuras</h2>
                    <p style="color: var(--text-medium)" class="font-medium">Completa niveles para desbloquear nuevas aventuras</p>
                </div>

                <!-- Level Grid -->
                <div class="max-w-4xl mx-auto">
                    <div class="candy-card p-10 relative overflow-hidden">
                        <!-- Decorative background grid -->
                        <div class="absolute inset-0 opacity-5 pointer-events-none" style="background-image: radial-gradient(hsl(175,65%,57%) 2px, transparent 2px); background-size: 32px 32px;"></div>

                        <div class="relative z-10 grid grid-cols-3 gap-x-8 gap-y-12 justify-items-center stagger">
                            ${state.levels.map((level, i) => {
            const isLocked = level.id > state.activeChild.current_level;
            const isCompleted = level.id < state.activeChild.current_level;
            const isActive = level.id === state.activeChild.current_level;
            let nodeClass, icon;

            if (isLocked) { nodeClass = 'level-node level-node-locked'; icon = '\uD83D\uDD12'; }
            else if (isCompleted) { nodeClass = 'level-node level-node-completed'; icon = '\u2705'; }
            else { nodeClass = 'level-node level-node-active'; icon = '\u2B50'; }

            return `
                                <div class="flex flex-col items-center gap-3 animate-slide-up">
                                    <button ${isLocked ? 'disabled' : ''}
                                        onclick="startLevel(${level.id})"
                                        class="${nodeClass}">
                                        ${icon}
                                    </button>
                                    <span class="text-sm font-bold" style="color: ${isCompleted ? 'var(--secondary)' : isActive ? 'var(--primary)' : 'var(--text-light)'}">
                                        Nivel ${level.id}
                                    </span>
                                </div>`;
        }).join('')}
                        </div>
                    </div>
                </div>

                <!-- Bottom Nav -->
                <nav class="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-sm bottom-nav p-2 flex justify-around">
                    <button class="nav-btn">\uD83D\uddFA\uFE0F<span>Mapa</span></button>
                    <button onclick="render('rewards')" class="nav-btn">\uD83C\uDF81<span>Premios</span></button>
                    <button onclick="render('dashboard')" class="nav-btn">\uD83D\udCCA<span>Panel</span></button>
                    <button onclick="render('profileSelection')" class="nav-btn">\uD83D\uDC65<span>Perfil</span></button>
                    <button onclick="logout()" class="nav-btn">\uD83D\uDEAA<span>Salir</span></button>
                </nav>
            </div>
        `,

        game: () => `
            <div class="min-h-screen p-4 pb-8">
                <!-- Top Bar -->
                <div class="max-w-2xl mx-auto flex justify-between items-center mb-6 animate-slide-down">
                    <button onclick="render('levelMap')" class="candy-btn candy-btn-secondary px-5 py-2">
                        ← Escapar
                    </button>
                    <div class="candy-card px-6 py-2">
                        <span class="text-2xl font-bold" style="color: var(--primary)" id="questionCounter">1 / 10</span>
                    </div>
                    <div class="candy-card px-5 py-2 flex items-center gap-2">
                        <img src="assets/img/coin.gif" width="28" height="28" class="inline-block" alt="Moneda">
                        <span id="gameCoins" class="text-xl font-bold" style="color: hsl(35,100%,45%)">${state.activeChild.coins}</span>
                    </div>
                </div>

                <!-- Timer Bar -->
                <div class="max-w-2xl mx-auto mb-8 progress-bar-track" style="height: 14px;">
                    <div id="timerBar" class="progress-bar-fill" style="height: 100%; width: 100%;"></div>
                </div>

                <!-- Game Card -->
                <div class="max-w-2xl mx-auto candy-card p-12 text-center relative overflow-visible animate-bounce-in">
                    <!-- Emoji mascot on top -->
                    <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center text-5xl border-4 border-white"
                         style="background: linear-gradient(135deg, hsl(52,94%,72%), hsl(45,100%,62%)); box-shadow: 0 6px 0 hsl(45,100%,50%), 0 10px 25px hsla(52,94%,60%,0.4); animation: floating 2.5s ease-in-out infinite">
                        🤔
                    </div>

                    <!-- Equation -->
                    <div id="equation" class="font-bold my-12 tracking-wider flex items-center justify-center text-6xl text-gray-400" style="font-size: clamp(3rem, 10vw, 6rem);">
                        <span class="animate-pulse">⏳</span>
                    </div>

                    <!-- Answer Field -->
                    <div class="max-w-xs mx-auto mb-8">
                        <input type="number" id="answerField" autofocus placeholder="?"
                               class="candy-input-answer" disabled>
                    </div>

                    <!-- Submit Button -->
                    <button id="submitBtn" onclick="submitAnswer()" class="candy-btn candy-btn-primary w-full max-w-sm py-5 text-2xl" disabled>
                        ¡Listo! 🍬
                    </button>
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
                            <h2 class="text-5xl font-bold" style="background: linear-gradient(135deg, hsl(265,90%,63%), hsl(344,100%,65%)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">🎁 Bazár Mágico</h2>
                            <p class="font-medium mt-1" style="color: var(--text-medium)">¡Gasta tus monedas en tesoros increíbles!</p>
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
                    <div id="rewardsGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger">
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
                            <h2 class="text-4xl font-bold" style="background: linear-gradient(135deg, hsl(175,65%,45%), hsl(265,90%,63%)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">📊 Centro de Mando</h2>
                            <p class="font-medium" style="color: var(--text-medium)">Progreso, estadísticas y auditoría completa</p>
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
                            <h4 class="text-xl font-bold mb-6" style="color: var(--text-dark)">📈 Desempeño Semanal</h4>
                            <div class="w-full flex justify-center overflow-hidden flex-1">
                                <canvas id="performanceChart" width="500" height="280"></canvas>
                            </div>
                        </div>
                        <div class="candy-card p-8" style="min-height: 380px">
                            <h4 class="text-xl font-bold mb-6" style="color: var(--text-dark)">🔍 Auditoría Forense</h4>
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
                render('profileSelection');
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
        timer: null
    };

    window.startLevel = async (levelId) => {
        gameData.levelId = levelId;
        gameData.currentQuestion = 1;
        gameData.correct = 0;
        gameData.startTime = Date.now();
        await render('game');
        nextQuestion();
    };

    async function nextQuestion() {
        if (gameData.currentQuestion > gameData.total) {
            finishGame();
            return;
        }

        document.getElementById('questionCounter').innerText = `${gameData.currentQuestion} / ${gameData.total}`;

        try {
            document.getElementById('equation').innerHTML = '<span class="animate-pulse text-6xl text-gray-400 flex items-center justify-center">⏳</span>';
            document.getElementById('equation').style.color = '';
            document.getElementById('answerField').disabled = true;
            document.getElementById('submitBtn').disabled = true;

            const res = await fetch(`api/generate_problem.php?level_id=${gameData.levelId}`);
            const data = await res.json();

            gameData.currentAnswer = data.answer;
            document.getElementById('equation').innerText = `${data.n1} ${data.operator} ${data.n2}`;
            document.getElementById('equation').style.color = 'var(--text-dark)';
            document.getElementById('answerField').value = '';
            document.getElementById('answerField').disabled = false;
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('answerField').focus();

            startTimer();
        } catch (err) {
            Swal.fire('Error', 'Error al generar pregunta', 'error');
        }
    }

    function startTimer() {
        clearInterval(gameData.timer);
        const bar = document.getElementById('timerBar');
        bar.style.width = '100%';
        bar.style.transition = 'none';

        setTimeout(() => {
            bar.style.transition = 'width 10s linear';
            bar.style.width = '0%';
        }, 10);

        gameData.timer = setTimeout(() => submitAnswer(true), 10000);
    }

    window.submitAnswer = async (timeout = false) => {
        clearTimeout(gameData.timer);
        const input = document.getElementById('answerField');
        const userAnswer = parseInt(input.value);
        const isCorrect = !timeout && userAnswer === gameData.currentAnswer;

        if (isCorrect) {
            playSound('correct');
            gameData.correct++;
            state.activeChild.coins += 5;
            document.getElementById('gameCoins').innerText = state.activeChild.coins;
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FF85A1', '#7BDFF2', '#F9F871']
            });
        } else {
            playSound('wrong');
        }

        showFeedback(isCorrect);

        setTimeout(() => {
            gameData.currentQuestion++;
            nextQuestion();
        }, 1000);
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
                Swal.fire({
                    title: '¡Juego Terminado!',
                    text: `Lograste ${gameData.correct} aciertos y ganaste ${data.coins_earned} monedas.`,
                    icon: 'success',
                    confirmButtonText: '¡Genial! 🍭'
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

            grid.innerHTML = data.rewards.map((item, i) => {
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

                return `
                <div class="reward-card p-6 text-center ${isEquipped ? 'equipped' : isOwned ? 'owned' : ''} ${state.activeChild.coins < item.cost && !isOwned ? 'opacity-60' : ''} animate-slide-up" style="animation-delay: ${i * 0.07}s">
                    <div class="text-6xl mb-4" style="transition: transform 0.3s ease;"
                         onmouseover="this.style.transform='scale(1.2) rotate(5deg)'"
                         onmouseout="this.style.transform='scale(1) rotate(0deg)'">${item.icon}</div>
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

            // Chart
            const history = Array.isArray(data.history) ? data.history : [];
            initChart(history);

        } catch (err) {
            console.error('Error dashboard:', err);
            const ds = document.getElementById('dashStats');
            if (ds) ds.innerHTML = '<div class="col-span-full text-center p-8 text-red-500 font-bold">Error de conexión al obtener datos.</div>';
        }
    };

    let performanceChart = null;
    function initChart(history) {
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

    checkSession();
});



