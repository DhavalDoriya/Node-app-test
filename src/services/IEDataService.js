import Service from './Service';
import dotenv from "dotenv";
dotenv.config();


class IEDataService extends Service {
    constructor(model) {
        super(model);
        this.insertIEData = this.insertIEData.bind(this);
        this.updateIEData = this.updateIEData.bind(this);
        this.deleteIEData = this.deleteIEData.bind(this);
        this.getIEData = this.getIEData.bind(this);
        this.getAllIEData = this.getAllIEData.bind(this);
        this.fliter = this.fliter.bind(this);



    }

    //insert IEData by id and userid(jwt)
    async insertIEData(data, userid, category) {
        try {
            var IEData = new this.model({
                title: data.title,
                price: data.price,
                type: category.data.Categoryname,
                categoryid: data.categoryid,
                userid: userid
            });
            data = await IEData.save()
            return {
                error: false,
                statusCode: 202,
                data: data,
            };
        } catch (error) {
            console.log(error)
            return {
                error: true,
                statusCode: 500,
                message: 'category not found',
            };
        }
    }

    async fliter(date) {
        try {
            // let IEDatadata = await this.model.find({ })
            let IEDatadata = this.model.aggregate([
                $group:{
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    totalUnitsSold: {
                        $sum: "$price"
                    }
                }
            ])
            return {
                error: false,
                statusCode: 202,
                // totalIEData: IEDatadata.length,
                data: IEDatadata,
            };
        } catch (err) {
            console.log(err)
            return {
                error: true,
                statusCode: 500,
                message: 'Not able to get IEData',
                errors: err,
            };
        }
    }













    //update IEData by id and userid(jwt)
    async updateIEData(IEDataid, data, userid) {
        try {
            let tempuser = await this.model.findOne({ "userid": userid })
            if (tempuser) {
                const updatedIEData = await this.model.updateOne({ _id: IEDataid }, data);
                return {
                    error: false,
                    deleted: true,
                    statusCode: 200,
                    message: 'IEData update successfullly!',
                    data: updatedIEData
                };
            } else {
                return {
                    error: true,
                    statusCode: 404,
                    message: 'IEData not found',
                };
            }
        } catch (err) {
            console.log(err)
            return {
                error: true,
                statusCode: 500,
                message: 'IEData not found',
                errors: err,
            };
        }
    }

    //delete IEData by id and userid(jwt)
    async deleteIEData(IEDataid, userid) {
        try {
            let tempuser = await this.model.find({ "userid": userid })
            let IEData = await this.model.findByIdAndDelete(IEDataid)
            if (IEData) {
                return {
                    error: false,
                    deleted: true,
                    statusCode: 200,
                    message: 'IEData delete successfullly!',
                    data: IEData
                };
            } else {
                return {
                    error: true,
                    statusCode: 404,
                    message: 'IEData not found',
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

    //get all IEData of user dhaval IEDatas
    async getIEData(IEDataid, userid) {
        let tempuser = await this.model.findOne({ "userid": userid })
        if (tempuser) {
            try {
                console.log(IEDataid)
                let IEDatadata = await this.model.findById(IEDataid)
                return {
                    error: false,
                    statusCode: 202,
                    data: IEDatadata,
                };
            } catch (err) {
                console.log(err)
                return {
                    error: true,
                    statusCode: 500,
                    message: 'Not able to get IEData',
                    errors: err,
                };
            }
        } else {
            return {
                error: true,
                statusCode: 500,
                message: 'Not able to get IEData'
            }
        }
    }

    //get all IEDatas
    async getAllIEData(userid) {
        try {
            let IEDatadata = await this.model.find({ userid: userid })
            return {
                error: false,
                statusCode: 202,
                // totalIEData: IEDatadata.length,
                data: IEDatadata,
            };
        } catch (err) {
            console.log(err)
            return {
                error: true,
                statusCode: 500,
                message: 'Not able to get IEData',
                errors: err,
            };
        }
    }

    //get all IEDatas by cat id
    async getIEDatabycatid(user, category) {
        try {
            let IEDatas = await this.model.find({ userid: user, categoryid: category })
            return {
                error: false,
                statusCode: 202,
                totalIEData: IEDatas.length,
                data: IEDatas,
            };
        } catch (error) {
            console.log(error)
            return {
                error: true,
                statusCode: 404,
                msg: "category not found",
                data: error,
            };
        }
    }
}

export default IEDataService;
