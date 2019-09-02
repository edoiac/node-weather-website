const path = require('path');
const fs = require('fs');
const geocode = require('./utils/utils');
const forecast = require('./utils/forecast');
// setup hbs
const hbs = require('hbs');
const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

// setup express
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// setup path for static files
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// setup view engine and path
const viewsPath = path.join(__dirname, '../templates/views');
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// setup node sass
const sass = require('node-sass');
const cssPath = path.join(__dirname, '../public/css');

app.get('', (req, res) => {
    res.render('index', {
       title: 'Weather',
       name: 'Edoardo'
   });
});

app.get('/about', (req, res) => {
   res.render('about', {
       title: 'About',
       name: 'Edoardo'
   });
});

app.get('/help', (req, res) => {
   res.render('help', {
       title: 'Help',
       name: 'Edoardo'
   });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you have to provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errormessage: 'Help article not found',
        name: 'Edoardo'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errormessage: 'Page not found',
        name: 'Edoardo'
    });
});

sass.render({
    file: `./src/style.scss`,
    outFile: cssPath,
    outputStyle: 'compressed',
    sourceMapEmbed: true
}, (err, result) => {
    if (err) {
        console.log(err);
        return
    }
    fs.writeFile(`${cssPath}/style.css`, result.css, function(err){
        if(!err){
            console.log('file written!');
        }
    });
});


app.listen(port, () => {
    console.log(`server started!! running on ${port}`);
});

