const fs = require('fs');

function generatePortfolio(data) {
    const hexToRgb = (hex) => {
        const cleanHex = hex.replace('#', '');
        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);
        return `${r}, ${g}, ${b}`;
    };

    let rgb = '43, 71, 255';
    try {
        rgb = hexToRgb(data.contact.accent);
    } catch(e) {
        console.error(e);
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.profile.name} | ${data.profile.title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,700;1,400&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #0d0d0b;
            --paper: #f5f2ec;
            --accent: ${data.contact.accent};
            --accent-rgb: ${rgb};
            --text: #ffffff;
            --text-dark: #000000;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: #fff; overflow-x: hidden; scroll-behavior: smooth; }
        
        h1, h2, h3 { font-family: 'DM Serif Display', serif; font-weight: 400; }
        a { color: inherit; text-decoration: none; }

        /* REVEAL ANIMATION */
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }

        /* NAV */
        nav { position: fixed; top: 0; width: 100%; padding: 1.5rem 5%; z-index: 100; display: flex; justify-content: space-between; transition: 0.3s; }
        nav.scrolled { background: rgba(13, 13, 11, 0.8); backdrop-filter: blur(10px); padding: 1rem 5%; }
        .logo { font-size: 1.2rem; font-weight: bold; letter-spacing: -0.05em; }

        /* HERO */
        #hero { height: 100vh; display: flex; align-items: center; padding: 0 10%; position: relative; overflow: hidden; }
        .hero-bg { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60vw; height: 60vw; background: radial-gradient(circle, rgba(var(--accent-rgb), 0.15) 0%, transparent 70%); z-index: -1; }
        .hero-content { max-width: 900px; }
        h1 { font-size: clamp(3rem, 10vw, 8rem); line-height: 0.9; margin-bottom: 2rem; }
        .hero-pitch { font-size: 1.5rem; color: #aaa; max-width: 600px; line-height: 1.4; }

        /* ABOUT */
        #about { background: var(--paper); color: var(--text-dark); padding: 10rem 10%; display: grid; grid-template-columns: 1fr 1.5fr; gap: 4rem; }
        .about-sidebar { display: flex; flex-direction: column; justify-content: flex-start; }
        .about-meta { font-size: 0.9rem; line-height: 2; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 2rem; }
        .about-meta strong { display: block; text-transform: uppercase; letter-spacing: 0.1em; color: #777; font-size: 0.7rem; }
        .about-main h2 { font-size: 3rem; margin-bottom: 2rem; }
        .about-text { font-size: 1.2rem; line-height: 1.6; }
        .skills-list { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 3rem; }
        .skill { border: 1px solid rgba(0,0,0,0.2); padding: 0.3rem 0.8rem; border-radius: 100px; font-size: 0.8rem; }

        /* WORK */
        #work { padding: 10rem 10%; }
        #work h2 { font-size: 5rem; margin-bottom: 4rem; text-align: center; }
        .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .card { height: 500px; border-radius: 20px; padding: 3rem; position: relative; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; transition: 0.5s ease; color: white; }
        .card:hover { transform: scale(0.98); }
        .card-code { font-family: 'DM Serif Display'; font-size: 1.5rem; opacity: 0.6; }
        .card-title { font-size: 3rem; line-height: 1; }
        .card-tags { display: flex; gap: 1rem; opacity: 0.7; font-size: 0.8rem; letter-spacing: 0.1em; font-weight: bold; }
        
        /* FAVOURITES */
        #favs { padding: 10rem 10%; border-top: 1px solid rgba(255,255,255,0.1); }
        .favs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4rem; }
        .fav-col h3 { font-size: 2rem; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--accent); display: inline-block; }
        .fav-item { margin-bottom: 0.75rem; color: #777; }

        /* CONTACT */
        #contact { background: var(--paper); color: var(--text-dark); padding: 10rem 10%; text-align: center; }
        .cta-big { font-family: 'DM Serif Display'; font-size: clamp(3rem, 8vw, 6rem); margin-bottom: 3rem; line-height: 1; }
        .email-btn { background: var(--accent); color: white; padding: 1.5rem 3rem; border-radius: 100px; font-weight: bold; font-size: 1.2rem; display: inline-block; transition: 0.3s; }
        .email-btn:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(var(--accent-rgb), 0.3); }
        
        footer { padding: 4rem 10%; text-align: center; font-size: 0.8rem; color: #444; border-top: 1px solid rgba(255,255,255,0.05); }

        @media (max-width: 768px) {
            #about, .projects-grid, .favs-grid { grid-template-columns: 1fr; }
            #work h2 { font-size: 3rem; }
            .card { height: 400px; }
        }
    </style>
</head>
<body>
    <nav id="navbar">
        <div class="logo">${data.profile.name.toUpperCase()}</div>
        <div style="display: flex; gap: 2rem; font-size: 0.9rem; font-weight: bold;">
            <a href="#work">WORK</a>
            <a href="#about">ABOUT</a>
            <a href="#contact">CONTACT</a>
        </div>
    </nav>

    <section id="hero">
        <div class="hero-bg"></div>
        <div class="hero-content">
            <h1 class="reveal active">${data.profile.name}<br><em>${data.profile.title}</em></h1>
            <p class="hero-pitch reveal active">${data.bio.short}</p>
        </div>
    </section>

    <section id="about" class="reveal">
        <div class="about-sidebar">
            <div class="about-meta">
                <p><strong>BORN / BASED</strong> ${data.profile.location}</p>
                <p><strong>EXPERIENCE</strong> ${data.profile.years}</p>
                <p><strong>CURRENTLY</strong> ${data.profile.availability}</p>
            </div>
        </div>
        <div class="about-main">
            <h2>About</h2>
            <div class="about-text">
                ${data.bio.long.split('\n').map(p => p.trim() ? `<p style="margin-bottom: 1.5rem;">${p}</p>` : '').join('')}
            </div>
            <div class="skills-list">
                ${data.skills.map(s => `<span class="skill">${s.toUpperCase()}</span>`).join('')}
            </div>
        </div>
    </section>

    <section id="work">
        <h2 class="reveal">Work</h2>
        <div class="projects-grid">
            ${data.projects.map(p => `
                <div class="card reveal" style="background: ${p.color}">
                    <div class="card-code">${p.code}</div>
                    <div class="card-body">
                        <div class="card-tags">${p.tags.join(' • ')}</div>
                        <h3 class="card-title">${p.title}</h3>
                    </div>
                </div>
            `).join('')}
        </div>
    </section>

    <section id="favs" class="reveal">
        <div class="favs-grid">
            ${data.favourites.map(f => `
                <div class="fav-col">
                    <h3>${f.title}</h3>
                    ${f.items.map(item => `<div class="fav-item">${item}</div>`).join('')}
                </div>
            `).join('')}
        </div>
    </section>

    <section id="contact">
        <div class="cta-big reveal">Ready to <em>start?</em></div>
        <a href="mailto:${data.contact.email}" class="email-btn reveal">GET IN TOUCH</a>
    </section>

    <footer>
        &copy; ${new Date().getFullYear()} ${data.profile.name}. Made with Portfolio Builder.
    </footer>

    <script>
        // Scroll Effect
        window.onscroll = () => {
            const nav = document.getElementById('navbar');
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        };

        // Reveal Animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    <\/script>
</body>
</html>`;
}

const data = {
    profile: {
        name: 'Rishit Bhanvadia',
        title: 'Creative Developer',
        location: 'Global',
        tagline: 'Building the future of web.',
        years: '5 years',
        availability: 'Available'
    },
    bio: {
        short: 'I build premium, performant digital experiences.',
        long: 'Passionate about clean code and beautiful design.\nI specialize in full-stack development with a keen eye for UI/UX.',
        special: 'Full-Stack Web Development'
    },
    skills: ['Web Design', 'UI/UX', 'React', 'Node.js', 'Next.js', 'TypeScript'],
    projects: [
        {
            title: 'Alchemistry',
            code: 'ALC',
            desc: 'A virtual chemistry lab.',
            color: '#2b47ff',
            tags: ['REACT', 'THREEJS', 'WEBGL']
        },
        {
            title: 'Portfolio Builder',
            code: 'PFB',
            desc: 'Single file portfolio generator.',
            color: '#ff4b4b',
            tags: ['HTML', 'JS', 'CSS']
        }
    ],
    favourites: [
        { id: 0, title: 'Music', items: ['Post-Rock', 'Ambient', 'Classic Jazz'] },
        { id: 1, title: 'Places', items: ['Kyoto', 'Iceland', 'The Peak District'] },
        { id: 2, title: 'Tech', items: ['Mechanical Keyboards', 'Single File Apps', 'AIGC'] }
    ],
    contact: {
        email: 'hello@rishit.dev',
        linkedin: '',
        twitter: '',
        github: 'https://github.com/RishitBhanvadia',
        accent: '#2b47ff'
    }
};

const html = generatePortfolio(data);
fs.writeFileSync('index.html', html);
console.log('Portfolio generated at index.html');
