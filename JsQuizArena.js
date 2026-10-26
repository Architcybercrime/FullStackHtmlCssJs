const quiz = document.querySelector('#quiz') || document.body;
const questions = [];
let index = 0, score = 0, time = 30, timer, missed = [];

quiz.innerHTML = '<h1>Quiz Arena</h1><div id="game"></div>';
const game = quiz.querySelector('#game');

document.head.insertAdjacentHTML('beforeend', `<style>
  #quiz{max-width:700px;margin:30px auto;padding:24px;font:16px Arial;color:#172033;background:#f5f7fb;border-radius:12px}
  #quiz button{display:block;width:100%;margin:10px 0;padding:12px;border:1px solid #ccd1df;border-radius:7px;background:white;text-align:left;font:inherit;cursor:pointer}
  #quiz button:hover:not(:disabled){border-color:#6558f5}.top,.actions{display:flex;justify-content:space-between;align-items:center;gap:12px}
  .actions button{width:auto!important;padding:10px 18px!important;background:#6558f5!important;color:white}.correct{background:#dff5e9!important;border-color:#15925e!important}
  .wrong{background:#fbe2e7!important;border-color:#d5485f!important}.explanation{padding:12px;background:#e9ebff}.review{padding:12px;background:white}.error{color:#c62845}
</style>`);

const shuffle = list => {
  for (let i = list.length - 1; i; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
};

function parse(text) {
  const answers = text.split(/(?=Q\d+\.\s+)/i).map(block => {
    const match = block.match(/Q\d+\.\s*(.*?)\s+Answer:\s*(.*?)(?=\s+Q\d+\.|$)/i);
    if (!match) return null;
    return {
      question: match[1].trim(),
      answer: match[2].split(/\s+\.\s+/)[0].trim()
    };
  }).filter(Boolean);
  if (!answers.length) throw Error('No questions found in the PDF.');

  return answers.map(item => {
    const options = [item.answer];
    answers.forEach(other => {
      if (other !== item && options.length < 4 && !options.includes(other.answer)) options.push(other.answer);
    });
    while (options.length < 4) options.push('None of these');
    shuffle(options);
    return {
      question: item.question,
      options,
      answer: options.indexOf(item.answer),
      explanation: `Answer: ${item.answer}`
    };
  });
}

async function pdfText(file) {
  if (!window.pdfjsLib) await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = resolve;
    script.onerror = () => reject(Error('Could not load the PDF reader.'));
    document.head.appendChild(script);
  });
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
  let text = '';
  for (let page = 1; page <= pdf.numPages; page++) {
    const data = await (await pdf.getPage(page)).getTextContent();
    text += data.items.map(item => item.str).join(' ');
  }
  return text;
}

function showQuestion() {
  clearInterval(timer);
  time = 30;
  const item = questions[index];
  game.innerHTML = `
    <div class="top"><b>Q ${index + 1}/${questions.length}</b><b id="time">30s</b></div>
    <h2>${item.question}</h2>
    <div>${item.options.map((option, i) => `<button data-option="${i}">${option}</button>`).join('')}</div>
    <p class="explanation" hidden></p>
    <div class="actions"><span>Score: ${score}</span><button id="next" disabled>Next</button></div>`;

  game.querySelectorAll('[data-option]').forEach(button => {
    button.onclick = () => answer(+button.dataset.option);
  });
  game.querySelector('#next').onclick = () => {
    if (index === questions.length - 1) results();
    else { index++; showQuestion(); }
  };
  timer = setInterval(() => {
    game.querySelector('#time').textContent = `${--time}s`;
    if (!time) answer(-1);
  }, 1000);
}

function answer(choice) {
  const next = game.querySelector('#next');
  if (!next.disabled) return;
  clearInterval(timer);
  const item = questions[index], correct = choice === item.answer;
  if (correct) score++;
  else missed.push({ ...item, selected: choice < 0 ? 'No answer' : item.options[choice] });

  game.querySelectorAll('[data-option]').forEach(button => {
    const option = +button.dataset.option;
    button.disabled = true;
    if (option === item.answer) button.classList.add('correct');
    if (option === choice && !correct) button.classList.add('wrong');
  });
  const note = game.querySelector('.explanation');
  note.textContent = choice < 0 ? `Time is up. ${item.explanation}` : item.explanation;
  note.hidden = false;
  next.disabled = false;
  next.textContent = index === questions.length - 1 ? 'Results' : 'Next';
  game.querySelector('.actions span').textContent = `Score: ${score}`;
}

function results() {
  clearInterval(timer);
  game.innerHTML = `
    <h2>Final score: ${score}/${questions.length}</h2>
    <p>${score / questions.length >= .8 ? 'Great job!' : 'Keep practising!'}</p>
    <div class="actions"><button id="restart">Restart</button>${missed.length ? '<button id="review">Review wrong answers</button>' : ''}</div>
    <div id="review-box"></div>`;
  game.querySelector('#restart').onclick = start;
  game.querySelector('#review')?.addEventListener('click', () => {
    game.querySelector('#review-box').innerHTML = `<div class="review"><h3>Wrong answers</h3>${missed.map(item =>
      `<p><b>${item.question}</b><br>Your answer: ${item.selected}<br>Correct answer: ${item.options[item.answer]}</p>`).join('')}</div>`;
  });
}

function start() {
  index = score = 0;
  missed = [];
  shuffle(questions);
  showQuestion();
}

fetch('./JavaScript_20_Questions.pdf')
  .then(response => response.ok ? response.blob() : Promise.reject(Error('Could not load the PDF.')))
  .then(blob => pdfText(new File([blob], 'questions.pdf')))
  .then(text => { questions.push(...parse(text)); start(); })
  .catch(error => { game.innerHTML = `<p class="error">${error.message}</p>`; });
