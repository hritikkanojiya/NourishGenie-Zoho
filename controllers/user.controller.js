const moment = require('moment');
const activity = require('../models/activity');

const attendenceMarker = function (req, res) {
  const currentDate = moment().format('DD-MM-YYYY');
  let promise = new Promise(async (resolve, reject) => {
    try {
      const findUser = await activity.findOne({ email: req.body.email, date: currentDate });

      if (findUser) {
        let activities = findUser.activities;
        let latestActivity = activities[activities.length - 1].activity;

        if (req.body.activity === 'breakin') {
          // Check if the latest activity is checkin or checkout
          if (latestActivity === 'checkin' || latestActivity === 'breakout') {
            // Update the activities array with the new activity and time
            let updatedActivities = [...activities];
            updatedActivities.push({
              activity: req.body.activity,
              time: moment().format('HH:mm:ss'),
            });

            // Update the user's activities
            await activity.updateOne(
              { email: req.body.email, date: currentDate },
              {
                $set: { activities: updatedActivities },
              }
            );

            resolve({ message: `${req.body.activity} marked successfully` });
          } else {
            resolve({ message: "Can't perform this activity without checking in or break out" });
          }
        } else if (req.body.activity === 'checkin') {
          // Check if the latest activity is checkout or checkin
          if (latestActivity === 'checkout' ) {
            // Update the activities array with the new activity and time
            let updatedActivities = [...activities];
            updatedActivities.push({
              activity: req.body.activity,
              time: moment().format('HH:mm:ss'),
            });

            // Update the user's activities
            await activity.updateOne(
              { email: req.body.email, date: currentDate },
              {
                $set: { activities: updatedActivities },
              }
            );

            resolve({ message: `${req.body.activity} marked successfully` });
          } else {
            resolve({ message: "Can't perform this activity without checking out" });
          }
        } else if (req.body.activity === 'checkout') {
          // Check if the latest activity is checkin
          if (latestActivity === 'checkin' || latestActivity === 'breakout') {
            // Update the activities array with the new activity and time
            let updatedActivities = [...activities];
            updatedActivities.push({
              activity: req.body.activity,
              time: moment().format('HH:mm:ss'),
            });

            // Update the user's activities
            await activity.updateOne(
              { email: req.body.email, date: currentDate },
              {
                $set: { activities: updatedActivities },
              }
            );

            resolve({ message: `${req.body.activity} marked successfully` });
          } else {
            resolve({ message: "Can't perform this activity without checking in" });
          }
        } else if(req.body.activity === 'breakout') {
          if (latestActivity === 'breakin') {
          // Update the activities array with the new activity and time
          let updatedActivities = [...activities];
          updatedActivities.push({
            activity: req.body.activity,
            time: moment().format('HH:mm:ss'),
          });
          // Update the user's activities
          await activity.updateOne(
            { email: req.body.email, date: currentDate },
            {
              $set: { activities: updatedActivities },
            }
          );
          
          resolve({ message: `${req.body.activity} marked successfully` });
          }
          else {
            resolve({ message: "Can't perform this activity without breakin break" });
          }
        }
      } else {
        if (req.body.activity === 'checkout' || req.body.activity === 'breakin' || req.body.activity === 'breakout') {
          resolve({ message: "Can't perform this activity without checking in" });
        } else {
          // Create a new attendance record for the user
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

          resolve({ message: `${req.body.activity} marked successfully` });
        }
      }
    } catch (error) {
      reject(error);
    }
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
