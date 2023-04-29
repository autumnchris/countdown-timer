export default function setToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}