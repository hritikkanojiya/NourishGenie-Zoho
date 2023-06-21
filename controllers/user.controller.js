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
  var userData=[]
  let promise = new Promise((resolve, reject) => {
    activity.findOne({ email: req.body.email, date: currentDate })
      .then(async (findUser) => {
        if (findUser) {
          let userActivity = await activity.find({
            date: currentDate})

             for (const iterator of userActivity) {
              const timeSummary = calculateTimeSummary(iterator);
              userData.push({
                "email":iterator.email ,
                "fullname":iterator.fullname ,
                "activities":iterator.activities,
                "date":iterator.date,
                totalLoggedinTime:moment.duration(timeSummary.totalLoggedInTime).humanize(),
                totalBreakTime:moment.duration(timeSummary.totalBreakTime).humanize(),
                totalLoginTimeWithoutBreak:moment.duration(timeSummary.totalLoggedInTimeWithoutBreaks).humanize()
              })
              console.log('Total Logged-in Time:', moment.duration(timeSummary.totalLoggedInTime).humanize());
              console.log('Total Break Time:', moment.duration(timeSummary.totalBreakTime).humanize());
              console.log('Total Logged-in Time without Breaks:', moment.duration(timeSummary.totalLoggedInTimeWithoutBreaks).humanize());
              
            }
       resolve(userData)
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

function calculateTimeSummary(record) {
  let totalLoggedInTime = 0;
  let totalBreakTime = 0;
  let totalLoggedInTimeWithoutBreaks = 0;
  let checkInTime = null;
  let isInBreak = false;
  let breakStartTime = null;

  // Iterate through the activities
  for (let i = 0; i < record.activities.length; i++) {
    const activity = record.activities[i];

    if (activity.activity === 'checkin') {
      // Set the check-in time
      checkInTime = moment(activity.time, 'HH:mm:ss');
    } else if (activity.activity === 'breakin') {
      // Set the break start time
      isInBreak = true;
      breakStartTime = moment(activity.time, 'HH:mm:ss');
    } else if (activity.activity === 'breakout') {
      if (isInBreak && checkInTime) {
        // Calculate the break duration and add it to the total break time
        const breakEndTime = moment(activity.time, 'HH:mm:ss');
        const breakDuration = moment.duration(breakEndTime.diff(breakStartTime)).asMilliseconds();
        totalBreakTime += breakDuration;

        // Reset the break start time and break status
        breakStartTime = null;
        isInBreak = false;
      }
    } else if (activity.activity === 'checkout') {
      if (checkInTime) {
        // Calculate the duration between check-in and check-out
        const checkOutTime = moment(activity.time, 'HH:mm:ss');
        const duration = moment.duration(checkOutTime.diff(checkInTime)).asMilliseconds();
        totalLoggedInTime += duration;

        // Calculate the duration between check-in and check-out excluding breaks
        const durationWithoutBreaks = duration - totalBreakTime;
        totalLoggedInTimeWithoutBreaks += durationWithoutBreaks;

        // Reset the check-in time for the next pair of activities
        checkInTime = null;
      }
    }
  }

  return {
    totalLoggedInTime,
    totalBreakTime,
    totalLoggedInTimeWithoutBreaks,
  };
}





module.exports = {
  attendenceMarker,
  getUserActivity
};
