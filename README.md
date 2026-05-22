# AIVLE 4차 미니프로젝트 22조

## 처음 실행

```bash
npm install
npm run dev
```

터미널에 나온 주소로 접속하면 됩니다.

## 브랜치

각자 맡은 브랜치에서 작업합니다.

```text
UI·레이아웃: feature/ui
CRUD 연동: feature/crud
OpenAI 연동: feature/llm
스타일링·QA: feature/style-qa
```

예시:

```bash
git checkout feature/ui
```

## 작업 순서

작업 전:

```bash
git pull
```

작업 후:

```bash
npm run build
git add .
git commit -m "작업 내용"
git push
```

## API 키

API 키는 GitHub에 올리지 않습니다.
실제 키는 `.env` 파일에 넣고, 예시는 `.env.example`을 참고합니다.
