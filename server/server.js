import { initialState } from './initalState.js';

const url = "http://localhost:3000/"

export async function getJSONdata() {
  try {
    await fetchColumns();
    await fetchLogs()
  }
  catch (error) {
    console.log(error);
  }
}
export async function fetchColumns() {
  await fetch(url + "columns").then(response => response.json())
    .then(json => {
      initialState.columns = [...json]
    })
}
export async function fetchLogs() {
  await fetch(url + "logs").then(response => response.json()).then(json => {
    initialState.logs = [...json];
  })
}

export function postLog(logData) {
  fetch(url + "logs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: logData.id,
      content: logData.content,
      time: logData.time,
    }),
  })
}
export function postColumn(colData) {
  fetch(url + "columns", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      colData
    ),
  })
}
export function patchCardList(colData) {
  fetch(url + "columns/" + colData.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cards: colData.cards,
    }),
  })
}
export function patchColumnTitle(colData) {
  fetch(url + "columns/" + colData.id, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      title: colData.title,
    }),
  })
}
export function deleteColumn(columnId) {
  fetch(url + "columns/" + columnId, {
    method: "DELETE",
  })
}