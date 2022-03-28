import { ExportCustomJobPage } from 'twilio/lib/rest/bulkexports/v1/export/exportCustomJob';
import Service from './Service';
import bcrypt from 'bcrypt';
import { verify } from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();



class CategoryService extends Service {
    constructor(model) {
        super(model);
        this.insertcategory = this.insertcategory.bind(this);
        this.getcategory = this.getcategory.bind(this);
        this.updatecategory = this.updatecategory.bind(this);
        this.deletecategory = this.deletecategory.bind(this);
    }

    async insertcategory(a) {
        try {
            
            var data = new this.model({
                Categoryname: a.body.Categoryname,
                userid: a.userid
            });
            await data.save()
            // const data = await this.model.create(a.body);;
            return {
                error: false,
                statusCode: 202,
                data: data,
            };
        } catch (err) {
            // console.log('errors ssdsds',err);
            return {
                error: true,
                statusCode: 500,
                message: 'Not able to create item',
                errors: err,
            };
        }
    }
    async getcategory(a) {
        try {
            let userdata = await this.model.find({ "userid": a.userid })
            return {
                error: false,
                statusCode: 202,
                totaldata : userdata.length,
                data: userdata,
            };
        } catch (err) {
            return {
                error: true,
                statusCode: 500,
                message: 'cant find a catogory',
                errors: err,
            };
        }
    }
    async updatecategory(a) {
        try {
          let tempuser = await this.model.findOne({ "userid": a.userID })
          if (tempuser) {
                data = await this.model.findByIdAndUpdate(a.id , {$set:a.body} ,{new:true})
                console.log(data)
                if (data) {
                    return {
                        error: false,
                        deleted: true,
                        statusCode: 200,
                        message: 'record update successfullly!',
                        data : data
                    };
                } else {
                    return {
                        error: true,
                        statusCode: 404,
                        message: 'item not found',
                    };
                }
            } else {
                return {
                    error: true,
                    statusCode: 404,
                    message: 'item not found',
                };
            }

        } catch (err) {
            console.log(err);
            return {
                error: true,
                statusCode: 500,
                message: 'cant find a catogory',
                errors: err,
            };
        }
    }
    async deletecategory(a) {
        try {
            const categortyid = a.id
            let tempuser = await this.model.findOne({ "userid": a.userID })
            if (tempuser) {
                let catid = await this.model.findByIdAndDelete(categortyid)
                if (catid) {
                    return {
                        error: false,
                        deleted: true,
                        statusCode: 200,
                        message: 'record delete successfullly!',
                        tempuser,
                    };
                } else {
                    return {
                        error: true,
                        statusCode: 404,
                        message: 'item not found',
                    };
                }
            } else {
                return {
                    error: true,
                    statusCode: 404,
                    message: 'item not found',
                };
            }
        } catch (err) {
            return {
                error: true,
                statusCode: 500,
                message: 'cant find a catogory',
                errors: err,
            };
        }
    }
}

export default CategoryService;
