const ingredients = ["wrap", "meat", "cucumber", "tomato"];
const orders = [
  ["wrap", "meat", "tomato"],
  ["wrap", "cucumber", "tomato"],
  ["wrap", "meat", "cucumber", "tomato"],
  ["wrap", "meat"]
];
let currentOrder = [];
let userWrap = [];
let score = 0;
let coins = parseInt(localStorage.getItem("buterCoins")) || 0;

Telegram.WebApp.ready();

function initGame() {

    // Скрываем заставку через 1 сек
  setTimeout(() => {
    document.getElementById("splashScreen").style.display = "none";
  }, 1000); // можно 1500 или 2000, если хочешь дольше

  checkDailyReward();
  nextOrder();

  updateHUD();
}

// Добавляем монетки
function updateHUD() {
  document.getElementById("scoreDisplay").innerText = "💰 Буткоины: " + coins;
}



function nextOrder() {
  userWrap = [];
  document.getElementById("wrapList").innerHTML = "";
  currentOrder = orders[Math.floor(Math.random() * orders.length)];
  const orderList = document.getElementById("orderList");
  orderList.innerHTML = "";
  currentOrder.forEach(ing => {
    const img = document.createElement("img");
    img.src = `img/${ing}.png`;
    orderList.appendChild(img);
  });
  document.getElementById("clientPhrase").innerText = '"Собери мне шаву, брат!"';
}

function addIngredient(ing) {
  userWrap.push(ing);
  const img = document.createElement("img");
  img.src = `img/${ing}.png`;
  img.style.animation = "vzhuh 0.3s";
  document.getElementById("wrapList").appendChild(img);
}

function submitOrder() {
  if (arraysEqual(userWrap, currentOrder)) {
    document.getElementById("clientPhrase").innerText = '"ДА ЭТО Ж ШАВА ВСЕЯ РУСИ!"';
    score += 1;
    coins += 5;
    localStorage.setItem("buterCoins", coins);
    updateHUD();
    document.getElementById("soundSuccess").play();
  } else {
    document.getElementById("clientPhrase").innerText = '"ТЫ ЧЕГО СЮДА ПОЛОЖИЛ?!?"';
    coins -= 2;
    localStorage.setItem("buterCoins", coins);
    updateHUD();
    document.getElementById("soundFail").play();
  }
  setTimeout(nextOrder, 1500);
}

function arraysEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function shareKebab() {
  Telegram.WebApp.openTelegramLink(
    "https://t.me/share/url?url=https://t.me/your_bot&text=🔥 Я собрал " + score + " шав! Попробуй ты!"
  );
}

function checkDailyReward() {
  const today = new Date().toDateString();
  const last = localStorage.getItem("lastLogin");
  if (last !== today) {
    localStorage.setItem("lastLogin", today);
    document.getElementById("dailyReward").classList.remove("hidden");
    document.getElementById("rewardText").innerText = "🎁 Бабушка Халидия оставила тебе 20 шавкоинов!";
  }
}

function closeReward() {
  document.getElementById("dailyReward").classList.add("hidden");
}

initGame();
