const vertical = document.querySelector('.vertical');
const horozontal = document.querySelector('.horozontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

const targetRect = target.getBoundingClientRect();
const targetHalfWidth = targetRect.width / 2;
const targetHalfHeight = targetRect.height / 2;

document.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y= event.clientY;
    // console.log(`${x}, ${y}`);

    vertical.style.transform = `translateX(${x}px)`;
    horozontal.style.transform = `translateY(${y}px)`;
    // vertical.style.left = `${x}px`;
    // horozontal.style.top = `${y}px`;

    target.style.transform = `translate(${x - targetHalfWidth}px, ${y - targetHalfHeight}px)`;
    // target.style.left = `${x}px`;
    // target.style.top = `${y}px`;

    tag.style.transform = `translate(${x}px, ${y}px)`;
    // tag.style.left = `${x}px`;
    // tag.style.top = `${y}px`;
    tag.innerHTML = `${x}px, ${y}px`;
})