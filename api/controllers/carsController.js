'use strict'

const request = require('request');

const vehicleApiUrl = 'https://vpic.nhtsa.dot.gov/api';

function sendError(statusCode, message, req, res) {
    res.status(statusCode);

    if (req.accepts('html')) {
        let statusText = '';
        switch(statusCode) {
            case 400: statusText = "400 Bad Request"; break;
            case 403: statusText = "403 Forbidden"; break;
            case 404: statusText = "404 Not Found"; break;
            case 500: statusText = "500 Internal Server Error"; break;
        }
        res.render('error', { statusText: statusText, message: message });
        return;
    }

    if (req.accepts('json')) {
        res.send({ error: message });
        return;
    }

    res.type('txt').send(message);
}

function sendFinalValue(baseValue, age, owners, mileage, collisions, req, res) {
    const agePenalty = 1 - (Math.min(120, Math.max(0, age)) * 0.005);
    const milesPenalty = 1 - (Math.floor(Math.min(150000, Math.max(0, mileage)) / 1000) * 0.002);
    const manyOwnersPenalty = owners > 2 ? 0.75 : 1;
    const collisionPenalty = 1 - (Math.min(5, Math.max(0, collisions)) * 0.02);
    const noOwnerBonus = owners <= 0 ? 1.1 : 1;
    const multiplier = agePenalty * milesPenalty * manyOwnersPenalty * collisionPenalty * noOwnerBonus; 
    const value = (baseValue * multiplier).toFixed(2);
    const percentage = (multiplier * 100).toFixed(2);

    if (req.accepts('html')) {
        res.render('finalValue', { value: value, baseValue: baseValue, percentage: percentage });
        return;
    }

    if (req.accepts('json')) {
        res.send({ value: value, baseValue: baseValue, percentage: percentage });
        return;
    }

    res.type('txt').send(value.toString());
}

function validateNumbers(age, owners, mileage, collisions, req, res) {
    if (isNaN(age))         { sendError(400, "'age' must be a number.", req, res); return false; }
    if (isNaN(owners))      { sendError(400, "'owners' must be a number.", req, res); return false; }
    if (isNaN(mileage))     { sendError(400, "'mileage' must be a number.", req, res); return false; }
    if (isNaN(collisions))  { sendError(400, "'collisions' must be a number.", req, res); return false; }

    return true;
}

exports.makes = function(req, res) {
    request(vehicleApiUrl + '/vehicles/GetAllMakes?format=json', { json: true }, (err, vehicleRes, body) => {
        if (err) {
            sendError(vehicleRes.statusCode, err, req, res);
        } else {
            res.send({makes: body.Results.map(r => { return r.Make_Name; })});
        }
    });
}

exports.models = function(req, res) {
    const make = req.params.make;

    request(vehicleApiUrl + '/vehicles/GetModelsForMake/' + make + '?format=json', { json: true }, (err, vehicleRes, body) => {
        if (err) {
            sendError(vehicleRes.statusCode, err, req, res);
        } else if (body.Count == 0) {
            sendError(400, "Invalid make.", req, res);
        } else {
            res.send({models: body.Results.map(r => { return r.Model_Name; })});
        }
    });
}

exports.value = function(req, res) {
    const make = req.params.make;
    const model = req.params.model;
    const ageString = req.params.age;
    const ownersString = req.params.owners;
    const mileageString = req.query.mileage;
    const collisionsString = req.query.collisions;
    
    const age = parseInt(ageString);
    const owners = parseInt(ownersString);
    const mileage = mileageString ? parseInt(mileageString) : 0;
    const collisions = collisionsString ? parseInt(collisionsString) : 0;

    if(!validateNumbers(age, owners, mileage, collisions, req, res)) { return; }

    request(vehicleApiUrl + '/vehicles/GetModelsForMake/' + make + '?format=json', { json: true }, (err, vehicleRes, body) => {
        if (err) {
            sendError(vehicleRes.statusCode, err, req, res);
        } else if (body.Count == 0) {
            sendError(400, "Invalid make.", req, res);
        } else {
            const modelInfo = body.Results.find(r => { return r.Model_Name.toLowerCase() === model.toLowerCase(); });
            if(!modelInfo) {
                sendError(400, "Invalid model.", req, res);
            } else {
                //hey how the heck do I actually get a price on these things? Ideally I'd do that here.
                sendFinalValue(20000, age, owners, mileage, collisions, req, res);
            }
        }
    });
}
