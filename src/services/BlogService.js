import { ExportCustomJobPage } from 'twilio/lib/rest/bulkexports/v1/export/exportCustomJob';
import Service from './Service';
import bcrypt from 'bcrypt';
import { verify } from 'jsonwebtoken';
import Category from '../models/CategoryModel';
import dotenv from "dotenv";
dotenv.config();


class BlogService extends Service {
    constructor(model) {
        super(model);
        this.insertblog = this.insertblog.bind(this);
        this.updateblog = this.updateblog.bind(this);
        this.deleteblog = this.deleteblog.bind(this);
        this.getblog = this.getblog.bind(this);
        this.getAllblog = this.getAllblog.bind(this);
    }
    async insertblog(data, userid,category) {
        try {
           (category.data._id) 
                var blog = new this.model({
                    title: data.title,
                    Description: data.Description,
                    categoryid: data.categoryid,
                    userid: userid
                });
                data = await blog.save()
                return {
                    error: false,
                    statusCode: 202,
                    data: data,
                };
         
                return {
                    error: true,
                    statusCode: 500,
                    message: 'category not found',
                    errors: error,
                };
        }
        catch (err) {
            console.log(err)
            return {
                error: true,
                statusCode: 500,
                message: 'Not able to create item',
                errors: err,
            };
        }
    }
    async updateblog(a) {
        try {
            let tempuser = await this.model.findOne({ "userid": a.userid })
            if (tempuser) {

                data = await this.model.findByIdAndUpdate(a.blogid, { $set: a.body }, { new: true })
                return {
                    error: false,
                    deleted: true,
                    statusCode: 200,
                    message: 'blog update successfullly!',
                };
            } else {
                return {
                    error: true,
                    statusCode: 404,
                    message: 'blog not found',
                };
            }

        } catch (err) {
            console.log(err)
            return {
                error: true,
                statusCode: 500,
                message: 'blog not found',
                errors: err,
            };
        }
    }
    async deleteblog(a) {
        try {
            let tempuser = await this.model.find({ "userid": a.userid })
            if (tempuser) {
                let blogid = await this.model.findByIdAndDelete(a.blogid)
                if (blogid) {
                    return {
                        error: false,
                        deleted: true,
                        statusCode: 200,
                        message: 'blog delete successfullly!',
                    };
                } else {
                    return {
                        error: true,
                        statusCode: 404,
                        message: 'blog not found',
                    };
                }

            }
        } catch (err) {
            console.log(err)
            return {
                error: true,
                statusCode: 500,
                message: 'Error 500',
                errors: err,
            };
        }
    }

    async getblog(a) {
        let tempuser = await this.model.findOne({ "userid": a.userid })
        if (tempuser) {
            try {
                let blogdata = await this.model.findById(a.blogid)
                return {
                    error: false,
                    statusCode: 202,
                    data: blogdata,
                };
            } catch (err) {
                console.log(err)
                return {
                    error: true,
                    statusCode: 500,
                    message: 'Not able to get blog',
                    errors: err,
                };
            }
        } else {
            return {
                error: true,
                statusCode: 500,
                message: 'Not able to get blog'

            }

        }
    }
    async getAllblog(a) {
        try {

            let blogdata = await this.model.find({ "userid": a.userid })
            return {
                error: false,
                statusCode: 202,
                totalblog: blogdata.length,
                data: blogdata,
            };
        } catch (err) {
            console.log(err)
            return {
                error: true,
                statusCode: 500,
                message: 'Not able to get blog',
                errors: err,
            };
        }
    }

    async getblogbycatid(user, category) {
        try {
            let blogs = await this.model.find({ userid: user, categoryid: category })
            // console.log(checkuser)
            return {
                error: false,
                statusCode: 202,
                //totaldata: blogdata.length,
                data: blogs,
            };
        } catch (error) {
            console.log(error)
        }
    }
}

export default BlogService;
