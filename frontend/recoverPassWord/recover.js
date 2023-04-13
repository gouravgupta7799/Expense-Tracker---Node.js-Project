
let url = 'http://localhost:4000'
let idurl = document.URL;


document.getElementById('resetPassword').addEventListener('click', (e) => {
  // e.preventDefault()
  let newobj = {
    nameInput: document.getElementById('nameInput').value,
    emailInput: document.getElementById('emailInput').value,
    passwordInput: document.getElementById('passwordInput').value,
    id: idurl.split('=')[1]
  }
  console.log(newobj)
  axios.post('http://localhost:4000/password/resetPassword', newobj, { headers: { 'Content-Type': 'application/json' } })
    .then(res => {
      window.location.href = `http://127.0.0.1:5500/logIn/login.html?`
    })

})

