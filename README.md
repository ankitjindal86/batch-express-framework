## Express Batch Framework
### Overall Application Setup
* Application startup uses node cron with mongo
* Node cron defined with one job
* Node cron runs this job for every job scheduled or submitted

### Node cron Job Configuration
* This job definition takes into consideration any job configuration as data and then processes
* This should attach the processing of job to be done by a dynanic file based on input

### API 
Method | URI | Description
------ | --- | -----------
POST | /v1/jobs | Create a new Job
GET | /v1/jobs | Get all the jobs
GET | /v1/jobs/:jobId | Get a specific job details

### Data Model
"name": { type: String }, 
"frequency": "", //once , recurrence, 
"second" : "", 
"minute": "",
"hour": "", 
"dayofmonth": "", 
"month": "", 
"dayofweek": "", 
"dataTemplate": { type: String }