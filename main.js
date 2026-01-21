document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. CURSOR LOGIC REMOVED --- */

    /* --- 2. SCROLL REVEAL --- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

    /* --- 3. MOBILE MENU LOGIC --- */
    // Create Overlay Dynamically
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu-overlay';

    // Clone Standard Links
    const links = [
        { name: 'Home', url: 'index.html', sub: ['Home One', 'Home Two'] },
        { name: 'About Us', url: 'about.html' },
        { name: 'Services', url: 'services.html' },
        { name: 'Contact', url: 'contact.html' },
        { name: 'Dashboards', url: '#', sub: ['User Dashboard', 'Admin Dashboard'] },
        { name: 'Account', url: '#', sub: ['Login', 'Register'] }
    ];

    links.forEach(link => {
        const item = document.createElement('div');
        const mainLink = document.createElement('a');
        mainLink.className = 'mobile-link';
        mainLink.href = link.url;
        mainLink.innerText = link.name;
        item.appendChild(mainLink);

        if (link.sub) {
            link.sub.forEach(subName => {
                const subLink = document.createElement('a');
                subLink.className = 'mobile-sub-link';
                // Simple mapping for demo
                const map = { 'Home One': 'index.html', 'Home Two': 'index2.html', 'User Dashboard': 'dashboard-user.html', 'Admin Dashboard': 'dashboard-admin.html', 'Login': 'login.html', 'Register': 'register.html' };
                subLink.href = map[subName] || '#';
                subLink.innerText = subName;
                item.appendChild(subLink);
            });
        }
        mobileMenu.appendChild(item);
    });

    document.body.appendChild(mobileMenu);

    const trigger = document.querySelector('.menu-trigger');
    if (trigger) {
        trigger.addEventListener('click', () => {
            const isActive = mobileMenu.classList.contains('active');
            if (isActive) {
                mobileMenu.classList.remove('active');
                trigger.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> Menu';
            } else {
                mobileMenu.classList.add('active');
                trigger.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Close';
            }
        });
    }

    /* --- 4. CONTROLS (THEME & RTL) --- */
    const textHtml = document.documentElement;
    const storedDir = localStorage.getItem('aurora-dir');
    if (storedDir) {
        textHtml.setAttribute('dir', storedDir);
    }

    const rtlBtn = document.getElementById('rtl-btn-nav');
    if (rtlBtn) {
        rtlBtn.addEventListener('click', () => {
            const currentDir = textHtml.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            textHtml.setAttribute('dir', newDir);
            localStorage.setItem('aurora-dir', newDir);
        });
    }

    const themeBtn = document.getElementById('theme-btn-nav');
    const storedTheme = localStorage.getItem('aurora-theme');
    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('aurora-theme', newTheme);
        });
    }

    /* --- 5. DASHBOARD SIDEBAR TOGGLE --- */
    const dashToggle = document.querySelector('.dash-mobile-toggle-btn');
    const dashSidebar = document.querySelector('.dash-sidebar');

    if (dashToggle && dashSidebar) {
        dashToggle.addEventListener('click', () => {
            dashSidebar.classList.toggle('active');
            dashToggle.classList.toggle('active');

            if (dashSidebar.classList.contains('active')) {
                dashToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Close';
            } else {
                dashToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> Menu';
            }
        });
    }
});
