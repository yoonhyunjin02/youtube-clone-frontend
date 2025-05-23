// utils/ai.js
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const similarityCache = new Map();
require('dotenv').config();

const apiKey = process.env.ETRI_API_KEY;
console.log('[ETRI API KEY]', apiKey);
const USE_DUMMY = false; // 개발 중에는 사용량 제한으로 인해 true(더미 데이터)로 설정

// 더미 유사도 생성기 (0.5 ~ 1.0 사이 랜덤 값)
function getDummySimilarity(firstWord, secondWord) {
    const seed = (firstWord + secondWord).length;
    return 0.5 + (seed % 10) / 20; // 0.5 ~ 1.0 범위
}

async function getSimilarity(firstWord, secondWord) {
    const key = `${firstWord}-${secondWord}`;
    const reverseKey = `${secondWord}-${firstWord}`;

    if (similarityCache.has(key)) {
        // console.log(key) # 캐싱 실행하는 key 출력
        // console.log(similarityCache) # 현재의 similarity map 출력
        return similarityCache.get(key)
    };
    if (similarityCache.has(reverseKey)) {
        return similarityCache.get(reverseKey)
    };
    //console.log(similarityCache) // similarityCache map내에 저장된 단어 쌍
    if (
        firstWord === secondWord ||
        firstWord.includes(secondWord) ||
        secondWord.includes(firstWord)
    ) {
        similarityCache.set(key, 1);
        return 1;
    }

    if (USE_DUMMY) {
        const dummyScore = getDummySimilarity(firstWord, secondWord);
        similarityCache.set(key, dummyScore);
        return dummyScore;
    }

    try {
        const response = await fetch('https://www.techfree-oreumi-api.ai.kr/WiseWWN/WordRel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apiKey,
            },
            body: JSON.stringify({
                argument: {
                    first_word: firstWord,
                    second_word: secondWord,
                },
            }),
        });


        // ETRI 점수로 유사도 계산
        const data = await response.json();

        const simList = data?.return_object?.['WWN WordRelInfo']?.WordRelInfo?.Similarity;
        const etriScore = simList?.find(s => s.Algorithm === 'ETRI')?.SimScore ?? 0;

        similarityCache.set(key, etriScore);
        return etriScore;
    } catch (error) {
        console.error(`유사도 계산 실패 (${firstWord}, ${secondWord}):`, error);
        return 0;
    }
}

async function calculateAverageSimilarity(query, videos, topN = 2) {
    const queryWords = [...new Set(query.trim().split(/\s+/))];

    for (const video of videos) {
        let totalSim = 0;
        let count = 0;

        const tags = (video.tags || []).slice(0, topN);

        for (const tag of tags) {
            for (const word of queryWords) {
                const sim = await getSimilarity(word, tag);
                totalSim += sim;
                count++;
            }
        }

        video.averageSimilarity = count ? totalSim / count : 0;
    }

    // 유사도 기준 정렬 (내림차순)
    videos.sort((a, b) => b.averageSimilarity - a.averageSimilarity);
    return videos;
}

module.exports = {
    getSimilarity,
    similarityCache,
    calculateAverageSimilarity,
};
