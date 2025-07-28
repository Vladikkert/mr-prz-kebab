
const ingredientNames = {
  'wrap': 'лепёшкой',
  'meat': 'мясом',
  'cucumber': 'огурцом',
  'tomato': 'помидором'
};

function typeText(text, elementId, speed = 50, callback = null) {
  const el = document.getElementById(elementId);
  el.textContent = '';
  if (!text || typeof text !== 'string') {
    console.warn('Попытка напечатать невалидный текст:', text);
    return;
  }
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
    } else {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}

function buildOrderText(order) {
  if (!Array.isArray(order) || order.length === 0) {
    return 'Просто заверни воздух, брат 😄';
  }

  const readable = order.map(ing => {
    const name = ingredientNames[ing];
    if (!name) {
      console.warn('Неизвестный ингредиент:', ing);
      return '[неизв]';
    }
    return name;
  });

  if (readable.length === 1) {
    return `Бро, мне шавуху с ${readable[0]}!`;
  }
  const last = readable.pop();
  return `Бро, мне шавуху с ${readable.join(', ')} и ${last}!`;
}

function generateRandomOrder() {
  const all = ['wrap', 'meat', 'cucumber', 'tomato'];
  const count = Math.floor(Math.random() * 3) + 2;
  return [...all].sort(() => 0.5 - Math.random()).slice(0, count);
}

function startClient() {
  currentOrder = generateRandomOrder();
  console.log("🧾 Новый заказ:", currentOrder);
  const text = buildOrderText(currentOrder);
  typeText(text, 'orderList');
}

function isOrderCorrect() {
  return JSON.stringify(currentOrder) === JSON.stringify(userStack);
}

function submitOrder() {
  console.log("📦 Игрок собрал:", userStack);
  if (isOrderCorrect()) {
    typeText('Спасибо, брат! Всё чётко 🔥', 'orderList');
    document.getElementById('soundSuccess').play();
  } else {
    typeText('Ты чё мне подсунул?! 🤮', 'orderList');
    document.getElementById('soundFail').play();
  }

  setTimeout(() => {
    userStack = [];
    renderStack();
    startClient();
  }, 3000);
}

function addIngredient(ing) {
  if (userStack.length < 4) {
    userStack.push(ing);
    renderStack();
  }
}

function renderStack() {
  const wrapStack = document.getElementById('wrapStack');
  wrapStack.innerHTML = '';
  userStack.forEach((ing, index) => {
    const img = document.createElement('img');
    img.src = `img/${ing}.png`;
    img.style.bottom = `${index * 10}px`;
    wrapStack.appendChild(img);
  });
}

let currentOrder = [];
let userStack = [];

window.onload = () => {
  startClient();
};
