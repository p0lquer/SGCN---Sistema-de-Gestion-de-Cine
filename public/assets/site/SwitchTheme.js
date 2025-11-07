     // Get theme from localStorage or default to 'light'
        const getStoredTheme = () => localStorage.getItem('theme') || 'light';
        const setStoredTheme = theme => localStorage.setItem('theme', theme);

        // Set theme on page load
        const setTheme = theme => {
            document.documentElement.setAttribute('data-bs-theme', theme);
            const icon = document.getElementById('themeIcon');
            if (theme === 'dark') {
                icon.className = 'bi bi-sun-fill fs-4';
            } else {
                icon.className = 'bi bi-moon-stars-fill fs-4';
            }
        };

        // Initialize theme
        setTheme(getStoredTheme());

        // Toggle theme on button click
        document.getElementById('themeToggle').addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            setStoredTheme(newTheme);
        });