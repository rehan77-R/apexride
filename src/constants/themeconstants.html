// src/constants/themeConstants.js

document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const body = document.body;
    const navbar = document.querySelector('nav');
    
    // Check theme from local storage
    let isDarkMode = localStorage.getItem('theme') === 'dark';

    const applyTheme = () => {
        if (isDarkMode) {
            // Dark Mode Apply
            body.classList.replace('bg-slate-100', 'bg-gray-900');
            
            if(navbar) {
                navbar.classList.replace('bg-white', 'bg-gray-900');
                navbar.classList.add('text-white', 'border-b', 'border-gray-800');
            }
            if(themeToggleBtn) themeToggleBtn.innerText = '☀️';

            // Cards and sections ko dark karna
            document.querySelectorAll('.bg-white:not(nav)').forEach(el => {
                el.classList.replace('bg-white', 'bg-gray-800');
                el.classList.add('text-white', 'border-gray-700');
            });
            
            // Text colors ko light karna
            document.querySelectorAll('.text-gray-800, .text-gray-600, .text-gray-500').forEach(el => {
                el.setAttribute('data-original-color', [...el.classList].find(c => c.startsWith('text-gray-')));
                el.classList.remove('text-gray-800', 'text-gray-600', 'text-gray-500');
                el.classList.add('text-gray-200');
            });

        } else {
            // Light Mode Apply
            body.classList.replace('bg-gray-900', 'bg-slate-100');
            
            if(navbar) {
                navbar.classList.replace('bg-gray-900', 'bg-white');
                navbar.classList.remove('text-white', 'border-b', 'border-gray-800');
            }
            if(themeToggleBtn) themeToggleBtn.innerText = '🌓';

            // Cards and sections ko wapas light karna
            document.querySelectorAll('.bg-gray-800:not(nav, footer)').forEach(el => {
                el.classList.replace('bg-gray-800', 'bg-white');
                el.classList.remove('text-white', 'border-gray-700');
            });

            // Text colors ko wapas lana
            document.querySelectorAll('.text-gray-200').forEach(el => {
                const originalColor = el.getAttribute('data-original-color');
                if (originalColor) {
                    el.classList.remove('text-gray-200');
                    el.classList.add(originalColor);
                }
            });
        }
    };

    // Button click event
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light'); // Save setting
            applyTheme();
        });
    }

    // Har page load par theme apply karna
    applyTheme();
});
