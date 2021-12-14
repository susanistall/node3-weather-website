const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3f96a3923bf79c0444e9a610cc6de504&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'
    request({ url, json: true }, (error, {body}) => {
         if(error) {
             callback('Unable to connect to location services.', undefined)
         } else if (body.success === false) {
             callback('Unable to find location. Try another search', undefined)
         } else {
             callback(undefined, {
                 description: body.current.weather_descriptions[0],
                 temperature: body.current.temperature,
                 feelslike: body.current.feelslike
             })
         }
    })
}

module.exports = forecast