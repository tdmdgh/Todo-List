import Column from './Column.js';
import store from '../redux/store.js';

class ColumnList {
  constructor() {
    // this.columns = [];
    this.element = document.createElement('ul');
    this.element.classList.add('column-list');
    this.render();
    store.subscribe(() => this.render());
  }
  render() {
    const state = store.getState();
    this.element.innerHTML = "";
    state.columns.forEach(columnData => {
      const column = new Column(columnData);
      this.element.appendChild(column.element);
    });
  }
}

export default ColumnList;
