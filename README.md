# 실시간 4글자 퀴즈 게임

앞 2글자를 보고 뒤 2글자를 맞히는 Firebase Realtime Database 기반 실시간 교실 게임입니다.

## 포함 파일

```text
index.html
api/check-admin.js
database.rules.json
README.md
```

## 보안 구조

강사 비밀번호는 `index.html`에 직접 들어가지 않습니다.

강사 로그인 흐름은 다음과 같습니다.

1. 강사가 비밀번호 입력
2. `index.html`이 `/api/check-admin`으로 비밀번호 확인 요청
3. Vercel 서버리스 함수가 환경변수 `ADMIN_PASSWORD`와 비교
4. 비밀번호가 맞으면 Firebase 익명 로그인 후 강사 화면 입장

## Vercel 환경변수

Vercel 배포 전에 Environment Variables에 아래 값을 추가하세요.

```text
Name: ADMIN_PASSWORD
Value: 원하는 강사 비밀번호
Environment: Production, Preview, Development 전체 선택 권장
```

비밀번호는 GitHub README나 코드에 적어두지 않는 것을 권장합니다.

## Firebase에서 꼭 켤 것

Authentication > Sign-in method > Anonymous를 사용 설정해야 합니다.

## Firebase Realtime Database 규칙 예시

`database.rules.json`의 내용을 Firebase Realtime Database Rules 화면에 붙여넣고 게시하세요.

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

## 배포 방식

GitHub에는 최소 아래 파일/폴더를 올리세요.

```text
index.html
api/check-admin.js
README.md
```

Vercel에서 GitHub 저장소를 연결한 뒤, 환경변수 `ADMIN_PASSWORD`를 설정하고 Deploy를 누르면 됩니다.
## 화면 자동 맞춤

이번 버전은 강사 화면과 학생 화면 모두 반응형으로 조정됩니다.
노트북, 교실 TV, 태블릿, 스마트폰 화면 폭에 따라 카드와 버튼, 문제 영역, 점수판이 자동으로 재배치됩니다.
세로 높이가 낮은 노트북 화면에서는 제목과 문제 영역 크기를 줄여 한 화면에 더 잘 들어오도록 조정했습니다.

