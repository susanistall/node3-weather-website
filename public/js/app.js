const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
var messageOne = document.querySelector('#message-1')
var messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value
     
    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        console.log(data.location)
       if(data.error) {
           messageOne.textContent = data.error
           messageTwo.textContent = ''
       }
       else {
           messageOne.textContent = data.location
           messageTwo.textContent = data.forecast + ': ' + data.temperature + ' degrees. Feels like ' + data.feelslike + ' degrees. Humidity is ' + data.humidity + '%.'
       }
    })
})
})