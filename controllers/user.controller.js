const moment = require('moment');
const activity = require('../models/activity');

const attendenceMarker = function (req, res) {

  const currentDate = moment().format('DD-MM-YYYY');

  let promise = new Promise(async (resolve, reject) => {
    await activity.findOne({ email: req.body.email, date: currentDate })
      .then(async (findUser) => {
        if (findUser) {
          let activities = findUser.activities

          if (activities[activities.length - 1].activity == req.body.activity) {
            resolve({ message: `already ${req.body.activity} activity is done` })
          }
          else {
            await activity.updateOne(
              { email: req.body.email, date: currentDate },
              {
                $push: {
                  activities: {
                    activity: req.body.activity,
                    time: moment().format('HH:mm:ss'),
                  }
                },
              }
            );
          }
        } else {
          if(req.body.activity=="Checkout"){
            resolve({message:"Can't checkout before checkin"})
          }
          else{
          await activity.create({
            email: req.body.email,
            fullname: req.body.fullname,
            activities: [
              {
                activity: req.body.activity,
                time: moment().format('HH:mm:ss'),
              },
            ],
            date: currentDate,
          });
        }
        }
        let message = req.body.activity == 'Checkin' ? "Checked in succesfully" : "Checked out Successfully"
        resolve({ message: `${message}` });
      })
      .catch((error) => {
        reject(error);
      });
  });

  promise
    .then((data) => {
      res.status(200).send({ code: 200, message: data.message });
    })
    .catch((e) => {
      res.status(400).send({ code: 500, message: e.message });
    });
};

const getUserActivity = function (req, res) {
  const currentDate = moment().format('DD-MM-YYYY');

  let promise = new Promise((resolve, reject) => {
    activity.findOne({ email: req.body.email, date: currentDate })
      .then(async (findUser) => {
        if (findUser) {
          let userActivity = await activity.findOne({
            date: currentDate,
            email: findUser.email
          })
          resolve(userActivity.activities)
        } else {
          resolve(false);
        }


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
  getUserActivity
};
