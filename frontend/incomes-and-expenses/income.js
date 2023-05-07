
let token = localStorage.getItem('token');
let totalIncome = 0;
const d = new Date();
let itemList = document.getElementById('itemList')
let yearlyexpence = document.getElementById('yearlyexpence')


showData()
document.getElementById('downloadFile').addEventListener('click', async () => {

  axios.get('http://13.233.49.219:4000/prime/download', { headers: { 'Content-Type': 'application/json', 'Authorization': token, } })
    .then(Response => {
      console.log(Response.data)
      console.log(Response.status)
      if (Response.status === 200) {
        let a = document.createElement('a');
        a.href = Response.data.fileUrl
        a.download = 'myexpence.csv'
        a.click()
      }
    })
  })
document.getElementById('backToHome').addEventListener('click', () => {
    
  window.location.href = 'http://127.0.0.1:5500/Daily%20Expense/expense.html?'
  })

function showData() {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'http://13.233.49.219:4000/prime/allExe',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  };

  axios.request(config)
    .then((res) => {
      console.log(res)
      res.data.data.forEach(el => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td class="rows">${el.id}</td>
        <td class="rows">${d.getDate()}/${d.getMonth()}/ ${d.getFullYear()}</td>
        <td class="rows">${el.Category}</td>
        <td class="rows">${el.Description}</td>
        <td class="rows">${el.Price}</td>`
        totalIncome += el.Price
        itemList.append(tr)
      });

      let tr = document.createElement('tr');
      tr.innerHTML = `<td></td>
        <td></td>
        <td></td>
        <td></td>
        <td class="end expence">T Expenses =${totalIncome} </td>`
      itemList.append(tr)
    })
}