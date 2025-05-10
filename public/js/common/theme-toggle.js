//theme-toggle.js
const youtubeLogoImg = document.querySelector('.youtube-logo');
const themeButtons = document.querySelectorAll('[data-theme]');

themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedTheme = button.dataset.theme; 

    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(`${selectedTheme}-mode`);

    if (document.body.classList.contains('light-mode')) {
      youtubeLogoImg.src = '/assets/toggleicons/youtube-logo.svg';
    } else {
      youtubeLogoImg.src = '/assets/logos/Youtube-Logo.svg';
    }
  });
});