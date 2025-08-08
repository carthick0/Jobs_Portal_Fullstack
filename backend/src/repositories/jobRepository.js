const CrudRepository = require('./crudRepository');
const Job =require('../models/jobs')

class JobRepository extends CrudRepository {
  constructor() {
    super(Job);
  }

  async searchByKeywordOrLocation(q) {
    if (!q) return this.getAll();
    const regex = new RegExp(q, 'i');
    return this.model.find({
      $or: [
        { title: regex },
        { company: regex },
        { location: regex },
        { description: regex }
      ]
    }).sort({ createdAt: -1 });
  }
}

module.exports = new JobRepository();
