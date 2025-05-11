//theme-toggle.js
const youtubeLogoImg = document.querySelector('.youtube-logo');
const themeButtons = document.querySelectorAll('[data-theme]');
const appearanceBtn = document.querySelector('.appearance-btn');

themeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedTheme = button.dataset.theme; 

    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${selectedTheme}-theme`);

    // 브라우저에 테마 저장
    localStorage.setItem('theme', selectedTheme);

    if (document.body.classList.contains('light-theme')) {
      youtubeLogoImg.src = '/assets/toggleicons/youtube-logo.svg';
      appearanceBtn.innerHTML = '<img src="/assets/icons/appearance-sun.svg" alt="Appearance: Device theme"><span>Appearance: light theme</span>';
    } else {
      youtubeLogoImg.src = '/assets/logos/Youtube-Logo.svg';
      appearanceBtn.innerHTML = '<img src="/assets/icons/appearance.svg" alt="Appearance: Device theme"><span>Appearance: dark theme</span>';
    }

  });
});

//페이지 로드 시 테마 적용 코드
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${savedTheme}-theme`);
  }

  if (document.body.classList.contains('light-theme')) {
    youtubeLogoImg.src = '/assets/toggleicons/youtube-logo.svg';
    appearanceBtn.innerHTML = '<img src="/assets/icons/appearance-sun.svg" alt="Appearance: Device theme"><span>Appearance: light theme</span>';
  } else {
    youtubeLogoImg.src = '/assets/logos/Youtube-Logo.svg';
    appearanceBtn.innerHTML = '<img src="/assets/icons/appearance.svg" alt="Appearance: Device theme"><span>Appearance: dark theme</span>';
  }

  if (savedTheme) {
    document.body.classList.add(`${savedTheme}-mode`);
    
    // 버튼 상태 반영
    const themeButtons = document.querySelectorAll('.appear-modal-main button');
    themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === savedTheme);
    });
  }
});
