var express = require('express');
var router  = express.Router();
var db      = require('../models/index.js')

/* GET lists */
router.get('/', function(_req, res) {
  db.List.findAll().then(lists => {
    res.render('lists/index', { title: 'Table lists', lists: lists })
  })
});

/* GET list */
router.get('/:id/show', function(req, res){
  db.List.findByPk(req.params.id).then(list => {
    res.render('lists/show', { title: 'Show List', list: list })
  })
})

/* GET new page list */
router.get('/new', function(_req, res) {
  res.render('lists/new', { title: 'New List', list: [{}] })
})

/* POST new lists */
router.post('/', function(req, res){
  db.List.create(req.body).then(() => { res.redirect('/lists') })
})

/* GET edit list */
router.get('/edit/:id', function(req, res) {
  db.List.findByPk(req.params.id).then(list => {
    res.render('lists/edit', { title: 'Edit List', list: list})
  })
})

/* POST update list */
router.post('/edit/:id/update', function(req, res) {
  const id = req.params.id;

  db.List.update(req.body, { where: { id }}).then(() => {
    res.redirect('/lists')
  })
})

/* GET delete list */
router.get('/:id/delete', function(req, res){
  const id = req.params.id;

  db.List.destroy({ where: { id }}).then(() => {
    res.redirect('/lists')
  })
})

module.exports = router;