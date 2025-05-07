// home_search.js
// html보다 나중에 js가 실행되도록 DOMContentLoaded 감쌈
document.addEventListener("DOMContentLoaded", () => {
    // 검색창, 검색버튼, 영상리스트 불러오기
    const searchInput = document.querySelector(".search-form input[type='search']");
    const searchBtn = document.querySelector(".search-form button");
    const videoGrid = document.querySelector(".video-grid");
    const searchResult = document.querySelector(".search-result");
    const categoryBtns = document.querySelectorAll(".category-btn");  
    // 현재 페이지 url의 쿼리스트링 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get("search");

    // 페이지 로드 시작하자마자 무조건 videoGrid 숨기기
    if (videoGrid) videoGrid.style.display = "none";
    if (searchResult) searchResult.style.display = "none";

    //영상 가져오기 함수
    async function fetchVideos() {
        try {const res = await fetch("http://techfree-oreumi-api.kro.kr:5000/video/getVideoList");
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
                                channel_profile: '/assets/profiles/default-profile.svg'
                            }
                        };
                    }
                })
            );
        
            return videosWithChannel;
        } catch (error) {
            console.error("영상 목록 불러오기 실패:", error);
            return [];
        }
    }
        
    

    //영상 리스트 불러오기 함수 생성
    function renderVideos(videos) {
        videoGrid.style.display = "none";        // 홈 화면 숨기기
        searchResult.style.display = "block";     // 검색 결과 보여주기
        searchResult.innerHTML = "";              // 기존 검색결과 비우기
    
        videos.forEach(video => {
            const div = document.createElement("article");
            div.className = "video-card"; // 검색 결과 전용 스타일
            div.innerHTML = `
                <article class="search-item">
                    <a href="/video?id=${video.id}">
                        <figure class="video-thumbnail video-card">
                            <img class="thumbnail" src="${video.thumbnail}" alt="video thumbnail">
                            <video class="preview" muted loop preload="none">
                                <source src="https://storage.googleapis.com/youtube-clone-video/${video.id}.mp4" type="video/mp4">
                            </video>
                        </figure>
                    </a>

                    <figcaption class="video-info">
                        <a href="/channel?id=${video.channel.id}">
                            <img class="channel-avatar" src="${video.channel.channel_profile}" alt="channel-profile">
                        </a>
                        <div class="video-description">
                            <a href="/video?id=${video.id}">
                                <p class="video-title">${video.title}</p>
                            </a>
                            <a href="/channel?id=${video.channel.id}">
                                <span class="channel-name">${video.channel.channel_name}</span><br>
                            </a>
                            <a href="/video?id=${video.id}">
                                <span class="view">${formatViews(video.views)} Views • </span>
                                <span class="update-date">${getRelativeTime(video.created_dt)}</span>
                            </a>
                        </div>
                    </figcaption>
                </article>
            `;



            searchResult.appendChild(div);
        });
        enableThumbnailPreview();
    }
    function formatViews(views) {
        if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + "M";
        if (views >= 1_000) return (views / 1_000).toFixed(1) + "K";
        return views.toString();
    }
    function getRelativeTime(dateString) {
        const now = new Date();
        const past = new Date(dateString);
        const seconds = Math.floor((now - past) / 1000);
    
        const units = [
            { name: "년", value: 60 * 60 * 24 * 365 },
            { name: "개월", value: 60 * 60 * 24 * 30 },
            { name: "일", value: 60 * 60 * 24 },
            { name: "시간", value: 60 * 60 },
            { name: "분", value: 60 },
            { name: "초", value: 1 },
        ];
    
        for (let unit of units) {
            const count = Math.floor(seconds / unit.value);
            if (count > 0) return `${count}${unit.name} 전`;
        }
        return "방금 전";
    }
    function enableThumbnailPreview() {
        document.querySelectorAll('.video-thumbnail').forEach(thumb => {
            const video = thumb.querySelector('.preview');
            if (!video) return;

            thumb.addEventListener('mouseenter', () => {
                video.play();
            });

            thumb.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        });
    }
    
    
    //검색 기능 함수 생성
    async function handleSearch(keyword) {
        try {const allVideos = await fetchVideos(); // API에서 정보가져오기

            // 검색어 없으면 홈 화면 복구
            if (!keyword || keyword.trim() === "") {
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
        } catch (error) {
            console.error("검색 처리 중 오류:", error);
        }
        
    }
    
    //버튼 기능 실행
    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const keyword = searchInput.value;
        if (keyword) {
            window.location.href = `/?search=${encodeURIComponent(keyword)}`; 
        }
    });
    //검색창에서 엔터키 눌렀을 때도 검색 실행됨.
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const keyword = searchInput.value.trim();
            if (keyword) {
                window.location.href = `/?search=${encodeURIComponent(keyword)}`;
            }
        }
    });

    // 필터 바에 있는 버튼 누르면 검색.
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
    if (searchQuery) {
        searchInput.value = searchQuery;
        handleSearch(searchQuery);
    } else {
        videoGrid.style.display = "grid";
        searchResult.style.display = "none";
    }

});  //DOMContentLoaded 마지막