import SchedulerService from '#services/scheduler_service'
import IncreaseJob from '#jobs/increase'

// Create an instance of the scheduler service on server startup
const scheduler = new SchedulerService()

// Add all jobs which should be run while the server is up
scheduler.addJob({
  key: 'increase',
  cronExpression: '* * * * *',
  job: new IncreaseJob(),
})

// Actually start a scheduler for all jobs
scheduler.scheduleAllJobs()
