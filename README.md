# 실시간 4글자 퀴즈 게임

앞 2글자를 보고 뒤 2글자를 맞히는 Firebase Realtime Database 기반 실시간 교실 게임입니다.

## 포함 파일

```text
index.html
database.rules.json
README.md
```

## 강사 입장 방법

강사 입장에는 비밀번호가 없습니다. 배포된 주소 뒤에 `?mode=admin` 을 붙여 접속하면 바로 강사 화면이 열립니다.

```text
학생: https://내주소.vercel.app
강사: https://내주소.vercel.app/?mode=admin
```

강사 주소는 학생에게 알려주지 마세요. 주소를 아는 사람은 누구나 강사 화면을 열 수 있습니다(수업용 신뢰 기반).

## 배포 전에 할 일 (Firebase)

1. Firebase 프로젝트 생성 후 웹 앱 추가
2. 발급된 `firebaseConfig` 값을 `index.html` 상단의 `firebaseConfig` 자리에 붙여넣기
3. Authentication > Sign-in method > **Anonymous(익명)** 사용 설정
4. Realtime Database 생성 후 `database.rules.json`의 내용을 Rules 화면에 붙여넣고 게시

## Firebase Realtime Database 규칙 예시

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    }
  }
}
```

## 배포 방식 (Vercel)

1. GitHub 저장소를 만들고 `index.html`, `database.rules.json`, `README.md`를 업로드
2. Vercel에서 GitHub 저장소를 연결하고 Deploy

환경변수 설정은 필요 없습니다.

## 문제 바꾸기

`index.html` 안의 단어 목록(`{ full: "스파게티", front: "스파", back: "게티", hint: "음식" }` 형식)을 수정하면 자기만의 문제로 바꿀 수 있습니다.

## 화면 자동 맞춤

강사 화면과 학생 화면 모두 반응형으로 조정됩니다.
노트북, 교실 TV, 태블릿, 스마트폰 화면 폭에 따라 카드와 버튼, 문제 영역, 점수판이 자동으로 재배치됩니다.
세로 높이가 낮은 노트북 화면에서는 제목과 문제 영역 크기를 줄여 한 화면에 더 잘 들어오도록 조정했습니다.
