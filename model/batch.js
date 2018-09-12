var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var batchSchema = new Schema({
  "name": { type: String},
  "executionFile": { type: String },
  "frequency": "",
  "dateTime": "",
  "lastRunAt": "",
  "nextRunAt": "",
});

var batch = mongoose.model('batch', batchSchema);


module.exports.createBatch = function ({name, excecutionFile, frequency}, callback) {
  // encrypt the password before storing
  var user = new User({
    name: name,
    excecutionFile: excecutionFile,
    frequency: frequency
  });

  user.save(function (err, doc) {
    if (err) {
      callback({
        code: -1,
        message: err.message,
      })
    } else {
      callback({
        code: 0,
        message: "Batch created Successfully!",
      })
    }
  })
}

module.exports.findBatch = function (batchName, callback) {

    var query = { name: batchName };
    var options = {};
    batch.findOne(query, function (err, data) {
        if (err)
            callback({ code: -1, message: 'Error in fetching batch details:' + err });
        if (!data)
            callback({ code: 1, message: 'No record for batch with name' + batchName });
        if (data)
            callback({ code: 0, message: 'SUCCESS', response: data });
    });
}


module.exports.getBatches = function (id,callback) {
      //'reportName reportType createdDate completedDate estimatedDuration downloadUrl'
        reportModel.find(function (err, data) {
            if (err || (data.length == 0) || !data )
                callback(err ? err : new Error('No batch job found'), null);
             else
                callback({ code: 0, message: 'SUCCESS', response: data });
        });
}
