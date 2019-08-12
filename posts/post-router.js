const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();


//since we are using knex, we are going to use knex commands for our logic

//get all 'posts'
router.get('/', (req, res) => {
  db.select('id', 'title', 'contents')
    .from('posts')
    // db('posts') // returns a promise that resolves to all records from the posts
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ message: 'error getting the posts from db' });
    });
});

//get 'posts' by user id
router.get('/:id', (req, res) => {
  db('posts')
    .where({ id: req.params.id })
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ message: 'error getting the post from db' });
    });
});

//post a new "post"
router.post('/', (req, res) => {
  const post = req.body;
  //this is where we would validate the post before saving to the DB
  db('posts')//call db and then pass in the posts
    .insert(post, 'id')// insert is a knex command, inserts a post, returns an array containing the id of the post added
    .catch(error => {
      res.status(500).json({ message: 'error getting the post from db' });
    });
});

//edit a 'post'//returns a count f records that were update
router.put('/:id', (req, res) => {
db('posts')
  .where( 'id', '=', req.params.id )
  .update({changes})//before we do this update we MUST select what we want to change specifically or it will chang ALL posts!!
  .then(count => {
    if (count >0){
      res.status(200).json(count);
    }else{
      res.status(500).json({ message: 'No post found with this id' });
    } 
  })
  .catch(error => {
    res.status(500).json({ message: 'error getting the post from db' });
  });
});

//delete a post
router.delete('/:id', (req, res) => {
  db('posts')
  .del()
  .then(count => {
    if (count > 0){
      res.status(200).json(count);
    }else{
      res.status(500).json({ message: 'No post found with this id' });
    } 
  })
  .catch(error => {
    res.status(500).json({ message: 'error removing the post from db' });
  });

});
module.exports = router;
