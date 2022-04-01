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
            // console.log( new Date().set("ISO_Date", moment()))
            var IEData = new this.model({
                title: data.title,
                price: data.price,
                date: data.date,
                type: category.data.Categoryname,
                categoryid: data.categoryid,
                userid: userid
            });
            // console.log(data.date)
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
            start.setUTCHours(0, 0, 0)

            const end = new Date()
            end.setMonth(month - 1, days);
            end.setUTCHours(0, 0, 0)
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
            let abc = [];
            for (let i = 1; i < days + 1; i++) {
                let test = new Date();
                test.setMonth(month - 1, i);
                // console.log(test);
                let obj = {
                    _id: test.toLocaleDateString("fr-CA"),
                    price: 0,
                    status: "---"
                }
                abc.push(obj);
            }



            var arrDays = [];
            var arrPrice = [];
            for (let price of data) {
                arrDays.push(price._id);
                arrPrice.push(price.price);
            }
            //console.log(arrDays);
            //console.log(arrPrice);
            let arr = [];
            if (month < 10) {
                month = `0${month}`
            }
            var dayWiseData = [];
            for (let i = 0; i < days; i++) {
                var day = i + 1;
                if (day < 10) {
                    day = `0${day}`
                }
                var strDate = `2022-${month}-${day}`;

                if (arrDays.indexOf(strDate) > -1) {
                    var index = arrDays.indexOf(strDate);
                    var dayPrice = arrPrice[index]
                    abc[index].price= dayPrice
                    console.log(dayPrice)
                } else {
                    // dayWiseData.push(0);
                    abc[index].price= 0
                    // console.log(abc[index].price = 0)
                }

                // if (arrDays.indexOf(strDate) > -1) {
                //     var index = arrDays.indexOf(strDate);
                //     var dayPrice = arrPrice[index]
                //     dayWiseData.push(dayPrice);
                // } else {
                //     dayWiseData.push(0);
                // }

                // data.push(obj)


                // console.log(obj)
                // }
            }
            // console.log(abc)

            // console.log(dayWiseData[0]);

        
            // console.log(obj._id)
            // for (let n = 0; n < days; n++) {
            //     // console.log(data[n]._id)
            //     if (data[n]._id !== obj._id) {
            //         // data.push(arr[j])
            //         console.log('first')
            //     }
            // }
            // console.log(arr)  
            // console.log(arr)
            // for (let j = 0; j < arr.length; j++) {
            //     for (let n = 0; n < data.length; n++) {
            //         // console.log(data[n]._id, arr[j]._id)
            //         console.log(data[j])
            //         // if (!data[n]._id == arr[j]._id) {
            //         // data.push(arr[j])
            //         arr.replace(data[j])
            //         console.log('first')
            //         // }
            //     }
            // }
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





    async searchDate(userid, m, d) {
        try{
            // if(m<=12 || m>=1 || d>=31 || d<=1){
            //     return {
            //         error: true,
            //         statusCode: 500,
            //         message: 'invalid date',
              
            //     };

            // }
            const start = new Date();
            start.setMonth(m - 1, d);
            start.setUTCHours(0, 0, 0, 0)
    
            const Expense = await this.model.find({
                categoryid: '62454dcb07d4b0573bc6d53f',
                userid,date: start 
            });
            // catid table :- income id enter
            const Income = await this.model.find({
                categoryid: '62454a54b1a6bad90db0eed5',
                userid,date: start 
            });

            let income = 0;
            let expence = 0;
            for (var i = 0; i < Expense.length; i++) {
                income += Expense[i].price;
            }
            for (var i = 0; i < Income.length; i++) {
                expence += Income[i].price;
            }


            const data = await this.model.find({ date: start });
            // let total = 0;
            // for (let i = 0; i < data.length; i++) {
            //     total += data[i].price;
            // }
            
            return {
                error: false,
                statusCode: 202,
                TotalIncome: income,
                TotalExpense: expence,
                Difference: expence - income,
                TotalIncomeExpensePerDay: data,

            };
        } catch (err) {
            // console.log(err)
            return {
                error: true,
                statusCode: 500,
                message: 'Not User Found',
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

            let num = 0;
            for (var i = 0; i < IEDatas.length; i++) {
                num += IEDatas[i].price;
            }

            return {
                error: false,
                statusCode: 202,
                totalIEData: IEDatas.length,
                totalprice: num,
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
