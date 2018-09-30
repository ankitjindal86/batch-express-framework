const CronJob = require('../lib/cron.js').CronJob;
	  
// console.log('Before job instantiation');
// const job = new CronJob('* * * * * *', function() {
// 	const d = new Date();
// 	console.log('Every second:', d);
// });
// console.log('After job instantiation');
// job.start();

var job = [];
exports.job = job;

module.exports.scheduleJob = function (batchId,cronSchedule,fileToExceute) {
    return new Promise(function (resolve, reject) {
		try{
         console.log('Before job instantiation');
		job[batchJob.id] = new CronJob(cronSchedule, function() {
			process(fileToExceute);
		});
		job[batchJob.id].start();               
         console.log('After job instantiation');
            resolve({})
        } catch(err) {
            reject(err);
        }
    });
}


function proceessFile(filename, cb) {
     require('../public/'+filename);
}