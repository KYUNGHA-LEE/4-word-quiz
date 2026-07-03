<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>실시간 OX 퀴즈 - 교사용</title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, "Pretendard", sans-serif;
      background: #f3f4f6;
      color: #111827;
      min-height: 100vh;
    }

    .page {
      max-width: 1280px;
      margin: 0 auto;
      padding: 20px;
    }

    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
      padding: 16px 20px;
      background: #111827;
      color: white;
      border-radius: 12px;
    }

    .top-bar h1 {
      margin: 0;
      font-size: 28px;
    }

    .top-status {
      font-size: 18px;
      font-weight: 700;
      padding: 10px 14px;
      background: rgba(255, 255, 255, 0.14);
      border-radius: 10px;
      white-space: nowrap;
    }

    .main-grid {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 16px;
      align-items: start;
    }

    .panel {
      background: white;
      border: 1px solid #d1d5db;
      border-radius: 12px;
      padding: 18px;
      margin-bottom: 16px;
    }

    .section-title {
      margin: 0 0 12px;
      font-size: 22px;
      font-weight: 800;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 700;
    }

    select,
    textarea {
      width: 100%;
      border: 1px solid #9ca3af;
      border-radius: 10px;
      padding: 12px;
      font-size: 18px;
      font-family: Arial, "Pretendard", sans-serif;
      background: white;
    }

    textarea {
      min-height: 140px;
      resize: vertical;
      line-height: 1.5;
      white-space: pre;
    }

    .current-question {
      min-height: 170px;
      margin: 14px 0;
      padding: 24px;
      background: #f9fafb;
      border: 2px solid #d1d5db;
      border-radius: 12px;
      display: flex;
      align-items: center;
      font-size: 42px;
      line-height: 1.25;
      font-weight: 900;
      word-break: keep-all;
    }

    .meta-row {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 14px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 36px;
      padding: 8px 12px;
      border-radius: 999px;
      background: #e5e7eb;
      font-size: 16px;
      font-weight: 800;
    }

    .badge.answer-hidden {
      background: #e5e7eb;
      color: #374151;
    }

    .badge.answer-open {
      background: #dcfce7;
      color: #166534;
    }

    .button-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }

    button {
      border: 0;
      border-radius: 10px;
      padding: 16px 12px;
      font-size: 20px;
      font-weight: 900;
      cursor: pointer;
    }

    button:active {
      transform: translateY(1px);
    }

    .btn-start {
      background: #2563eb;
      color: white;
    }

    .btn-reveal {
      background: #16a34a;
      color: white;
    }

    .btn-next {
      background: #374151;
      color: white;
    }

    .btn-reset {
      background: #dc2626;
      color: white;
    }

    .btn-import {
      background: #7c3aed;
      color: white;
    }

    .btn-preview {
      background: #4b5563;
      color: white;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .stat {
      background: #f9fafb;
      border: 1px solid #d1d5db;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
    }

    .stat-label {
      font-size: 16px;
      font-weight: 800;
      color: #4b5563;
      margin-bottom: 8px;
    }

    .stat-value {
      font-size: 54px;
      line-height: 1;
      font-weight: 900;
    }

    .o-value {
      color: #2563eb;
    }

    .x-value {
      color: #dc2626;
    }

    .ok-value {
      color: #16a34a;
    }

    .table-wrap {
      width: 100%;
      overflow-x: auto;
      border: 1px solid #d1d5db;
      border-radius: 10px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 16px;
      background: white;
    }

    th,
    td {
      border-bottom: 1px solid #e5e7eb;
      padding: 10px;
      text-align: left;
      vertical-align: top;
    }

    th {
      background: #f3f4f6;
      font-weight: 900;
    }

    tr:last-child td {
      border-bottom: 0;
    }

    .import-actions {
      display: flex;
      gap: 10px;
      margin-top: 10px;
      margin-bottom: 12px;
    }

    .import-actions button {
      font-size: 17px;
      padding: 12px 16px;
    }

    .message {
      margin-top: 8px;
      min-height: 24px;
      font-weight: 800;
      color: #dc2626;
    }

    .right-column {
      position: sticky;
      top: 16px;
    }

    .compact-text {
      font-size: 14px;
      color: #4b5563;
      margin-top: 8px;
      line-height: 1.5;
    }

    .correct {
      color: #16a34a;
      font-weight: 900;
    }

    .wrong {
      color: #dc2626;
      font-weight: 900;
    }

    @media (max-width: 900px) {
      .main-grid {
        grid-template-columns: 1fr;
      }

      .right-column {
        position: static;
      }

      .button-row {
        grid-template-columns: 1fr 1fr;
      }

      .current-question {
        font-size: 30px;
      }

      .top-bar {
        flex-direction: column;
        align-items: stretch;
      }
    }
  </style>
</head>

<body>
  <div class="page">
    <header class="top-bar">
      <h1>실시간 OX 퀴즈 관리자</h1>
      <div id="topStatus" class="top-status">상태 확인 중</div>
    </header>

    <div class="main-grid">
      <main>
        <section class="panel">
          <h2 class="section-title">현재 문제</h2>

          <label for="questionSelect">문제 선택</label>
          <select id="questionSelect"></select>

          <div id="questionText" class="current-question">문제를 불러오는 중입니다.</div>

          <div class="meta-row">
            <span id="questionNumberBadge" class="badge">문제 번호: -</span>
            <span id="statusBadge" class="badge">상태: 확인 중</span>
            <span id="answerBadge" class="badge answer-hidden">정답: 비공개</span>
          </div>

          <div class="button-row">
            <button class="btn-start" onclick="startQuestion()">문제 시작</button>
            <button class="btn-reveal" onclick="revealAnswer()">정답 공개</button>
            <button class="btn-next" onclick="goNextQuestion()">다음 문제</button>
            <button class="btn-reset" onclick="resetStudents()">답변 초기화</button>
          </div>
        </section>

        <section class="panel">
          <h2 class="section-title">문제 일괄 등록</h2>
          <textarea id="bulkQuestionInput" placeholder="시트에서 복사한 내용을 붙여넣으세요.
가능 형식 1: 문제 / 정답
가능 형식 2: 번호 / 문제 / 정답

예:
번호	문제	정답
1	인터넷에 올린 글과 사진은 시간이 지나도 다른 사람이 저장해 두었을 수 있다.	O
2	AI가 알려준 답은 항상 정확하므로 다른 자료와 비교하지 않아도 된다.	X"></textarea>

          <div class="import-actions">
            <button class="btn-preview" onclick="previewQuestions()">미리보기</button>
            <button class="btn-import" onclick="saveQuestionsToFirebase()">Firebase에 저장</button>
          </div>

          <div id="bulkMessage" class="message"></div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th style="width: 80px;">번호</th>
                  <th>문제</th>
                  <th style="width: 80px;">정답</th>
                </tr>
              </thead>
              <tbody id="previewTable">
                <tr>
                  <td colspan="3">아직 미리보기 내용이 없습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="compact-text">
            저장하면 기존 Firebase의 questions 목록이 새 문제 목록으로 교체됩니다.
          </div>
        </section>

        <section class="panel">
          <h2 class="section-title">학생 응답 목록</h2>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>닉네임</th>
                  <th style="width: 90px;">선택</th>
                  <th style="width: 110px;">정답 여부</th>
                </tr>
              </thead>
              <tbody id="studentTable">
                <tr>
                  <td colspan="3">아직 참여자가 없습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <aside class="right-column">
        <section class="panel">
          <h2 class="section-title">실시간 집계</h2>
          <div class="stats-grid">
            <div class="stat">
              <div class="stat-label">O 선택</div>
              <div id="oCount" class="stat-value o-value">0</div>
            </div>
            <div class="stat">
              <div class="stat-label">X 선택</div>
              <div id="xCount" class="stat-value x-value">0</div>
            </div>
            <div class="stat">
              <div class="stat-label">제출</div>
              <div id="submitCount" class="stat-value">0</div>
            </div>
            <div class="stat">
              <div class="stat-label">정답</div>
              <div id="correctCount" class="stat-value ok-value">0</div>
            </div>
          </div>
        </section>
      </aside>
    </div>
  </div>

  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
    import {
      getDatabase,
      ref,
      onValue,
      update,
      set
    } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

    const firebaseConfig = {
      apiKey: "AIzaSyAqqQYRZGCLrL3ftdIToPrQ_7q2EwcmaaM",
      authDomain: "ox-quiz-game-c8248.firebaseapp.com",
      databaseURL: "https://ox-quiz-game-c8248-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "ox-quiz-game-c8248",
      storageBucket: "ox-quiz-game-c8248.firebasestorage.app",
      messagingSenderId: "1054918706871",
      appId: "1:1054918706871:web:83ef8514154c53e1436f32",
      measurementId: "G-8CQQCCWCMM"
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    let questions = {};
    let questionIds = [];
    let currentQuestionId = "q1";
    let currentAnswer = "O";
    let gameStatus = "waiting";
    let students = {};
    let parsedQuestions = [];

    const topStatus = document.getElementById("topStatus");
    const questionSelect = document.getElementById("questionSelect");
    const questionText = document.getElementById("questionText");
    const questionNumberBadge = document.getElementById("questionNumberBadge");
    const statusBadge = document.getElementById("statusBadge");
    const answerBadge = document.getElementById("answerBadge");
    const oCountEl = document.getElementById("oCount");
    const xCountEl = document.getElementById("xCount");
    const submitCountEl = document.getElementById("submitCount");
    const correctCountEl = document.getElementById("correctCount");
    const studentTable = document.getElementById("studentTable");
    const bulkQuestionInput = document.getElementById("bulkQuestionInput");
    const previewTable = document.getElementById("previewTable");
    const bulkMessage = document.getElementById("bulkMessage");

    listenQuestions();
    listenGame();
    listenStudents();

    function listenQuestions() {
      onValue(ref(db, "questions"), (snapshot) => {
        questions = snapshot.val() || {};
        questionIds = Object.keys(questions).sort((a, b) => {
          const numA = Number(a.replace("q", ""));
          const numB = Number(b.replace("q", ""));
          return numA - numB;
        });

        renderQuestionSelect();
        renderCurrentQuestion();
      });
    }

    function listenGame() {
      onValue(ref(db, "game"), (snapshot) => {
        const game = snapshot.val() || {};

        currentQuestionId = game.currentQuestionId || "q1";
        gameStatus = game.status || "waiting";

        renderQuestionSelect();
        renderCurrentQuestion();
        renderStats();
      });
    }

    function listenStudents() {
      onValue(ref(db, "students"), (snapshot) => {
        students = snapshot.val() || {};
        renderStats();
        renderStudentTable();
      });
    }

    function renderQuestionSelect() {
      questionSelect.innerHTML = "";

      if (questionIds.length === 0) {
        const option = document.createElement("option");
        option.textContent = "등록된 문제가 없습니다.";
        questionSelect.appendChild(option);
        return;
      }

      questionIds.forEach((id) => {
        const option = document.createElement("option");
        option.value = id;
        option.textContent = `${id} - ${questions[id].text}`;
        if (id === currentQuestionId) option.selected = true;
        questionSelect.appendChild(option);
      });
    }

    function renderCurrentQuestion() {
      const q = questions[currentQuestionId];

      if (!q) {
        questionText.textContent = "문제가 없습니다.";
        topStatus.textContent = "문제 없음";
        questionNumberBadge.textContent = "문제 번호: -";
        statusBadge.textContent = "상태: 문제 없음";
        answerBadge.textContent = "정답: 비공개";
        answerBadge.className = "badge answer-hidden";
        return;
      }

      currentAnswer = q.answer;
      questionText.textContent = q.text;
      questionNumberBadge.textContent = `문제 번호: ${currentQuestionId}`;

      const statusText = {
        waiting: "대기 중",
        playing: "문제 진행 중",
        revealed: "정답 공개"
      }[gameStatus] || gameStatus;

      topStatus.textContent = statusText;
      statusBadge.textContent = `상태: ${statusText}`;

      if (gameStatus === "revealed") {
        answerBadge.textContent = `정답: ${currentAnswer}`;
        answerBadge.className = "badge answer-open";
      } else {
        answerBadge.textContent = "정답: 비공개";
        answerBadge.className = "badge answer-hidden";
      }
    }

    function parseBulkQuestions() {
      const raw = bulkQuestionInput.value.trim();
      bulkMessage.textContent = "";

      if (!raw) {
        throw new Error("붙여넣은 문제가 없습니다.");
      }

      const lines = raw
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      const result = [];

      lines.forEach((line, index) => {
        let parts = line.split("\t").map((item) => item.trim());

        if (parts.length < 2) {
          parts = line.split(",").map((item) => item.trim());
        }

        if (parts.length < 2) {
          throw new Error(`${index + 1}번째 줄의 형식이 맞지 않습니다.`);
        }

        const first = parts[0];
        const last = parts[parts.length - 1].toUpperCase();

        if (index === 0) {
          const joined = parts.join(" ");
          if (joined.includes("문제") && joined.includes("정답")) {
            return;
          }
        }

        let text = "";
        let answer = last;

        if ((parts.length >= 3 && /^\d+$/.test(first)) || first === "번호") {
          text = parts.slice(1, parts.length - 1).join(" ").trim();
        } else {
          text = parts.slice(0, parts.length - 1).join(" ").trim();
        }

        if (!text) {
          throw new Error(`${index + 1}번째 줄에 문제 내용이 없습니다.`);
        }

        if (answer !== "O" && answer !== "X") {
          throw new Error(`${index + 1}번째 줄의 정답은 O 또는 X만 가능합니다.`);
        }

        result.push({ text, answer });
      });

      if (result.length === 0) {
        throw new Error("등록할 문제가 없습니다.");
      }

      return result;
    }

    window.previewQuestions = function () {
      try {
        parsedQuestions = parseBulkQuestions();
        renderPreview(parsedQuestions);
        bulkMessage.style.color = "#166534";
        bulkMessage.textContent = `${parsedQuestions.length}개의 문제를 확인했습니다.`;
      } catch (error) {
        parsedQuestions = [];
        previewTable.innerHTML = '<tr><td colspan="3">미리보기 실패</td></tr>';
        bulkMessage.style.color = "#dc2626";
        bulkMessage.textContent = error.message;
      }
    };

    function renderPreview(list) {
      previewTable.innerHTML = "";

      list.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>q${index + 1}</td>
          <td>${escapeHtml(item.text)}</td>
          <td>${item.answer}</td>
        `;
        previewTable.appendChild(tr);
      });
    }

    window.saveQuestionsToFirebase = async function () {
      try {
        parsedQuestions = parseBulkQuestions();

        const newQuestions = {};
        parsedQuestions.forEach((item, index) => {
          newQuestions[`q${index + 1}`] = {
            text: item.text,
            answer: item.answer
          };
        });

        await set(ref(db, "questions"), newQuestions);
        await update(ref(db), {
          "game/currentQuestionId": "q1",
          "game/status": "waiting",
          "game/showAnswer": false
        });
        await clearStudentAnswers();

        renderPreview(parsedQuestions);
        bulkMessage.style.color = "#166534";
        bulkMessage.textContent = `${parsedQuestions.length}개의 문제를 Firebase에 저장했습니다.`;
      } catch (error) {
        bulkMessage.style.color = "#dc2626";
        bulkMessage.textContent = error.message;
      }
    };

    questionSelect.addEventListener("change", async () => {
      currentQuestionId = questionSelect.value;
      await update(ref(db), {
        "game/currentQuestionId": currentQuestionId,
        "game/status": "waiting",
        "game/showAnswer": false
      });
      await clearStudentAnswers();
    });

    window.startQuestion = async function () {
      if (!currentQuestionId) {
        alert("문제를 먼저 선택하세요.");
        return;
      }

      await update(ref(db), {
        "game/currentQuestionId": currentQuestionId,
        "game/status": "playing",
        "game/showAnswer": false
      });

      await clearStudentAnswers();
    };

    window.revealAnswer = async function () {
      await update(ref(db), {
        "game/status": "revealed",
        "game/showAnswer": true
      });

      const updates = {};
      Object.keys(students).forEach((studentId) => {
        const answer = students[studentId].answer || "";
        updates[`students/${studentId}/isCorrect`] = answer === currentAnswer;
      });

      if (Object.keys(updates).length > 0) {
        await update(ref(db), updates);
      }
    };

    window.goNextQuestion = async function () {
      if (questionIds.length === 0) {
        alert("등록된 문제가 없습니다.");
        return;
      }

      const currentIndex = questionIds.indexOf(currentQuestionId);
      const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % questionIds.length;
      const nextId = questionIds[nextIndex];

      currentQuestionId = nextId;

      await update(ref(db), {
        "game/currentQuestionId": nextId,
        "game/status": "waiting",
        "game/showAnswer": false
      });

      await clearStudentAnswers();
    };

    window.resetStudents = async function () {
      await clearStudentAnswers();
    };

    async function clearStudentAnswers() {
      const updates = {};

      Object.keys(students).forEach((studentId) => {
        updates[`students/${studentId}/answer`] = "";
        updates[`students/${studentId}/isCorrect`] = false;
      });

      if (Object.keys(updates).length > 0) {
        await update(ref(db), updates);
      }
    }

    function renderStats() {
      const list = Object.values(students);
      const oCount = list.filter((s) => s.answer === "O").length;
      const xCount = list.filter((s) => s.answer === "X").length;
      const submitCount = list.filter((s) => s.answer === "O" || s.answer === "X").length;
      const correctCount = gameStatus === "revealed"
        ? list.filter((s) => s.answer && s.answer === currentAnswer).length
        : 0;
= oCount;
      xCountEl.textContent = xCount;
      submitCountEl.textContent = submitCount;
      correctCountEl.textContent = correctCount;
    }

    function renderStudentTable() {
      const entries = Object.entries(students);

      if (entries.length === 0) {
        studentTable.innerHTML = '<tr><td colspan="3">아직 참여자가 없습니다.</td></tr>';
        return;
      }

      studentTable.innerHTML = "";

      entries.forEach(([id, student]) => {
        const tr = document.createElement("tr");

        const answer = student.answer || "-";
        const result =
          gameStatus !== "revealed"
            ? "-"
            : answer === currentAnswer
              ? "정답"
              : "오답";

        tr.innerHTML = `
          <td>${escapeHtml(student.name || id)}</td>
          <td>${answer}</td>
          <td class="${result === "정답" ? "correct" : result === "오답" ? "wrong" : ""}">${result}</td>
        `;

        studentTable.appendChild(tr);
      });
    }

    function escapeHtml(text) {
      return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }
  </script>
</body>
</html>
