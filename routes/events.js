var express = require('express');
    Event = require('../models/event');
    User = require('../models/user');
var router = express.Router();

//로그인 되어있는지 확인
function needAuth(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.flash('danger', 'Please signin first.');
      res.redirect('/signin');
    }
}

/* GET home page. */
//events 누르면 index로 이동
router.get('/', function(req, res, next) {
  Event.find({}, function(err, events) {
    console.log(events);
    res.render('events/index', {events: events});
  });
});

//생성하는 페이지로 이동
router.get('/new', needAuth, function(req, res, next) {
  res.render('events/new');
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

//저장된 이벤트를 보여주는 부분
router.get('/:id', function(req, res, next) {
  Event.findById(req.params.id, function(err, event) {
    if (err) {
      return next(err);
    }
    res.render('events/show', {event: event});
  });
});

//이벤트 삭제
router.delete('/:id', needAuth, (req, res, next) => {
 Event.findOneAndRemove(req.params.id, function(err, event) {
   if(err) {
     return next(err);
   }
   req.flash('success', 'Deleted Successfully.');
   res.redirect('/events');
 });
});

//이벤트 수정
/*router.get('/:id/edit', needAuth, (req, res, next) => {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    }
    res.render('events/edit', {event: event});
  });
});

router.put('/:id', needAuth, (req, res, next) => {
  var err = validateForm(req.body);
  if (err) {
    req.flash('danger', err);
    return res.redirect('back');
  }
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
      req.flash('success', 'Updated successfully.');
      res.redirect('/events');
    });
});*/

module.exports = router;
