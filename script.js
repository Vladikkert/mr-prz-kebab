
let order = [];
let playerWrap = [];
let score = 0;

function addIngredient(ingredient) {
  playerWrap.push(ingredient);
  renderWrap();
}

function renderWrap() {
  const wrapStack = document.getElementById("wrapStack");
  wrapStack.innerHTML = '';

  const stackSprites = {
    wrap: "img/stack_wrap.png",
    meat: "img/stack_meat.png",
    cucumber: "img/stack_cucumber.png",
    tomato: "img/stack_tomato.png"
  };

  playerWrap.forEach((item, index) => {
    const img = document.createElement("img");
    img.src = stackSprites[item] || `img/${item}.png`;
    img.style.position = "absolute";
    img.style.top = `${80 - index * 8}px`; // наслаивание сверху вниз
    img.style.left = "50%";
    img.style.transform = "translateX(-50%)";
    img.style.zIndex = index;
    wrapStack.appendChild(img);
  });
}

function submitOrder() {
  if (arraysEqual(order, playerWrap)) {
    score++;
    document.getElementById("soundSuccess").play();
  } else {
    document.getElementById("soundFail").play();
  }
  document.getElementById("scoreDisplay").innerText = `💰 Буткоины: ${score}`;
  playerWrap = [];
  renderWrap();
  generateOrder();
}

function generateOrder() {
  const ingredients = ['wrap', 'meat', 'cucumber', 'tomato'];
  const orderLength = Math.floor(Math.random() * 3) + 2;
  order = [];
  for (let i = 0; i < orderLength; i++) {
    order.push(ingredients[Math.floor(Math.random() * ingredients.length)]);
  }
  renderOrder();
}

function renderOrder() {
  const orderList = document.getElementById("orderList");
  orderList.innerHTML = '';
  order.forEach(item => {
    const img = document.createElement("img");
    img.src = `img/${item}.png`;
    orderList.appendChild(img);
  });
}

function arraysEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function closeReward() {
  document.getElementById("dailyReward").classList.add("hidden");
}

function shareKebab() {
  alert("Скоро будет доступен шэринг шавухи в сторис 😎");
}

window.onload = () => {
  generateOrder();
};
