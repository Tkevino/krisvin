document.addEventListener("DOMContentLoaded", () => {
    // 1. Cursor Magnético Personalizado
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', e => {
            gsap.to(cursor, {x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out"});
        });
        
        // Elementos que fazem o cursor crescer
        const interactives = document.querySelectorAll('a, button, .tilt-element, .brand-container, .topic-box, .skill-card, .floating-whatsapp');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.border = '1px solid #a881ff';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = '#a881ff';
                cursor.style.border = 'none';
            });
        });
    }

    // 2. Barra de Progresso de Leitura
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            progressBar.style.width = (winScroll / height) * 100 + '%';
        });
    }

    // 3. Digitação Automática (Typed.js)
    if(document.querySelector('#typed-text')) {
        new Typed('#typed-text', {
            strings: [
                'Especialista em identidades visuais.', 
                'Design com Inteligência Artificial.', 
                'Carrosséis magnéticos e de conversão.', 
                'Resultados e posicionamento estratégico.'
            ],
            typeSpeed: 40, backSpeed: 20, backDelay: 2000, loop: true, showCursor: true, cursorChar: '|'
        });
    }

    // 4. Elementos Magnéticos (Botões, Logo e WhatsApp flutuante)
    const magneticElements = document.querySelectorAll('.magnetic-btn, .magnetic-btn-particle, .magnetic-container, .brand-container, .floating-whatsapp');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', e => {
            const position = el.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            gsap.to(el, {x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power3.out"});
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)"});
        });
    });

    // 5. Explosão de Partículas ao Clicar
    document.querySelectorAll('.magnetic-btn-particle').forEach(btn => {
        btn.addEventListener('click', e => {
            for(let i=0; i<20; i++) {
                const p = document.createElement('div');
                p.style.cssText = `position:fixed;width:6px;height:6px;background:#a881ff;border-radius:50%;pointer-events:none;top:${e.clientY}px;left:${e.clientX}px;z-index:10000;box-shadow:0 0 10px #ff81e6;`;
                document.body.appendChild(p);
                gsap.to(p, {
                    x: (Math.random()-0.5)*200, y: (Math.random()-0.5)*200,
                    opacity: 0, scale: Math.random()+0.5, duration: 1+Math.random(),
                    ease: "power2.out", onComplete: () => p.remove()
                });
            }
        });
    });

    // 6. Inclinação 3D nas imagens e cards
    const tiltElements = document.querySelectorAll(".tilt-element");
    if (tiltElements.length > 0) VanillaTilt.init(tiltElements);

    // 7. Animações de Scroll (GSAP ScrollTrigger)
    gsap.registerPlugin(ScrollTrigger);
    
    // Efeito Parallax na imagem principal
    gsap.to(".main-parallax", {
        yPercent: 15, ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: true }
    });

    // Revelar Tópicos e Cards subindo suavemente
    gsap.utils.toArray('.reveal-up').forEach(elem => {
        gsap.fromTo(elem, { autoAlpha: 0, y: 50 }, {
            duration: 1, autoAlpha: 1, y: 0, ease: "power3.out",
            scrollTrigger: { trigger: elem, start: "top 85%", toggleActions: "play none none reverse" }
        });
    });

    // Revelar Títulos desenrolando em 3D
    gsap.utils.toArray('.reveal-text-3d').forEach(elem => {
        gsap.fromTo(elem, { autoAlpha: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', transform: 'translateZ(-100px) rotateX(-20deg)' }, {
            duration: 1.5, autoAlpha: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', transform: 'translateZ(0) rotateX(0)',
            ease: "power4.out",
            scrollTrigger: { trigger: elem, start: "top 80%", toggleActions: "play none none reverse" }
        });
    });

    // Lista de especialidades surgindo em cascata
    gsap.utils.toArray('.reveal-sequential-list li').forEach((elem, i) => {
        gsap.fromTo(elem, { autoAlpha: 0, x: -20 }, {
            duration: 0.6, autoAlpha: 1, x: 0, delay: i * 0.15, ease: "power2.out",
            scrollTrigger: { trigger: elem, start: "top 90%", toggleActions: "play none none reverse" }
        });
    });

    // Revelar o Letreiro Duplo
    gsap.fromTo('.reveal-marquee', { autoAlpha: 0, y: 30 }, {
        duration: 1, autoAlpha: 1, y: 0, ease: "power3.out",
        scrollTrigger: { trigger: '.marquee-wrapper', start: "top 90%", toggleActions: "play none none reverse" }
    });

    // 8. Interatividade do Letreiro (Acelera conforme rola a página)
    window.addEventListener('scroll', () => {
        const marquees = document.querySelectorAll('.marquee-content');
        marquees.forEach(marquee => {
            marquee.style.animationDuration = Math.max(10, 25 - window.scrollY * 0.01) + 's';
        });
    });
});