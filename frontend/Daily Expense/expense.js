
let url = 'http://localhost:4000'
let token = localStorage.getItem('token');
let table = document.getElementById('tableItems');
let form = document.getElementById('submitForm');
let editForm = document.getElementById('editForm');
editForm.style.display = 'none';

showData()

document.getElementById('exepenseBtn').addEventListener('click', (e) => {
  // e.preventDefault()
  let token = localStorage.getItem('token');

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
      'Content-Type': 'application/json',
      'Authorization': token
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
  // console.log(token)

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: url + '/expense',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  };

  axios.request(config)
    .then((res) => {
      console.log(res)
      let resp = res.data;
      resp.forEach(response => {

        let tr = document.createElement('tr');
        tr.innerHTML = `
        <td class="withDesc">${response.Description}</td>
        <td class="withPrice">${response.Price}</td>
        <td class="withcat">${response.Category}</td>
        <td><button class="Btn1 delete" id="${response.id}">delete</button><button class="Btn2 edit" id="${response.id}">edit</button></td>`
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
        'Content-Type': 'application/json',
        'Authorization': token,
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

let editId;
document.getElementById('tableItems').addEventListener('click', (e) => {
  // e.preventDefault();
  if (e.target.classList.contains('edit')) {
    let id = e.target.id
    editId = id
    form.style.display = 'none';
    table.style.display = 'none';
    editForm.style.display = "block";

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: url + '/expense',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    };

    axios.request(config)
      .then((response) => {
        response.data.forEach(i => {
          if (i.id == id) {

            document.getElementById('newprice').value = i.Price;
            document.getElementById('newdescription').value = i.Description;
            document.getElementById('newcategory').value = i.Category;
          }
        })
      })
  }
})


document.getElementById('updateBtn').addEventListener('click', (e) => {
  // e.preventDefault()
  let data = JSON.stringify({
    id:editId,
    description: document.getElementById('newdescription').value,
    price: document.getElementById('newprice').value,
    category: document.getElementById('newcategory').value
  });

  let config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: url + '/expense',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    data: data
  };

  axios.request(config)
    .then((res) => {
      // let li = e.target.parentElement.previousElementSibling
      // let li2 = li.parentElement.previousElementSibling
      // table.removeChild(li2)
      console.log(res.data)
    })
})
