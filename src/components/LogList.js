import store from '../redux/store.js';
import Log from './Log.js';
class LogList {
  constructor() {
    this.element = document.querySelector('.log-list');
    this.render();
    store.subscribe(() => this.render());
  }
  render() {

    const state = store.getState();
    this.element.innerHTML = "";
    state.logs.forEach(logData => {
      const log = new Log(logData);
      this.element.prepend(log.element);
    });
    console.log(this.element)
  }
}
export default LogList;
