export default (res) => {
  if (res.ok) return res;
  return Promise.reject(`Ошибка: ${res.status}`);
}