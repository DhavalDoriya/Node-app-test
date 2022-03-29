import Service from './Service';
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

    //insert blog by id and userid(jwt)
    async insertblog(data, userid) {
        try {
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
        } catch (error) {
            return {
                error: true,
                statusCode: 500,
                message: 'category not found',
            };
        }
    }
    //update blog by id and userid(jwt)
    async updateblog(blogid, data, userid) {
        try {
            let tempuser = await this.model.findOne({ "userid": userid })
            if (tempuser) {
                const updatedBlog = await this.model.updateOne({ _id: blogid },  data );
                return {
                    error: false,
                    deleted: true,
                    statusCode: 200,
                    message: 'blog update successfullly!',
                    data: updatedBlog
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

    //delete blog by id and userid(jwt)
    async deleteblog(blogid, userid) {
        try {
            let tempuser = await this.model.find({ "userid": userid })
            let blog = await this.model.findByIdAndDelete(blogid)
            if (blog) {
                return {
                    error: false,
                    deleted: true,
                    statusCode: 200,
                    message: 'blog delete successfullly!',
                    data: blog
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
                message: 'Error 500',
                errors: err,
            };
        }
    }

    //get all blog of user dhaval blogs
    async getblog(blogid, userid) {
        let tempuser = await this.model.findOne({ "userid": userid })
        if (tempuser) {
            try {
                console.log(blogid)
                let blogdata = await this.model.findById(blogid)
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

    //get all blogs
    async getAllblog(userid) {
        try {
            let blogdata = await this.model.find({ userid: userid })
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
    //get all blogs by cat id
    async getblogbycatid(user, category) {
        try {
            let blogs = await this.model.find({ userid: user, categoryid: category })
            return {
                error: false,
                statusCode: 202,
                totalblog: blogs.length,
                data: blogs,
            };
        } catch (error) {
         
            console.log(error)
            return {
                error: true,
                statusCode: 404,
                msg : "category not found",
                data: error,
            };
        }
    }
}

export default BlogService;
