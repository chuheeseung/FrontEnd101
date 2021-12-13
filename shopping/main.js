const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');
const form = document.querySelector('.new_form');

function onAdd() {
    const text = input.value;
    if(text === '') {
        input.focus();
        return;
    }
    const item = createItem(text);
    items.appendChild(item);
    item.scrollIntoView({block: 'center'});
    input.value = "";
    input.focus(); //사용자가 다시 와서 input 다시 입력할 수 있음
}

let id = 0; //UUID

function createItem(text) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item__row');
    itemRow.setAttribute('data-id', id);

    itemRow.innerHTML = `
        <div class="item">
            <span class="item__name">${text}</span>
            <button class="item__delete">
                <i class="fas fa-trash-alt" data-id=${id}></i>
            </button>
        </div>
        <div class="item__divider"></div>
    `;

    id++;

    return itemRow;
}

// <form></form>태그 사용하기 전
/*
addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keydown', (event) => {
    if(event.isComposing) { //글자가 만들어지고 있는 중이면 처리하지 않고 패스
        return;
    }

    if(event.key === 'Enter') {
        onAdd();
    }
});
*/

form.addEventListener('submit', (event) => {
    event.preventDefault(); // 'submit' 작동 후 브라우저가 페이지 다시 로딩하는 문제 막아줌
    onAdd(); 
})

items.addEventListener('click', event => {
    const id = event.target.dataset.id;

    if(id) {
        const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
        toBeDeleted.remove();
    }
});