// html보다 나중에 js가 실행되도록 DOMContentLoaded 감쌈
document.addEventListener("DOMContentLoaded", () => {
    // 검색창, 검색버튼, 영상리스트 불러오기
    const searchInput = document.querySelector(".search-form input[type='search']");
    const searchBtn = document.querySelector(".search-form button");
    const videoGrid = document.querySelector(".video-grid");

    //영상 리스트 불러오기 함수 생성
    async function fetchVideos() {
        const res = await fetch("http://techfree-oreumi-api.kro.kr:5000/video/getVideoList");
        const data = await res.json();
        return data;
    }
    //검색 기능 함수 생성
    async function handleSearch() {
        const keyword = searchInput.value.toLowerCase(); //필터 키워드 저장
        const allVideos = await fetchVideos(); // 전체 영상 리스트 가져오기
        const filtered = allVideos.filter(video =>
          video.title.toLowerCase().includes(keyword) ||  // 조건1:제목에 검색어가 있거나
          video.tags.join(",").toLowerCase().includes(keyword) // 조건2: 태그에 검색어가 있으면
        );

        if (filtered.length === 0) {
            alert("검색 결과가 없습니다.");
        }

        renderVideos(filtered);
    }
    // 영상 렌더링 함수 생성
    function renderVideos(videos) {
        videoGrid.innerHTML = ""; // 기존 목록 지우기
    
        videos.forEach(video => { 
            const article = document.createElement("article"); // 새 기사 만들기
            article.className = "video-card"; // 새 기사 이름 설정
            // 새 기사에 들어갈 내용 입력. 기존 카드 베이스로 생성
            article.innerHTML = `
            <a href="/video?id=${video.id}">
                <figure class="video-figure">
                    <img src="${video.thumbnail}" alt="썸네일">
                    <span class="video-length">12:34</span>
                </figure>
            </a>

            <figcaption class="video-info">
                <a href="/channel?id=${video.channel_id}">
                    <img class="channel-avatar" src="/assets/img/Profile-pic.svg" alt="channel-profile">
                </a>
                <div class="video-description">
                    <p class="video-title">${video.title}</p>
                    <p>
                        <span class="channel-name">채널 ID: ${video.channel_id}</span><br>
                        <span class="view">${video.views.toLocaleString()} Views.</span>
                        <span class="update-date">1 week ago</span>
                    </p>
                </div>
            </figcaption>
        `;
            videoGrid.appendChild(article); // 생성된 기사를 뒤에서부터 추가
        });
    }
    //버튼 기능 실행
    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();  // 폼 전송 막기
        handleSearch();
    });
    
    // 처음 페이지 로드할 때 전체 비디오 출력
    fetchVideos().then(renderVideos);
    
});  //DOMContentLoaded 마지막