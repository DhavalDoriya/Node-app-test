import Service from './Service';
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

    //insert category by id and jwt token 
    async insertcategory(Categoryname, userid) {
        try {
            var data = new this.model({
                Categoryname: Categoryname,
                userid: userid
            });
            await data.save()
            return {
                error: false,
                statusCode: 202,
                data: data,
            };
        } catch (err) {
            return {
                error: true,
                statusCode: 500,
                message: 'Not able to create item',
                errors: err,
            };
        }
    }
    //get category by id and jwt token 
    async getcategory(userid) {
        try {
            let userdata = await this.model.find({ userid: userid })
            return {
                error: false,
                statusCode: 202,
                totaldata: userdata.length,
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

    //update category by id and jwt token 
    async updatecategory(categoryname, catid, userid) {
        try {
            let tempuser = await this.model.find({ userid: userid })
            if (tempuser) {
                const updatedCategory = await this.model.updateOne({ _id: catid }, { Categoryname: categoryname });
                // const updatedCategory = await this.model.findByIdAndUpdate(catid, {$set: categoryname }, { new: true });
                    return {
                        error: false,
                        deleted: true,
                        statusCode: 200,
                        data: updatedCategory
                    };
            } else {
                return {
                    error: true,
                    statusCode: 404,
                    message: 'category not found',
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

    //delete category by id and jwt token 
    async deletecategory(id, userid) {
        try {
            let tempuser = await this.model.find({ userid: userid })
            if (tempuser) {
                let catid = await this.model.findByIdAndDelete(id)
                if (catid) {
                    return {
                        error: false,
                        deleted: true,
                        statusCode: 200,
                        message: 'record delete successfullly!',
                        data: catid
                    };
                } else {
                    return {
                        error: true,
                        statusCode: 404,
                        message: 'user dont have any category ',
                    };

                }

            } else {
                return {
                    error: true,
                    statusCode: 404,
                    message: 'user dont have any category ',
                };
            }
        } catch (err) {
            return {
                error: true,
                statusCode: 500,
                message: 'category not found',
                errors: err,
            };
        }
    }
}

export default CategoryService;
