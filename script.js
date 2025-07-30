let score = 0;
let userOrder = [];

// для шафла
let queueIndex = 0;
let clientQueue = [];


const clients = [
  {
    name: "Бомж Борис",
    greeting: "Здарова, дед! Зафигачь мне бургер.",
    order: ["wrap", "meat","cucumber", "tomato", "wrap"],
    image: "img/client1.png"
  },
  {
    name: "Диетолог Катя",
    greeting: "Без мяса, только огурцы и томаты!",
    order: ["wrap", "cucumber", "tomato", "wrap"],
    image: "img/client2.png"
  },
  {
    name: "Гот Влад",
    greeting: "Тьма просит томат... и мясо.",
    order: ["wrap", "tomato", "meat", "wrap"],
    image: "img/client3.png"
  },
  {
    name: "Зеленый тролль",
    greeting: "Дай мне просто здоровенный бургер!",
    order: ["wrap","cucumber", "cucumber","meat", "cucumber", "wrap"],
    image: "img/client4.png"
  },
  {
    name: "Муддисон",
    greeting: "Дайте мне бургер, только без этой вашей залупы с огурцом.",
    order: ["wrap", "meat", "wrap", "cucumber", "wrap"],
    image: "img/client5.png"
  }
];

let currentClient = null;

function pickRandomClient() {
  const index = Math.floor(Math.random() * clients.length);
  currentClient = clients[index];
  showClient(currentClient);
}

function pickNextClient() {
  if (queueIndex >= clientQueue.length) {
    clientQueue = shuffle([...clients]);
    queueIndex = 0;
  }

  currentClient = clientQueue[queueIndex];
  queueIndex++;
  showClient(currentClient);
}

function showClient(client) {
  // Фраза
  document.getElementById("clientSpeech").innerText = `— ${client.greeting}`;

  // Картинка
  document.getElementById("clientImage").src = client.image;

  // Заказ
  const orderIcons = document.getElementById("orderIcons");
  orderIcons.innerHTML = "";
  client.order.forEach(ingredient => {
    const img = document.createElement("img");
    img.src = `img/${ingredient}.png`;
    orderIcons.appendChild(img);
  });
}

function addIngredient(type) {
  if (userOrder.length >= 6) return;
  userOrder.push(type);
  updateWrapStack();
}

function updateWrapStack() {
  const stack = document.getElementById("wrapStack");
  stack.innerHTML = "";
  userOrder.forEach((ingredient, i) => {
    const img = document.createElement("img");
    img.src = `img/stack_${ingredient}.png`;
    img.style.bottom = `${i * 10}px`;
    stack.appendChild(img);
  });
}

function submitOrder() {
  if (arraysEqual(userOrder, currentClient.order)) {
    playSuccess();
    score += 10;
    updateScore();
    userOrder = [];
    updateWrapStack();
    setTimeout(pickNextClient, 800);
  } else {
    playFail();
    userOrder = [];
    updateWrapStack();
  }
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((el, i) => el === arr2[i]);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function updateScore() {
  document.getElementById("scoreDisplay").innerText = `💰 Буткоины: ${score}`;
}

function shareKebab() {
  if (window.Telegram.WebApp) {
    Telegram.WebApp.shareGame();
  }
}

function playSuccess() {
  const audio = document.getElementById("soundSuccess");
  audio.currentTime = 0;
  audio.play();
}

function playFail() {
  const audio = document.getElementById("soundFail");
  audio.currentTime = 0;
  audio.play();
}

function closeReward() {
  document.getElementById("dailyReward").classList.add("hidden");
}

window.onload = () => {
  clientQueue = shuffle([...clients]);
  queueIndex = 0;
  pickNextClient();
  updateScore();
};
