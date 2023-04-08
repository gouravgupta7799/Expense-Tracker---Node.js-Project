
let url = 'http://localhost:4000/user'

document.getElementById('loginBtn').addEventListener('click', (e) => {
  e.preventDefault()

  obj = JSON.stringify({
    email: document.getElementById('emailInput').value,
    password: document.getElementById('passwordInput').value
  })

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: url + '/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data: obj
  };

  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
})
