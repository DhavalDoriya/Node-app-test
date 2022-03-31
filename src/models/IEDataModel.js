import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

class BlogModel {
    // eslint-disable-next-line class-methods-use-this
    initSchema() {
        const schema = new Schema(
            {
                title: {
                    type: String,
                    default: null,
                },
                price: {
                    type: Number,
                    default: null,
                },
                type: {
                    type: String,
                    required: true
                },
                // date: {
                //     type:  Date(),
                //     default: ISODate(),                    
                //     required: true
                // },
                categoryid: {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'Category',
                    required: true
                },
                userid: {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'User',
                    required: true

                }
            },
            {
                timestamps: true,
            },
        );
        schema.plugin(uniqueValidator);
        mongoose.model('Blog', schema);
    }

    getInstance() {
        this.initSchema();
        return mongoose.model('Blog');
    }

    // eslint-disable-next-line class-methods-use-this
    getModel() {
        return mongoose.model('Blog');
    }
}

export default BlogModel;
