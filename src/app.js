const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        name: 'Susan'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Weather App',
        name: 'Susan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'You must enter an address.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                title: 'Weather',
                error: error
            })
        }
        forecast(latitude, longitude, (error1, {description, temperature, feelslike} = {}) => {
            if(error1){
                return res.send({
                    title: 'Weather',
                    error: error1
                })
            }
            res.send({
                title: 'Weather',
                forecast: description,
                temperature,
                feelslike,
                location
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: 'Help',
        message: 'Help page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Error: page not found'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () =>{
    console.log('Server is up on port 3000')
})