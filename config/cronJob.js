const CronJob = require('cron').CronJob;

var job = [];

module.exports.scheduleJob = function (batchId, cronSchedule, fileToExceute) {
    return new Promise(function (resolve, reject) {
        try {
            console.log('Before job instantiation');
            job[batchJob.id] = new CronJob(cronSchedule, function () {
                process(fileToExceute);
            });
            job[batchJob.id].start();
            console.log('After job instantiation');
            resolve({})
        } catch (err) {
            reject(err);
        }
    });
}


function proceessFile(filename, cb) {
    require('../public/' + filename);
}