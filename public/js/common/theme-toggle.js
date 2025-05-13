//theme-toggle.js
const youtubeLogoImg = document.querySelector('.youtube-logo'); // 유튜브 로고 선택 (유튜브 로고는 필터로 변환하지 않고 직접 변환)
const themeButtons = document.querySelectorAll('[data-theme]'); // 테마 변경 버튼 2개를 모두 선택
const appearanceBtn = document.querySelector('.appearance-btn'); // 테마 버튼 토글용

themeButtons.forEach(button => { 
  button.addEventListener('click', () => { // 버튼 2개중에서 클릭된 것을 선택
    const selectedTheme = button.dataset.theme; //클릭된 버튼의 테마를 저장

    document.body.classList.remove('dark-theme', 'light-theme'); //기존 바디에 있는 테마 관련 클래스 제거
    document.body.classList.add(`${selectedTheme}-theme`); // 클릭된 버튼의 테마를 클래스로 새로 저장

    // 브라우저에 테마 저장
    localStorage.setItem('theme', selectedTheme);

    if (document.body.classList.contains('light-theme')) { // 라이트 테마일 경우.
      youtubeLogoImg.src = '/assets/toggleicons/youtube-logo.svg'; //유튜브 아이콘 변경
      appearanceBtn.innerHTML = '<img src="/assets/icons/appearance-sun.svg" alt="Appearance: Device theme"><span>Appearance: light theme</span>'; // '테마 버튼 토글용 버튼' 내용 바꾸기
    } else {
      youtubeLogoImg.src = '/assets/logos/Youtube-Logo.svg'; // 다크 테마일 경우,
      appearanceBtn.innerHTML = '<img src="/assets/icons/appearance.svg" alt="Appearance: Device theme"><span>Appearance: dark theme</span>'; // '테마 버튼 토글용 버튼' 내용 바꾸기
    }

  });
});

//페이지 로드 시 테마 적용 코드
document.addEventListener('DOMContentLoaded', () => { // 페이지 로드 시
  const savedTheme = localStorage.getItem('theme'); // 브라우저에 저장된 테마 호출
  if (savedTheme) { 
    document.body.classList.remove('light-theme', 'dark-theme'); // 바디에 기존 적용된 테마들 제거하고
    document.body.classList.add(`${savedTheme}-theme`); // 저장된 테마를 추가
    const themeButtons = document.querySelectorAll('.appear-modal-main button'); // 테마 변경 버튼들 호출
    themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === savedTheme); // 현재 테마와 같은 버튼에 'active' 틀래스 추가(체크 아이콘 보이게 하기 위해서)
    });
  }

  if (document.body.classList.contains('light-theme')) { // 라이트 테마일 경우.
    youtubeLogoImg.src = '/assets/toggleicons/youtube-logo.svg'; //유튜브 아이콘 변경
    appearanceBtn.innerHTML = '<img src="/assets/icons/appearance-sun.svg" alt="Appearance: Device theme"><span>Appearance: light theme</span>'; // '테마 버튼 토글용 버튼' 내용 바꾸기
  } else {
    youtubeLogoImg.src = '/assets/logos/Youtube-Logo.svg'; // 다크 테마일 경우,
    appearanceBtn.innerHTML = '<img src="/assets/icons/appearance.svg" alt="Appearance: Device theme"><span>Appearance: dark theme</span>'; // '테마 버튼 토글용 버튼' 내용 바꾸기
  }

  
});
