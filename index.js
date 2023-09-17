let speed = document.querySelector('[name="speed"]');
let type = document.querySelector('[name="carType"]');
let car = document.querySelector('.car');
let content = document.querySelector('.content');

const KeyCode = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
};

let Height, Width;
let car_width, car_height;
let DIRECTION;

// 车型改变
const onTypeChange = () => {
  type.addEventListener('change', (e) => {
    car.src = `./images/${e.target.value}.png`;
    storage();
  })
}
// 速度改变
const onSpeedChange = () => {
  speed.addEventListener('change', (e) => {
    current_speed = e.target.value;
    storage();
  })

}

// 监听键盘事件
const onKeyboardChange = () => {
  document.addEventListener('keydown', (e) => {
    const keyCode = e.keyCode;
    onMoveCar(keyCode);
    storage();
  })
}

// 移动小汽车
const onMoveCar = (keyCode) => {
  getWidthAndHeight();
  let direction;
  car.classList.remove('car-left', 'car-up', 'car-right', 'car-down')
  switch (keyCode) {
    case 37:
      direction = 'left';
      onRenderCarDirection(direction);
      break;
    case 38:
      direction = 'up';
      onRenderCarDirection(direction);
      break;
    case 40:
      direction = 'down';
      onRenderCarDirection(direction);
      break;
    case 39:
      direction = 'right';
      onRenderCarDirection(direction);
      break;
  }
  DIRECTION = direction;

  if (direction === 'right') {
    if (car.offsetLeft >= (Width - car_width)) {
      alert('已经到边界了哦~');
    }
    let cur = car.offsetLeft + Number(speed.value);
    car.style.left = `${cur}px`;
  } else if (direction === 'left') {
    if (car.offsetLeft <= 0) {
      alert('已经到边界了哦~');
    } else {
      let cur = car.offsetLeft - Number(speed.value);
      car.style.left = `${cur}px`;
    }
  } else if (direction === 'up') {
    if (car.offsetTop <= 0) {
      alert('已经到边界了哦~');
    } else {
      let cur = car.offsetTop - Number(speed.value);
      car.style.top = `${cur}px`;
    }
  } else if (direction === 'down') {
    if (car.offsetTop >= (Height - car_height)) {
      alert('已经到边界了哦~');
    } else {
      let cur = car.offsetTop + Number(speed.value);
      car.style.top = `${cur}px`;
    }
  }
}

// 渲染小汽车的方向
const onRenderCarDirection = (direction) => {
  switch (direction) {
    case 'left':
      car.classList.add('car-left');
      break;
    case 'up':
      car.classList.add('car-up');
      break;
    case 'down':
      car.classList.add('car-down');
      break;
    case 'right':
      car.classList.add('car-right');
      break;
  }
}

const getWidthAndHeight = () => {
  Width = content.offsetWidth;
  Height = content.offsetHeight;
  car_width = car.offsetWidth;
  car_height = car.offsetHeight;
}

// 持久化存储
const storage = () => {
  // 速度、车型、方向、位置的记录
  const cur_speed = speed.value;
  const cur_type = type.value;
  let objToSave = {
    cur_speed,
    cur_type,
    cur_left: car.offsetLeft,
    cur_top: car.offsetTop,
    cur_direction: DIRECTION,
  }
  localStorage.setItem("StorageKey", JSON.stringify(objToSave));
}

// 开始游戏
const initGame = () => {
  onTypeChange();
  onSpeedChange();
  onKeyboardChange();
  if (localStorage.getItem("StorageKey")) {
    const data = JSON.parse(localStorage.getItem("StorageKey"));
    car.style.left = data.cur_left + 'px';
    car.style.top = data.cur_top + 'px';
    type.value = data.cur_type;
    speed.value = data.cur_speed;
    onRenderCarDirection(data.cur_direction);
  }
}


initGame();