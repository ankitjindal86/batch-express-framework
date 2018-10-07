var batch = require('../model/batch')
    , config = require('../config/cronJob');


module.exports.createJob = function (request, callback) {
    return new Promise((resolve, reject) => {

        try {
            var cronSchedule = "";
            var rule = new schedule.RecurrenceRule();
            batch.saveJob(request, function (err, batchJob) {
                if (err || !batchJob) {
                    reject(err ? err : new Error('Unkown DB error fails to save new job'));
                }
                else {
                    //Create Job scheduler
                    cronSchedule = (request.second != null) ? '*' : "'" + request.second;
                    cronSchedule += (request.minute != null) ? ' *' : " " + request.minute;
                    cronSchedule += (request.hour != null) ? ' *' : " " + request.hour;
                    cronSchedule += (request.dayofmonth != null) ? ' *' : " " + request.dayofmonth;
                    cronSchedule += (request.month != null) ? ' *' : " " + request.month;
                    cronSchedule += (request.dayofweek != null) ? ' *' : " " + request.dayofweek + "'";

                    //Save File to execute 
                    if (request.template != null) {
                        let fileName = "public/" + batchJob.id + ".js";
                        var file = fs.createWriteStream(fileName, { flags: 'w' });
                        file.write(request.template + "\r\n");

                        file.on('close', function () {
                            file.end();
                            batchJob.findByIdAndUpdate(id, { executionFile: fileName },
                                { returnNewDocument: true }, function (err, newrequest) {
                                    if (err) {
                                        reject(err);
                                    }
                                    else
                                        config.scheduleJob(batchJob.id, cronSchedule, fileName);
                                    resolve("New Batch job created Successfully!");
                                });
                        });
                    }
                }
            });
        }
        catch (err) { reject(err); }
    });
}