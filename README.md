## Express Batch Framework
### Overall Application Setup
* Application startup uses agenda with mongo
* Agenda defined with one job
* Agenda runs this job for every job scheduled or submitted

### Agenda Job Configuration
* This job definition takes into consideration any job configuration as data and then processes
* This should attach the processing of job to be done by a dynanic file based on input

### API 
Method | URI | Description
------ | --- | -----------
POST | /v1/jobs | Create a new Job
GET | /v1/jobs | Get all the jobs
GET | /v1/jobs/:jobId | Get a specific job details

### Model
TODO