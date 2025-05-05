// utils/generateComic.js
const STORAGE_KEY = "daily_comic_cache";
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export async function generateComic(todos) {
  const today = new Date().toISOString().split("T")[0];

  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) {
    const { date, imageUrl } = JSON.parse(cached);
    if (date === today) return imageUrl;
  }

  const prompt = `
사용자의 오늘 할 일 목록은 다음과 같습니다:

${todos.map((todo, i) => `${i + 1}. ${todo.contents}`).join("\n")}

이 정보를 바탕으로 한 사람의 하루를 보여주는 4컷 만화를 그려줘. 
오늘 할 일 목록을 통해서 만화라는 것을 이용해서 하루를 요약해줘.

각 컷은 시간 순서에 따라 스토리가 이어지며, 다음 조건을 충족해야 해:
- 그림 스타일: 일본식 4컷 만화, 드래곤볼Z 느낌의 작화
- 1장의 이미지 안에 4개의 컷이 명확하게 분할되어 있어야 함
- 각 컷은 만화의 주인공이 할 일을 수행하는 모습을 보여줘
- 컷마다 대사와 상황 설명이 포함되어 있어야 해
- 컷의 배경은 주인공이 할 일을 수행하는 장소에 맞춰야 해
- 컷의 크기와 위치는 균형 있게 배치되어야 해
- 컷의 대사는 만화의 주인공이 하는 말로 작성되어야 해

만화의 레이아웃과 구성에 신경 써서 그려줘.
`;

  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    }),
  });

  const data = await res.json();
  const b64 = data.data[0].b64_json;
  // base64 문자열을 브라우저용 이미지 URL로 변환
  const imageUrl = `data:image/png;base64,${b64}`;

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, imageUrl }));

  return imageUrl;
}
