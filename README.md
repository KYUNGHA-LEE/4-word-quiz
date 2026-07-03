# 실시간 4글자 퀴즈 게임

## 파일
- `index.html`: 단일 파일 웹앱
- `database.rules.json`: Firebase Realtime Database 테스트용 규칙 예시

## 게임 방식
- 학생 화면에는 `스파-____`처럼 앞 2글자가 표시됩니다.
- 학생은 뒤 2글자, 예: `게티`를 입력합니다.
- 정답 제출 순서대로 점수가 차등 지급됩니다.
- 참가자 10명 기준 1등 10점, 10등 1점입니다.
- 오답과 미제출은 0점입니다.

## Firebase에서 필요한 설정
1. Firebase Authentication에서 익명 로그인을 사용 설정합니다.
2. Realtime Database를 생성합니다.
3. `index.html` 상단의 `firebaseConfig`에 본인 Firebase 웹앱 설정값을 넣습니다.
4. 테스트 중에는 `database.rules.json`의 규칙을 참고해 Realtime Database 규칙에 넣을 수 있습니다.

## 중요
학생 입장 오류를 줄이기 위해 다음 순서를 코드에 반영했습니다.

1. 닉네임 확인
2. Firebase 익명 로그인
3. `auth.currentUser.uid` 확인
4. `rooms/defaultRoom/players/{uid}`에 학생 정보 저장
5. 게임 상태 실시간 구독

## 주의
아래 규칙은 수업 테스트용으로 단순화한 예시입니다.
실제 공개 서비스로 운영할 때는 보안 규칙을 더 엄격하게 설계해야 합니다.
