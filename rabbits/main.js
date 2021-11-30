const button = document.querySelector('button');
const rabbit = document.querySelector('#rabbit');
button.addEventListener('click', () => {
    // console.log('clicked!');
    rabbit.scrollIntoView({behavior: 'smooth', block: 'center'});
});