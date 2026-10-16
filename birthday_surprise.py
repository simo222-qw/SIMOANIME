from flask import Flask, request, render_template_string

app = Flask(__name__)

PAGE = r"""
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>✨ A Special Surprise</title>
<style>
:root { --pink:#ff4fa3; --purple:#b56cff; --gold:#ffe29a; }
* { box-sizing: border-box; }
html, body { margin:0; min-height:100%; }
body {
  min-height:100vh; background:#000; color:#fff;
  font-family: Inter, Arial, sans-serif; overflow-x:hidden;
}
#entry {
  min-height:100vh; display:flex; align-items:center; justify-content:center;
  padding:24px; background:#000;
}
form { width:min(460px,100%); display:flex; gap:10px; justify-content:center; }
input {
  width:33.333%; min-width:0; padding:17px 5px; text-align:center;
  background:#050505; color:#fff; border:1px solid #161616;
  border-radius:12px; outline:none; font-size:18px; letter-spacing:1px;
  transition:border-color .25s, box-shadow .25s;
}
input:focus { border-color:#393939; box-shadow:0 0 20px #ffffff0a; }
input::placeholder { color:#777; }
#error { display:none; text-align:center; color:#ff7070; font-size:14px; margin-top:16px; }
#party { display:none; min-height:100vh; position:relative; overflow:hidden;
  background:radial-gradient(ellipse at 50% 0%,#4b155f 0%,#180b2f 40%,#070711 78%,#000 100%);
}
#party.show { display:block; animation:worldAwake 1.8s ease both; }
@keyframes worldAwake { from { opacity:0; filter:brightness(0); } to { opacity:1; filter:brightness(1); } }
.aurora {
  position:absolute; inset:-30% -20% auto; height:70vh; pointer-events:none;
  background:linear-gradient(110deg,transparent,#ff4fa322,#7b5cff33,transparent);
  filter:blur(45px); animation:aurora 9s ease-in-out infinite alternate;
}
@keyframes aurora { from { transform:translateX(-10%) rotate(-8deg); } to { transform:translateX(10%) rotate(8deg); } }
.content { position:relative; z-index:2; width:min(760px,100%); margin:auto; padding:55px 20px 70px; text-align:center; }
.eyebrow { color:#f4b8ff; text-transform:uppercase; letter-spacing:5px; font-size:12px; animation:fadeUp 1s both .2s; }
h1 {
  font-size:clamp(40px,9vw,78px); line-height:1.04; margin:17px 0;
  background:linear-gradient(90deg,#fff,#ffb7e5,#ffe6a3,#d8b4ff,#fff);
  background-size:250% auto; -webkit-background-clip:text; background-clip:text; color:transparent;
  animation:shine 5s linear infinite,fadeUp 1s both .35s;
}
@keyframes shine { to { background-position:250% center; } }
@keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
.subtitle { color:#e5d7ef; font-size:clamp(15px,3vw,19px); animation:fadeUp 1s both .6s; }
.cake-wrap { margin:22px auto 14px; font-size:clamp(80px,18vw,130px); filter:drop-shadow(0 0 28px #ff65bd55); animation:cakeFloat 3s ease-in-out infinite; }
@keyframes cakeFloat { 0%,100% { transform:translateY(0) rotate(-2deg); } 50% { transform:translateY(-15px) rotate(2deg); } }
.wishes { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:11px; margin:30px auto; max-width:620px; }
.wish {
  padding:15px 10px; border:1px solid #ffffff22; border-radius:16px;
  background:linear-gradient(135deg,#ffffff12,#ffffff04);
  box-shadow:inset 0 1px #ffffff0a,0 8px 30px #0002;
  backdrop-filter:blur(8px); font-size:clamp(14px,3vw,18px);
  animation:cardPop .7s both; transition:transform .25s,border-color .25s;
}
.wish:hover { transform:translateY(-5px) scale(1.02); border-color:#ff9ddd99; }
.wish:nth-child(1){animation-delay:.7s}.wish:nth-child(2){animation-delay:.85s}
.wish:nth-child(3){animation-delay:1s}.wish:nth-child(4){animation-delay:1.15s}
.wish:nth-child(5){animation-delay:1.3s}.wish:nth-child(6){animation-delay:1.45s}
@keyframes cardPop { from {opacity:0; transform:translateY(15px) scale(.96)} to {opacity:1;transform:translateY(0) scale(1)} }
.buttons { display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-top:20px; }
button {
  border:1px solid #ffffff3a; border-radius:999px; padding:13px 20px; color:white;
  background:linear-gradient(120deg,#d43f99,#7447d9); font-weight:700; cursor:pointer;
  box-shadow:0 8px 30px #9b3bb833; transition:transform .2s,filter .2s;
}
button:hover { transform:translateY(-3px); filter:brightness(1.15); }
#note { color:#d9c8e6; font-size:13px; line-height:1.5; }
#sparkles, #balloons { position:absolute; inset:0; overflow:hidden; pointer-events:none; }
.fall { position:absolute; top:-40px; animation:fallDown linear forwards; }
@keyframes fallDown { to { transform:translate3d(var(--drift),110vh,0) rotate(760deg); opacity:.8; } }
.balloon { position:absolute; bottom:-150px; font-size:clamp(35px,7vw,65px); animation:rise linear forwards; filter:drop-shadow(0 0 10px #ff7dc344); }
@keyframes rise { to { transform:translateY(-125vh) translateX(var(--sway)) rotate(12deg); opacity:.2; } }
.footer { color:#b8a6c8; font-size:12px; margin-top:35px; }
@media(max-width:420px) { .content{padding-top:38px}.wishes{grid-template-columns:1fr}.wish{padding:12px} }
@media(prefers-reduced-motion:reduce) { *,*::before,*::after { animation-duration:.01ms !important; animation-iteration-count:1 !important; scroll-behavior:auto !important; } }
</style>
</head>
<body>
<section id="entry">
  <div>
    <form id="dateForm" autocomplete="off">
      <input name="dd" placeholder="DD" inputmode="numeric" maxlength="2" pattern="[0-9]{1,2}" aria-label="Day" required>
      <input name="mm" placeholder="MM" inputmode="numeric" maxlength="2" pattern="[0-9]{1,2}" aria-label="Month" required>
      <input name="yyyy" placeholder="YYYY" inputmode="numeric" maxlength="4" pattern="[0-9]{4}" aria-label="Year" required>
    </form>
    <div id="error">❌</div>
  </div>
</section>

<section id="party" aria-live="polite">
  <div class="aurora"></div>
  <div id="sparkles"></div>
  <div id="balloons"></div>
  <main class="content">
    <div class="eyebrow">✦ A little magic, just for you ✦</div>
    <h1>Happy Birthday!</h1>
    <p class="subtitle">Today, the world gets a little brighter because of you. ✨</p>
    <div class="cake-wrap" aria-label="Birthday cake">🎂</div>
    <p class="subtitle">Make a wish… and let the magic begin! 💫</p>

    <div class="wishes">
      <div class="wish">🎉 Happy Birthday!</div>
      <div class="wish" dir="rtl">🎂 عيد ميلاد سعيد!</div>
      <div class="wish">🎈 Joyeux anniversaire !</div>
      <div class="wish">🎊 お誕生日おめでとう！</div>
      <div class="wish">🎁 Doğum günün kutlu olsun!</div>
      <div class="wish">💖 생일 축하합니다!</div>
    </div>

    <div class="buttons">
      <button id="musicButton" type="button">▶ Play Birthday Song 🎵</button>
      <button type="button" id="surpriseButton">🎆 More surprises!</button>
    </div>
    <p id="note">To play music, add your own MP3 file as <code>static/birthday.mp3</code>.</p>
    <p class="footer">Made with ✨ and lots of birthday magic</p>
    <audio id="song" preload="auto" loop>
      <source src="/static/birthday.mp3" type="audio/mpeg">
    </audio>
  </main>
</section>

<script>
const form = document.getElementById('dateForm');
const fields = [...form.querySelectorAll('input')];
const error = document.getElementById('error');
const party = document.getElementById('party');
let unlocked = false;

fields.forEach((field, index) => {
  field.addEventListener('input', () => {
    field.value = field.value.replace(/\\D/g, '');
    if (field.value.length === field.maxLength && index < fields.length - 1) {
      fields[index + 1].focus();
    }
    error.style.display = 'none';
    // Auto-check once all three fields have their expected lengths.
    if (fields.every((f, i) => f.value.length === [2,2,4][i])) verifyDate();
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  verifyDate();
});

function verifyDate() {
  if (unlocked) return;
  const [dd, mm, yyyy] = fields.map(f => f.value);
  if (dd === '18' && mm === '11' && yyyy === '2008') {
    unlocked = true;
    document.getElementById('entry').style.display = 'none';
    party.classList.add('show');
    createConfetti(100);
    createBalloons(12);
  } else if (fields.every(f => f.value.length > 0)) {
    error.textContent = '❌';
    error.style.display = 'block';
    fields.forEach(f => { f.value = ''; });
    fields[0].focus();
  }
}

function createConfetti(amount = 60) {
  const host = document.getElementById('sparkles');
  const symbols = ['✨','🎉','💖','🎊','⭐','✦','🌟'];
  for (let i = 0; i < amount; i++) {
    const el = document.createElement('span');
    el.className = 'fall';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (12 + Math.random() * 22) + 'px';
    el.style.animationDuration = (3 + Math.random() * 5) + 's';
    el.style.animationDelay = (Math.random() * 2) + 's';
    el.style.setProperty('--drift', (Math.random() * 220 - 110) + 'px');
    host.appendChild(el);
    setTimeout(() => el.remove(), 9000);
  }
}
function createBalloons(amount = 8) {
  const host = document.getElementById('balloons');
  const balloons = ['🎈','🎈','💜','💖','🎈'];
  for (let i = 0; i < amount; i++) {
    const el = document.createElement('span');
    el.className = 'balloon';
    el.textContent = balloons[Math.floor(Math.random() * balloons.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (8 + Math.random() * 8) + 's';
    el.style.animationDelay = (Math.random() * 5) + 's';
    el.style.setProperty('--sway', (Math.random() * 120 - 60) + 'px');
    host.appendChild(el);
    setTimeout(() => el.remove(), 18000);
  }
}
const song = document.getElementById('song');
const musicButton = document.getElementById('musicButton');
const note = document.getElementById('note');
musicButton.addEventListener('click', async () => {
  if (!song.paused) {
    song.pause();
    musicButton.textContent = '▶ Play Birthday Song 🎵';
    return;
  }
  try {
    await song.play();
    musicButton.textContent = '⏸ Pause Birthday Song 🎵';
    note.textContent = '🎶 Music is playing!';
  } catch (e) {
    note.textContent = 'Music file not found or not playable. Add a valid MP3 at static/birthday.mp3.';
  }
});
document.getElementById('surpriseButton').addEventListener('click', () => {
  createConfetti(130);
  createBalloons(10);
  document.querySelector('.cake-wrap').animate(
    [{transform:'scale(1)'},{transform:'scale(1.2) rotate(-8deg)'},{transform:'scale(1)'}],
    {duration:700, easing:'ease-out'}
  );
});
</script>
</body>
</html>
"""

@app.route("/", methods=["GET"])
def home():
    return render_template_string(PAGE)

if __name__ == "__main__":
    app.run(debug=True)
