   
        // This script should ideally be in script.js, but for self-contained example:
        document.addEventListener('DOMContentLoaded', function () {
            // Mobile Menu Toggle
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const menuIcon = document.getElementById('menu-icon');

            if (mobileMenuButton && mobileMenu && menuIcon) {
                mobileMenuButton.addEventListener('click', function () {
                    mobileMenu.classList.toggle('hidden');
                    if (mobileMenu.classList.contains('hidden')) {
                        menuIcon.classList.remove('fa-times');
                        menuIcon.classList.add('fa-bars');
                    } else {
                        menuIcon.classList.remove('fa-bars');
                        menuIcon.classList.add('fa-times');
                    }
                });
            }

            // Set current year in footer
            const yearSpan = document.getElementById('currentYear');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }

            // REMOVED: Conceptual Contact Form JS submission, as Netlify will handle it.
            // const contactForm = document.getElementById('signup-form');
            // if (contactForm) {
            //     contactForm.addEventListener('submit', function(event) { /* ... */ });
            // }
            
            // Newsletter Form conceptual submission (can also be a Netlify form)
            const newsletterForm = document.querySelector('footer form[name="newsletter"]'); // Target Netlify form
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(event) {
                    // If you want to prevent default and show a JS message AFTER Netlify submission,
                    // you'd need more complex JS, often involving checking Netlify's success state
                    // or redirecting to a thank you page.
                    // For simplicity with Netlify, often just let Netlify handle the redirect/message.
                    // If you want a JS alert *before* Netlify takes over (which might be confusing):
                    // const emailInput = newsletterForm.querySelector('input[type="email"]');
                    // if (emailInput && emailInput.value) {
                    //      alert('Subscribing ' + emailInput.value + ' to newsletter via Netlify...');
                    // } else {
                    //     event.preventDefault(); // Prevent submission if email is empty
                    //     alert('Please enter a valid email address for the newsletter.');
                    // }
                });
            }

            // Chat Icon and Welcome Popup Logic
            const chatIcon = document.getElementById('chat-icon');
            const welcomePopup = document.getElementById('welcome-chat-popup');
            const closePopupButton = document.getElementById('close-popup-button');

            function playNotificationSound() {
                if (typeof Tone !== 'undefined') {
                    const synth = new Tone.Synth().toDestination();
                    try {
                        Tone.start(); 
                        synth.triggerAttackRelease("C5", "8n", Tone.now());
                        synth.triggerAttackRelease("E5", "8n", Tone.now() + 0.2);
                        synth.triggerAttackRelease("G5", "8n", Tone.now() + 0.4);
                    } catch (e) {
                        console.warn("Tone.js sound issue.", e);
                    }
                } else {
                    console.warn("Tone.js library not loaded.");
                }
            }

            setTimeout(() => {
                if (welcomePopup) {
                    welcomePopup.classList.remove('hidden');
                    welcomePopup.classList.add('visible');
                    playNotificationSound();
                }
            }, 1500); 

            if (chatIcon) {
                chatIcon.addEventListener('click', () => {
                    if (welcomePopup) {
                        welcomePopup.classList.toggle('hidden');
                        welcomePopup.classList.toggle('visible');
                        if (welcomePopup.classList.contains('visible')) {
                             playNotificationSound(); 
                        }
                    }
                });
            }

            if (closePopupButton && welcomePopup) {
                closePopupButton.addEventListener('click', () => {
                    welcomePopup.classList.add('hidden');
                    welcomePopup.classList.remove('visible');
                });
            }

            // Active nav link styling
            const navLinks = document.querySelectorAll('nav a');
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            navLinks.forEach(link => {
                const linkPage = link.getAttribute('href').split('/').pop();
                link.classList.remove('bg-green-100', 'text-pos-accent', 'font-semibold');
                 if (!link.parentElement.classList.contains('flex-shrink-0') && !link.classList.contains('bg-pos-accent')) { // Check if it's not the logo or demo button
                    link.classList.add('text-pos-text', 'hover:bg-gray-100', 'hover:text-pos-accent', 'font-medium');
                }
                if (linkPage === currentPage) {
                    link.classList.remove('text-pos-text', 'hover:bg-gray-100', 'hover:text-pos-accent', 'font-medium');
                    link.classList.add('bg-green-100', 'text-pos-accent', 'font-semibold');
                }
            });
            const mobileNavLinks = document.querySelectorAll('#mobile-menu a');
            mobileNavLinks.forEach(link => {
                const linkPage = link.getAttribute('href').split('/').pop();
                link.classList.remove('bg-green-100', 'text-pos-accent', 'font-semibold');
                if (!link.classList.contains('bg-pos-accent')) { // Check if it's not the demo button
                    link.classList.add('text-pos-text', 'hover:bg-gray-100', 'hover:text-pos-accent');
                }
                if (linkPage === currentPage) {
                     link.classList.remove('text-pos-text', 'hover:bg-gray-100', 'hover:text-pos-accent');
                    link.classList.add('bg-green-100', 'text-pos-accent', 'font-semibold');
                }
            });
        });

  
