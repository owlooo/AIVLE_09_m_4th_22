# AIVLE 4th Mini Project - Team 22

프론트엔드 프로젝트입니다.

## 처음 받을 때

```bash
npm install
npm run dev
```

터미널에 나온 주소로 접속하면 됩니다.

보통은 아래 주소입니다.

```bash
http://localhost:5173
```

## 작업할 때

작업 전에 최신 코드부터 받아주세요.

```bash
git pull
```

브랜치는 역할별로 나눠서 작업합니다.

```text
feature/ui
feature/crud
feature/llm
feature/style-qa
```

자기 브랜치로 이동해서 작업합니다.

```bash
git checkout feature/브랜치명
```

작업 후에는 아래 순서로 올리면 됩니다.

```bash
git status
git add .
git commit -m "작업 내용"
git push
```

## API 키

API 키는 GitHub에 올리면 안 됩니다.

개인 `.env` 파일에만 넣고 사용합니다.

예시는 `.env.example` 파일을 참고하면 됩니다.

## 자주 쓰는 명령어

```bash
npm run dev
npm run build
npm run lint
```

`npm run dev`: 개발 서버 실행  
`npm run build`: 배포용 빌드 확인  
`npm run lint`: 코드 검사
