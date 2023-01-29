import store from '../redux/store.js';
import { registerCard, removeAddingCard, editCard, showModal, } from '../redux/actions.js';

class Card {
    constructor(cardData) {
        this.title = cardData.title;
        this.content = cardData.content;
        this.titleInput;
        this.contentTextarea;
        this.id = cardData.id;
        this.element = document.createElement('li');
        this.element.classList.add('card');
        this.element.dataset.id = this.id;
        this.isRegistable = false;
        this.render();
    }

    render() {
        this.element.innerHTML = `
        <div class="card-top">
            <div class="card-main">
                <input class="card-title-input" type="text" value="" placeholder="제목을 입력하세요">
                <textarea class="card-content-textarea" rows="1" value=""
                    placeholder="내용을 입력하세요"></textarea>
                <div class="card-title">${this.title}</div>
                <div class="card-content">${this.content}</div>
                <div class="card-author">author by web</div>
            </div>
            <div class="card-icons">
                <img class="card-icons-delete" src="./assets/cardDeleteIcon.svg" alt="">
                <img class="card-icons-edit" src="./assets/cardEditIcon.svg" alt="">
            </div>
        </div>
        <div class="card-buttons">
            <button class="card-buttons-cancel">취소</button>
            <button class="card-buttons-register">등록</button>
        </div>
    `;
        this.titleInput = this.element.querySelector('.card-title-input');
        this.contentTextarea = this.element.querySelector('.card-content-textarea');
        this.titleInput.addEventListener('keydown', this.handleTitleInput.bind(this));
        this.contentTextarea.addEventListener('keydown', this.handleContentTextarea.bind(this));
        this.titleInput.addEventListener('keyup', this.handleTitleInput.bind(this));
        this.contentTextarea.addEventListener('keyup', this.handleContentTextarea.bind(this));

        this.registerBtn = this.element.querySelector('.card-buttons-register');
        this.cancelBtn = this.element.querySelector('.card-buttons-cancel');
        this.registerBtn.addEventListener('click', this.handleRegister.bind(this));
        this.cancelBtn.addEventListener('click', this.handleCancel.bind(this));

        this.editBtn = this.element.querySelector('.card-icons-edit');
        this.editBtn.addEventListener('click', this.handleEdit.bind(this));

        this.deleteBtn = this.element.querySelector('.card-icons-delete');
        this.deleteBtn.addEventListener('click', this.handleDelete.bind(this));
        this.deleteBtn.addEventListener('mouseover', this.handleDeleteHover.bind(this));
        this.deleteBtn.addEventListener('mouseleave', this.handleDeleteHoverEnd.bind(this));


    }

    handleDeleteHover() {
        this.element.classList.add("delete")
    }
    handleDeleteHoverEnd() {
        this.element.classList.remove("delete")
    }
    handleTitleInput() {
        this.readyCheck()
    }
    handleContentTextarea() {
        this.readyCheck()
        this.resize_textarea(this.contentTextarea)
    }
    handleRegister() {
        if (!this.isRegistable) return
        const prevTitle = this.title;
        this.title = this.titleInput.value;
        this.content = this.newline2br(this.contentTextarea.value);
        const column = this.element.closest(".column");
        if (this.element.classList.contains("card-editing")) {
            store.dispatch(editCard(column.id, this.id, prevTitle, { title: this.title, content: this.content }));
            return
        }
        store.dispatch(removeAddingCard());
        store.dispatch(registerCard(column.id, { id: this.id, title: this.title, content: this.content }));
    }
    handleCancel() {
        store.dispatch(removeAddingCard())
    }
    handleEdit() {
        this.titleInput.value = this.title;
        this.contentTextarea.value = this.br2newline(this.content);
        this.registerBtn.innerHTML = "수정";
        this.element.classList.add("card-adding");
        this.element.classList.add("card-editing");
        this.resize_textarea(this.contentTextarea);
        this.isRegistable = true;
        this.readyCheck()
    }
    handleDelete() {
        const column = this.element.closest(".column");
        store.dispatch(showModal("DELETE_CARD", column.id, this.id));
    }
    resize_textarea(obj) {
        obj.style.height = '0px';
        obj.style.height = (obj.scrollHeight) + 'px';
    }
    readyCheck() {
        if (this.titleInput.value.length > 0 && this.contentTextarea.value.length > 0)
            this.isRegistable = true;
        else {
            this.isRegistable = false;
        }
        if (this.isRegistable) {
            this.element.classList.add("ready")
        }
        else {
            this.element.classList.remove("ready")
        }
    }
    newline2br(str) {
        return str.replaceAll('\n', '<br>');
    }
    br2newline(str) {
        return str.replaceAll('<br>', '\n');
    }
}

export default Card;
