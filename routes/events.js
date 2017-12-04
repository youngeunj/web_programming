var express = require('express'),
    Event = require('../models/event');
var router = express.Router();

/* GET home page. */

//events 누르면 index로 이동
router.get('/', function(req, res, next) {
  Event.find({}, function(err, events) {
    console.log(events);
    res.render('events/index', {events: events});
  })
});

//이벤트에 대한 정보를 입력해서 생성하는 부분
router.post('/', function(req, res, next) {
  var event = new Event();
  event.eventName = req.body.eventName;
  event.place = req.body.place;
  event.startTime = req.body.startTime;
  event.endTime = req.body.endTime;
  event.eventExp = req.body.eventExp;
  event.category = req.body.category;
  event.groupName = req.body.groupName;
  event.groupExp = req.body.groupExp;
  event.price = req.body.price;
  event.save(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/events');
  });
});

//생성하는 페이지로 이동
router.get('/new', function(req, res, next) {
  res.render('events/new');
});

//이벤트 삭제하기
/*
router.delete('/:id', needAuth, (req, res, next) => {
  User.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Deleted Successfully.');
    res.redirect('/users');
  });
});
*/

//저장된 이벤트를 보여주는 부분 (이벤트를 누르면 상세 내용 나오게)
router.get('/:id', function(req, res, next) {
  Event.findById(req.params.id, function(err, event) {
    if (err) {
      return next(err);
    }
    res.render('events/show', {event: event});
  })
});

module.exports = router;
