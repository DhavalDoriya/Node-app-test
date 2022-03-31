import Service from './Service';
import dotenv from "dotenv";
import moment from 'moment';



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

            console.log(data.date)

            // console.log( new Date().set("ISO_Date", moment()))
            var IEData = new this.model({
                title: data.title,
                price: data.price,
                date: data.date,
                type: category.data.Categoryname,
                categoryid: data.categoryid,
                userid: userid
            });
            console.log(data.date)
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

            let month = date;
            let days = new Date(2022, month, 0).getDate()
            const start = new Date()
            start.setMonth(month - 1, 1);
            start.setUTCHours(0,0,0)

            const end = new Date()
            end.setMonth(month - 1, days);
            end.setUTCHours(0,0,0)


            // console.log(start);
            // console.log(end);
            const data = await this.model.aggregate([
                { $match: { date: { $gte: start, $lt: end } } },
                {
                    $group: {
                        _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                        title: { $first: '$title' },
                        price: { $first: '$price' },
                        type: { $first: '$type' },
                    },
                },
            ]);


            let arr = [];
            for (let i = 1; i < days + 1; i++) {
                let test = new Date();
                test.setMonth(month - 1, i);
                // console.log(test);
                let obj = {
                    _id: test.toLocaleDateString("fr-CA"),
                    price: 0,
                    status: "---"
                }
                // console.log(obj)
                arr.push(obj);
                // console.log(Array)

                
            }
            // console.log(arr)



            for (let j = 0; j < arr.length; j++) {
                // const element = arr[j]._id;

                // if (!data._id == arr[j]._id) {
                //     data.push(arr[j])
                //     console.log('first')
                // } else {
                    
                // }
                // console.log(element);
                
            }
            // console.log(data);



            return {
                error: false,
                statusCode: 200,
                message: 'Data of month ' + month,
                data: data,
            };
            // const start1 = new Date()
        }
        catch (err) {
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
