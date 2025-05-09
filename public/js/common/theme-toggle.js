//theme-toggle.js
const themeBtn = document.getElementById('theme-toggle');
const youtubeLogoImg = document.querySelector('.youtube-logo');

themeBtn.addEventListener('click', () => {
  //light-mode 클래스 토글
  document.body.classList.toggle('light-mode');

  if (document.body.classList.contains('light-mode')) {
    youtubeLogoImg.src = '/assets/toggleicons/youtube-logo.svg';
  } else {
    youtubeLogoImg.src = '/assets/logos/Youtube-Logo.svg';
  }
});