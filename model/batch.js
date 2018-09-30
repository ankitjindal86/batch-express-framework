var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var batchJobSchema = new Schema({
  "name": { type: String },
  "executionFile": { type: String },
  "frequency": "", //once , recurrence,
  "second" : "",
  "minute": "",
  "hour": "",
  "dayofmonth": "",
  "month": "",
  "dayofweek": "",
  "jobCreateDatee": "",
  "lastRunAt": "",
  "nextRunAt": ""
});

var batchJob = mongoose.model('batchJob', batchJobSchema);


module.exports.createJob = function (reqData, callback) {
  // encrypt the password before storing
  var newJob = new batchJob({
    name: reqData.name,
    frequency: reqData.frequency,
    minutes: reqData.minutes,
    hours: reqData.hours,
    days: reqData.days,
    months: reqData.months,
    dayofweek: reqData.dayofweek,
    jobCreateDatee: new Date().toLocaleString
  });

  newJob.save(function (err, doc) {
    if (err) 
      callback(err,null)
    else 
      callback(null,doc)
  });
}

module.exports.findJob = function (jobId, callback) {

  var query = { id: jobId };
  var options = {};
  batchJob.findOne(query, function (err, data) {
    if (err)
      callback({ code: -1, message: 'Error in fetching batch job details:' + err });
    if (!data)
      callback({ code: 1, message: 'No record for batch job with id' + jobId });
    if (data)
      callback({ code: 0, message: 'SUCCESS', response: data });
  });
}


module.exports.getAllJobs = function (callback) {
  //'reportName reportType createdDate completedDate estimatedDuration downloadUrl'
  batchJob.find(function (err, data) {
    if (err || (data.length == 0) || !data)
      callback(err ? err : new Error('No batch job found'), null);
    else
      callback({ code: 0, message: 'SUCCESS', response: data });
  });
}
