import store from '../redux/store.js';
import { showModal, hideModal, deleteCard, addColumn } from '../redux/actions.js';
class Modal {
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('modal');
        this.render();
        store.subscribe(() => this.render());
    }
    render() {
        const state = store.getState();
        if (state.isAddColModalShown) {
            this.element.innerHTML = `
        <div class="modal-body">
            <input class="modal-input" maxlength="50" type="text" value="" placeholder="제목을 입력하세요">
            <div class="modal-buttons">
                <button class="modal-buttons-cancel">취소</button>
                <button class="modal-buttons-register">등록</button>
            </div>
        </div>`
            this.element.classList.add('show');
            this.confirmBtn = this.element.querySelector('.modal-buttons-register');
            this.confirmBtn.addEventListener('click', this.handleAddConfirm.bind(this));
        }
        if (state.isDeleteCardModalShown) {
            this.element.innerHTML = `
        <div class="modal-body">
            <div class="modal-body-text">선택한 카드를 삭제할까요?</div>
            <div class="modal-buttons">
                <button class="modal-buttons-cancel">취소</button>
                <button class="modal-buttons-delete">삭제</button>
            </div>
        </div>`
            this.element.classList.add('show');
            this.confirmBtn = this.element.querySelector('.modal-buttons-delete');
            this.confirmBtn.addEventListener('click', this.handleDeleteConfirm.bind(this));
        }
        if (!state.isAddColModalShown && !state.isDeleteCardModalShown) {
            this.element.classList.remove('show');
            return
        }
        this.cancelBtn = this.element.querySelector('.modal-buttons-cancel');
        this.cancelBtn.addEventListener('click', this.handleCancel.bind(this));
        this.element.addEventListener('click', (e) => {
            if (e.target.classList.contains("modal")) this.handleCancel();
        })
    }

    handleAddConfirm() {
        store.dispatch(addColumn(this.element.querySelector('.modal-input').value))
        store.dispatch(hideModal());
    }
    handleDeleteConfirm() {
        store.dispatch(deleteCard())
        store.dispatch(hideModal());
    }

    handleCancel() {
        store.dispatch(hideModal());
    }

    show() {
        store.dispatch(showModal());
        document.body.appendChild(this.element);
    }

    hide() {
        store.dispatch(hideModal());
        document.body.removeChild(this.element);
    }
}

export default Modal;
