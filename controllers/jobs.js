
var express = require('express')
    , router = express.Router()
    , batch = require('../model/batch');


router.get('/', function (req, res) {
    
        batch.getAllJobs(function (response) {
        if (response.code === 0) {
            res.status(200).json(response);
        } else {
            res.status(500).json(response);
        }
    });
})


router.get('/:jobId', function (req, res) {
    
    batch.findJob(req.query.jobId,
        function (response) {
            if (err) {
                res.status(200).json(response);
            } else {
                res.status(500).json(response);
            }
        });
})


router.post('/', function (req, res) {
    var cronSchedule = "";
   batch.createJob(req.body, function (err,batchJob) {
       if (err || !batchJob) {
                res.status(500).json({
                    code: -1,
                    message: err.message,
                });
            } else {

               //Start Create Job
                cronSchedule = (req.body.second != null ) ? '*' : "'"+req.body.second;
                cronSchedule += (req.body.minute != null ) ? ' *' : " "+ req.body.minute;
                cronSchedule += (req.body.hour != null ) ? ' *' : " "+req.body.hour;
                cronSchedule += (req.body.dayofmonth != null ) ? ' *' : " "+req.body.dayofmonth;
                cronSchedule += (req.body.month != null ) ? ' *' : " "+req.body.month;
                cronSchedule += (req.body.dayofweek != null ) ? ' *' : " "+req.body.dayofweek+"'";

                const job = new CronJob(cronSchedule, function() {
                    process(batchJob.executionFile);
                });
                //End Create job

                //Save File to execute 
                if (req.body.template != null )
                {
                let fileName = "public/" + batchJob.id + ".js";
                var file = fs.createWriteStream(fileName, { flags: 'w' });
                file.write(req.body.template + "\r\n");

                file.on('close', function () {
                    file.end();
                    batchJob.findByIdAndUpdate(id, { executionFile: fileName },
                        { returnNewDocument: true }, function (err, newrequest) {
                            if (err) {
                                res.status(500).json({
                                    code: -1,
                                    message: err.message,
                                });
                            }
                            else
                                res.status(200).json({
                                    code: 0,
                                    message: "New Batch job created Successfully!",
                                })
                        });
                });
                }
            }
        });
});
