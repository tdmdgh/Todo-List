import store from '../redux/store.js';
import { addCard, removeAddingCard, editColumn, deleteColumn } from '../redux/actions.js';
import Card from './Card.js';

class Column {
    constructor(columnData) {
        this.title = columnData.title;
        this.id = columnData.id;
        this.cards = columnData.cards;
        this.element = document.createElement('li');
        this.element.classList.add('column');
        this.element.id = this.id;
        this.cardsContainer = document.createElement('ul');
        this.cardsContainer.classList.add('card-list')
        this.state = store.getState();
        this.render();
    }

    render() {
        this.element.innerHTML = `
        <div class="column-header">
            <div class="column-title">
                <span>${this.title}</span>
                <div class="column-card-count">${this.cards.length}</div>
            </div>
            <div class="column-header-icons">
                <img class="column-header-icons-add" src="./assets/columnAddIcon.svg" alt="">
                <img class="column-header-icons-close" src="./assets/columnCloseIcon.svg" alt="">
            </div>
            <input class="column-title-input" maxlength="50" type="text" value="${this.title}" placeholder="제목을 입력하세요">
        </div>
    `;
        this.columnTitle = this.element.querySelector('.column-title');
        this.columnTitle.addEventListener('dblclick', this.handleEditColumn.bind(this))
        this.addCardBtn = this.element.querySelector('.column-header-icons-add');
        this.deleteColumnBtn = this.element.querySelector('.column-header-icons-close');
        this.addCardBtn.addEventListener('click', this.handleAddCard.bind(this));
        this.deleteColumnBtn.addEventListener('click', this.handleDeleteColumn.bind(this));
        document.addEventListener('click', (e) => this.handleEditColumnDone(e.target))


        if (this.state.addingCard.columnId == this.id) {
            const card = new Card({ title: "", content: "", id: this.state.addingCard.id });
            card.element.classList.add("card-adding")
            this.cardsContainer.appendChild(card.element);
            this.element.appendChild(this.cardsContainer)
        }

        this.cards.forEach(cardData => {
            const card = new Card(cardData);
            if (this.state.deletingCardData.cardId == card.id) card.element.classList.add("delete")
            this.cardsContainer.appendChild(card.element);
        });
        this.element.appendChild(this.cardsContainer)
    }

    handleEditColumn() {
        if (document.querySelector(".column-editing")) return
        this.element.classList.add("column-editing")
    }
    handleEditColumnDone(target) {
        if (!document.querySelector(".column-editing")) return
        if (target.closest(".column-title-input")) return
        this.element.classList.remove("column-editing");
        const newTitle = this.element.querySelector('.column-title-input').value;
        if (this.title == newTitle) return

        store.dispatch(editColumn(this.id, newTitle, this.title));
    }

    handleAddCard() {
        if (JSON.stringify(this.state.addingCard) !== JSON.stringify({})) {
            if (this.state.addingCard.columnId !== this.id) return
            store.dispatch(removeAddingCard())
        }
        else store.dispatch(addCard(this.id));
    }

    handleDeleteColumn() {
        store.dispatch(deleteColumn(this.id));
    }
}

export default Column;
