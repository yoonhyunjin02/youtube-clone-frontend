// html보다 나중에 js가 실행되도록 DOMContentLoaded 감쌈
document.addEventListener("DOMContentLoaded", () => {
    // 검색창, 검색버튼, 영상리스트 불러오기
    const searchInput = document.querySelector(".search-form input[type='search']");
    const searchBtn = document.querySelector(".search-form button");
    const videoGrid = document.querySelector(".video-grid");
    const searchResult = document.querySelector(".search-result");

    videoGrid.style.display = "grid";
    searchResult.style.display = "none";
    
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
    async function handleSearch() {
        const keyword = searchInput.value.toLowerCase(); //필터 키워드 저장

        if (keyword === "") {
            //검색어 없으면 홈 화면 다시 보여주기
            videoGrid.style.display = "grid";
            searchResult.style.display = "none";
            return;
        }
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
    
    //버튼 기능 실행
    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();  // 폼 전송 막기
        handleSearch();
    });
    
    
});  //DOMContentLoaded 마지막