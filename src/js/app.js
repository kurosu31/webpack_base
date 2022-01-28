// export文を使ってhello関数を定義する。
export function hello() {
  const elem = document.getElementById('show_js');
  const div = document.createElement('div');
  div.innerHTML = ('namake');
  elem.appendChild(div);
}