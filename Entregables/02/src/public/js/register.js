const form = document.getElementById("registerForm");

form.addEventListener('submit', e => {
    e.preventDefault()
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key) => obj[key] = value);
    
    // Aquí enviamos la info hacia las APIs
    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'applicarion/json'
        }
    })
}).then(result =>{
    if (result.status === 200)
        window.location.replace('/users/login')
})