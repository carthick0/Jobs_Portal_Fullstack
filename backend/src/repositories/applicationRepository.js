const CrudRepository = require('./crudRepository');
const Application = require('../models/Application');

class ApplicationRepository extends CrudRepository {
  constructor() {
    super(Application);
  }

  async findByJob(jobId) {
    return this.model.find({ job: jobId }).populate('job').sort({ appliedAt: -1 });
  }

  async findByApplicantEmail(email) {
    return this.model.find({ applicantEmail: email }).populate('job').sort({ appliedAt: -1 });
  }
}

module.exports = new ApplicationRepository();
