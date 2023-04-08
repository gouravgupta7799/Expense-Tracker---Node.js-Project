
let url = 'http://localhost:4000'

showData()
let table = document.getElementById('tableItems');

document.getElementById('exepenseBtn').addEventListener('click', (e) => {
  // e.preventDefault()
  let obj = JSON.stringify({
    description: document.getElementById('description').value,
    price: document.getElementById('price').value,
    category: document.getElementById('category').value
  })
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url + '/expense',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  };

  axios.request(config)
    .then((res) => {
      // console.log(res)
      let response = res.data;
      let tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="withDesc">${response.Description}</td>
        <td class="withPrice">${response.Price}</td>
        <td class="withQuty">${response.Category}</td>
        <td><button class="Btn1" id="${response.id}">delete</button><button class="Btn2" id="${response.id}">edit</button></td>`
      table.appendChild(tr);
    })
    .catch((error) => {
      console.log(error);
    });
})


function showData() {

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url + '/expense',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  axios.request(config)
    .then((res) => {
      // console.log(res)
      let resp = res.data;
      resp.forEach(response => {

        let tr = document.createElement('tr');
        tr.innerHTML = `
        <td class="withDesc">${response.Description}</td>
        <td class="withPrice">${response.Price}</td>
        <td class="withcat">${response.Category}</td>
        <td><button class="Btn1 delete" id="${response.id}">delete</button><button class="Btn2" id="${response.id}">edit</button></td>`
        table.appendChild(tr);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}


document.getElementById('tableItems').addEventListener('click', (e) => {
  // e.preventDefault();
  if (e.target.classList.contains('delete')) {
    let id = e.target.id

    let data = JSON.stringify({ id: id })
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: url + '/expense',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((res) => {
        let li = e.target.parentElement.previousElementSibling
        let li2 = li.parentElement.previousElementSibling
        table.removeChild(li2)
        console.log(res.data)
      })
  }
})