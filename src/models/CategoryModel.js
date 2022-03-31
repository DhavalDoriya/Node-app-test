import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class CategoryModel {
  // eslint-disable-next-line class-methods-use-this
  initSchema() {
    const schema = new Schema(
      {
        Categoryname: {
          type: String,
          default: null,
        },
        // userid: {
        //   type:mongoose.Schema.Types.ObjectId,
        //   ref:'User',
        //   required: true
        // }
      }
    );
    schema.plugin(uniqueValidator);
    mongoose.model('Category', schema);
  }
  
  getInstance() {
    this.initSchema();
    return mongoose.model('Category');
  }

  // eslint-disable-next-line class-methods-use-this
  getModel() {
    return mongoose.model('Category');
  }
}

export default CategoryModel;
