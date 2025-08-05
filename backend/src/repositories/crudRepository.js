class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      console.error("Create Error:", error);
      throw error;
    }
  }

  async get(id) {
    try {
      const response = await this.model.findById(id);
      return response;
    } catch (error) {
      console.error("Get Error:", error);
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await this.model.find();
      return response;
    } catch (error) {
      console.error("GetAll Error:", error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const response = await this.model.findByIdAndUpdate(id, data, { new: true });
      return response;
    } catch (error) {
      console.error("Update Error:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await this.model.findByIdAndDelete(id);
      return response;
    } catch (error) {
      console.error("Delete Error:", error);
      throw error;
    }
  }
}

module.exports = CrudRepository;
