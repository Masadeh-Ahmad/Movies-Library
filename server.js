'use strict';

const express = require("express");
const movie = require("./MovieData/data.json");
require("dotenv").config();
const axios = require("axios");
const app = express();
const APIKEY = process.env.APIKEY;
const PORT = process.env.PORT;

function Movie(id,title,release_date, poster_path, overview,){
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
    
};

app.get('/', movieHandler);
app.get('/favorite', favoriteHandler);
app.get('/trending', trendingHandler);
app.get("/search", searchHandler);
app.get("/popular", popularHandler);
app.get("/latest", latestHandler);
app.use("*", notFoundHandler);
app.use(errorHandler);

function errorHandler(error,req,res){
    const err = {
        status : 500,
        message : error
    }
    return res.status(500).send(err);
}

function popularHandler(req,res){
    
    let result = [];
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US&page=1`)
    .then(apiResponse => {
        apiResponse.data.results.map(value => {
            let oneMovie = new Movie(value.id,value.title,value.release_date,value.poster_path, value.overview);
            result.push(oneMovie);
        })
        return res.status(200).json(result);
    }).catch(error => {
        errorHandler(error, req, res);
    })

}

function searchHandler(req,res){
    const search = req.query.query
    let results = [];
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${search || "The"}&page=2`)
    .then(apiResponse=>{
        apiResponse.data.results.map(value => {
            let oneMovie = new Movie( value.id || "N/A",value.title || "N/A", value.release_date || "N/A", value.poster_path || "N/A",value.overview || "N/A");
            results.push(oneMovie);  
        });
        return res.status(200).json(results);
    }).catch(error => {
        errorHandler(error, req, res);
    })
}

function latestHandler(req,res){
    axios.get(`https://api.themoviedb.org/3/movie/latest?api_key=${APIKEY}&language=en-US`)
    .then(apiResponse => {
        return res.status(200).json(apiResponse.data);
    }).catch(error => {
        errorHandler(error, req, res);
    })
}

function trendingHandler(req,res){
    
    let result = [];
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}&language=en-US`)
    .then(apiResponse => {
        apiResponse.data.results.map(value => {
            let oneMovie = new Movie(value.id,value.title,value.release_date,value.poster_path, value.overview);
            result.push(oneMovie);
        })
        return res.status(200).json(result);
    }).catch(error => {
        errorHandler(error, req, res);
    })

}
 
function movieHandler(req, res){
    let result = [];
    movie.data.forEach((value) => {
        let oneMovie = new Movie(value.id,value.title,value.release_date,value.poster_path, value.overview);
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


app.listen(PORT, () => {
    console.log(`Listen on ${PORT}`);
});