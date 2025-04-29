// html보다 나중에 js가 실행되도록 DOMContentLoaded 감쌈
document.addEventListener("DOMContentLoaded", () => {
    // 검색창, 검색버튼, 영상리스트 불러오기
    const searchInput = document.querySelector(".search-form input[type='search']");
    const searchBtn = document.querySelector(".search-form button");
    const videoGrid = document.querySelector(".video-grid");
    const searchResult = document.querySelector(".search-result");
    const categoryBtns = document.querySelectorAll(".category-btn");  
    
    //영상 가져오기 함수
    async function fetchVideos() {
        const res = await fetch("http://techfree-oreumi-api.kro.kr:5000/video/getVideoList");
        const data = await res.json();
    
        // 영상 데이터 부르기
        const videosWithChannel = await Promise.all(
            data.map(async (video) => {
                try {
                    const channelRes = await fetch(`http://techfree-oreumi-api.kro.kr:5000/channel/getChannelInfo?id=${video.channel_id}`);
                    const channelInfo = await channelRes.json();
                    return { ...video, channel: channelInfo };
                } catch (error) {
                    console.error('채널 정보 오류:', error);
                    return {
                        ...video,
                        channel: {
                            channel_name: 'Unknown',
                            channel_profile: '/assets/icons/default-profile.svg'
                        }
                    };
                }
            })
        );
    
        return videosWithChannel;
    }
    

    //영상 리스트 불러오기 함수 생성
    function renderVideos(videos) {
        videoGrid.style.display = "none";        // 홈 화면 숨기기
        searchResult.style.display = "block";     // 검색 결과 보여주기
        searchResult.innerHTML = "";              // 기존 검색결과 비우기
    
        videos.forEach(video => {
            const div = document.createElement("div");
            div.className = "search-item"; // 검색 결과 전용 스타일
            div.innerHTML = `
                <a href="/video?id=${video.id}">
                    <img src="${video.thumbnail}" alt="썸네일" style="width: 300px;">
                    <div class="search-info">
                        <h3>${video.title}</h3>
                        <p>${video.channel.channel_name}</p>
                        <p>${video.views.toLocaleString()} views • 1 week ago</p>
                    </div>
                </a>
            `;
            searchResult.appendChild(div);
        });
    }
    
    
    //검색 기능 함수 생성
    async function handleSearch(keyword) {
        const allVideos = await fetchVideos(); // API에서 정보가져오기

        if (!keyword || keyword.trim() === "") {
            // 검색어 없으면 홈 화면 복구
            videoGrid.style.display = "grid";
            searchResult.style.display = "none";
            return;
        }

        const lowerKeyword = keyword.toLowerCase();
        const filtered = allVideos.filter(video =>
            video.title.toLowerCase().includes(lowerKeyword) ||
            video.tags.join(",").toLowerCase().includes(lowerKeyword) ||
            video.channel.channel_name.toLowerCase().includes(lowerKeyword)
        );

        if (filtered.length === 0) {
            alert("검색 결과가 없습니다.");
        } else {
            renderVideos(filtered);
        }
    }
    
    //버튼 기능 실행
    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const keyword = searchInput.value;
        handleSearch(keyword);
    });
    //검색창에서 엔터키 눌렀을 때도 검색 실행됨.
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const keyword = searchInput.value;
            handleSearch(keyword);
        }
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const category = btn.textContent.trim(); 
            if (category === "전체") {
                // "전체" 누르면 홈 복귀
                videoGrid.style.display = "grid";
                searchResult.style.display = "none";
            } else {
                handleSearch(category);
            }
        });
    });

    // 페이지 로드 시 URL 쿼리(search) 자동 검색
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");
    if (searchQuery) {
        searchInput.value = searchQuery;  // 검색창에 검색어 보여주기
        handleSearch(searchQuery);        // 검색 실행
    }

    
    
});  //DOMContentLoaded 마지막