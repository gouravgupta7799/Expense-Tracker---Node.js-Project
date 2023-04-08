
let url ='http://localhost:4000/user'

document.getElementById('submitBtn').addEventListener('click', (e) => {
  e.preventDefault()
  let obj = JSON.stringify({
    name: document.getElementById('nameInput').value,
    email: document.getElementById('emailInput').value,
    contect: document.getElementById('contectInput').value,
    password: document.getElementById('passwordInput').value
  })
 let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: url+'/signin',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : obj
};

axios.request(config)
  .then((response) => {
    window.location.href = 'http://127.0.0.1:5500/logIn/login.html'
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});


})



