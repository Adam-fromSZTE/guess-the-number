const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const { json } = require("body-parser");

const gameSchema = require("../models/gameModel");

//Start game
router.post("/start-game", (req, res, next) => {
  const newGame = new gameSchema({
    name : req.body.name,
    number : Math.floor(Math.random() * req.body.interval),
    time : new Date(),
    intervalMax: req.body.interval
  })
    gameSchema.create(newGame, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data._id);
      res.json(data._id);
    }
  });
});

//Tipp
router.post("/tipp/:id", (req, res) => {
  gameSchema.findById(req.params.id, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log('ide eljut:' + data.number + '||' + req.body.number)
      if (data.number > req.body.number){
        //kisebbet tippelt
        res.json('A tipped kisebb mint a szám');
      } else if (data.number < req.body.number) {
        //nagyobbat tippelt
        res.json('A tipped nagyobb mint a szám');
      } else {        
        gameSchema.findByIdAndUpdate(
          req.params.id,
          {
            time : Math.round((new Date - data.time)/1000)
          },
          (error, data) => {
            if (error) {
              console.log(error);
            } else {
              res.json('Eltaláltad, már sorsoltam is egy új számot');
              console.log("Game updated succesfully");
            }
          }
        );
      }
    }
  });
});

router.delete("/delete-game/:id", (req, res, next) => {
  gameSchema.findByIdAndRemove(req.params.id, (error, data) => {
  if (error) {
    return next(error);
  } else {
    res.status(200).json({
      msg: data,
    });
  }
});
});

//Read game
router.get("/table", (req, res) => {
  gameSchema.find({time: {$lt: 1000}}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
});

  module.exports = router;