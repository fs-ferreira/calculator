const request = new XMLHttpRequest();

request.open("GET", "http://localhost:4000/requests");

request.onload = function () {
  const list = JSON.parse(this.responseText);

  var html = list
    .map(function (el) {
      return `<tr class="data">
      <td scope="row">${el.id}</td>
      <th >${el.request}</th>
      <td>${el.result}</td>
      <td>${el.created}</td>
      <td>${el.createdBy}</td>
  </tr>`;
    })
    .join("");

  document.getElementById("target").innerHTML = html;
};

request.onerror = function () {
  console.log("erro ao executar a requisição");
};

request.send();
