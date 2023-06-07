const moment = require('moment');
const activity = require('../models/activity');

const attendenceMarker = function (req, res) {
  const currentDate = moment().format('DD-MM-YYYY');

  let promise = new Promise((resolve, reject) => {
    activity.findOne({ email: req.body.email, date: currentDate })
      .then(async (findUser) => {
        if (findUser) {
          await activity.updateOne(
            { email: req.body.email, date: currentDate },
            {
              $push: {
                activities: {
                  activity: req.body.activity,
                  time: moment().format('HH:mm:ss'),
                  date: currentDate,
                },
              },
            }
          );
        } else {
          await activity.create({
            email: req.body.email,
            fullname: req.body.fullname,
            activities: [
              {
                activity: req.body.activity,
                time: moment().format('HH:mm:ss'),
                date: currentDate,
              },
            ],
            date: currentDate,
          });
        }

        console.log(currentDate);
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });

  promise
    .then((data) => {
      res.status(200).send({ code: 200, data: data });
    })
    .catch((e) => {
      res.status(400).send({ code: 500, message: e.message });
    });
};

module.exports = {
  attendenceMarker,
};
