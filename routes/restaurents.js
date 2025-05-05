const express = require('express');
const resData = require('../util/restaurant-file');
const uuid = require('uuid');
const router = express.Router();


router.get('/restaurents', function (req, res) {
    const storedRestaurants = resData.getStoredRestaurants();
    let order=req.query.order;
    let nextOrder='desc';
    if(order!=='asc' && order!=='desc'){
        order='asc';
    }
    if(order==='desc'){
        nextOrder='asc';
    }
    storedRestaurants.sort(function(resD,resC){
        if((order==='asc' && resD.name>resC.name) || 
        (order==='desc'  && resC.name>resD.name)){
            return 1
        }
        return -1
    });
    res.render('restaurents', {
        numberofRestaurants: storedRestaurants.length,
        restaurents: storedRestaurants,
        nextOrder:nextOrder
    });
});

router.get('/restaurants/:id', function (req, res) {
    const restaurantId = req.params.id;
    const storedRestaurants = resData.getStoredRestaurants();

    for (const restaurant of storedRestaurants) {
        if (restaurant.id === restaurantId) {
            return res.render('restaurents-details', { restaurant: restaurant });
        }
    }
    res.status(404).render('404');
});

router.get('/recommend', function (req, res) {
    res.render('recommend');
});

router.post('/recommend', function (req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();

    const storedRestaurants = resData.getStoredRestaurants();
    storedRestaurants.push(restaurant);

    resData.saveRestaurants(storedRestaurants); // Correct function for writing data
    res.redirect('/confirm');
});

router.get('/confirm', function (req, res) {
    res.render('confirm');
});

module.exports=router;