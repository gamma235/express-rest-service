var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
  var db = req.db;
  db.collection('userlist').find().toArray(function (err, items) {
    res.json(items);
  });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
  var db = req.db;
  db.collection('userlist').insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err });
  });
});

/*
* PUT to updateuser
*/
router.put('/updateuser/:id', function(req, res) {
  var db = req.db
  var userToUpdate = req.params.id;
  var doc = { $set: req.body};
  db.collection('userlist').updateById(userToUpdate, doc ,function(err, result) {
    res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
  });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
  var db = req.db;
  var userToDelete = req.params.id;
  db.collection('userlist').removeById(userToDelete, function(err, result) {
    res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
  });
});

module.exports = router;
