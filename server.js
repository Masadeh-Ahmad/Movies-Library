'use strict';

const express = require("express");

const movie = require("./MovieData/data.json");


const app = express();


function Movie(title, poster_path, overview,){
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
};

app.get('/', movieHandler);
app.get('/favorite', favoriteHandler);

app.use("*", notFoundHandler);



function movieHandler(req, res){
    
    let result = [];
    
    movie.data.forEach((value) => {
        let oneMovie = new Movie(value.title,value.poster_path, value.overview);
        result.push(oneMovie);
    });
    
    return res.status(200).json(result);
};


function favoriteHandler(req, res){
    
    return res.status(201).json("Welcome to Favorite Page");
};


function notFoundHandler(req, res){
    return res.status(404).send("Page Not Found");
}
function serverErrorHandler(req, res){
    error = {
        "status": 500,
        "responseText": "Sorry, something went wrong"
    }
    return res.status(500).send(error);
}


app.listen(3000, () => {
    console.log("Listen on 3000");
});