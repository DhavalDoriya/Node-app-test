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
        this.montlydata = this.montlydata.bind(this);

        this.fliteryear = this.fliteryear.bind(this);


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

    async fliteryear(date) {
        try {
            let year = date;
            let final = [];
            for (let i = 1; i <= 12; i++) {
                let days = new Date(year, i, 0).getDate()
                const start = new Date()
                start.setMonth(i - 1, 1);
                start.setUTCHours(0, 0, 0)
                start.setUTCFullYear(year)

                const end = new Date()
                end.setMonth(i - 1, days);
                end.setUTCHours(0, 0, 0)
                end.setUTCFullYear(year)

                const data = await this.model.aggregate([
                    { $match: { date: { $gte: start, $lt: end } } },
                    {
                        $group: {
                            _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
                            TransactionTotal: { $sum: 1 },
                        },
                    },
                ]);
                final.push(...data);
            }
            // console.log(final)
            //test code
            var arrDays = [];
            var arrPrice = [];
            for (let price of final) {
                arrDays.push(price._id);
                arrPrice.push(price.TransactionTotal);
            }
            // console.log(arrDays);
            // console.log(arrPrice);
            let arr = [];
            var dayWiseData = [];
            for (let i = 0; i < 12; i++) {
                var month = i + 1;
                if (month < 10) {
                    month = `0${month}`
                }
                var strDate = `${year}-${month}`
                // console.log(String(strDate))
                // console.log(arrDays.indexOf(strDate));
                if (arrDays.indexOf(strDate) > -1) {
                    var index = arrDays.indexOf(strDate);
                    var dayPrice = arrPrice[index]
                    dayWiseData.push(dayPrice);
                } else {
                    dayWiseData.push(0);
                }
            }
            // fulaji
            // console.log(dayWiseData);
            //generate blank data
            let empty = [];
            for (let i = 1; i <= 12; i++) {
                // let days = new Date(year, i, 0).getDate()
                const start = new Date()
                start.setMonth(i - 1, 1);
                start.setUTCHours(0, 0, 0)
                start.setUTCFullYear(year)
                if (i < 10) {
                    i = `0${i}`
                }
                let date = `${start.getFullYear()}-${i} `
                let obj = {
                    _id: date,
                    TransactionTotal: dayWiseData[i - 1],
                }
                empty.push(obj);
            }
            // console.log(empty)
            //return
            return {
                error: false,
                statusCode: 200,
                msg: `Data Not Found Of year ${year}`,
                empty
            };
        }


        catch (error) {
            console.log(error)
            return {
                error: true,
                statusCode: 500,
                message: 'Not able to get IEData',
            };
        }
    }



    async montlydata(date) {
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
                        // title: { $first: '$title' },
                        price: { $first: '$price' },
                        // type: { $first: '$type' },
                        total: { $sum: 1 }
                    },
                },
            ]);
            // console.log(data)
            //fulajii code
            var arrDays = [];
            var arrPrice = [];
            var arrTotal = [];

            for (let price of data) {
                arrDays.push(price._id);
                arrPrice.push(price.price);
                arrTotal.push(price.total);
              
            }
            // console.log(arrDays);
            // console.log(arrPrice);
            ///cc
            var dayWiseData = [];
            var dayTotalData = [];
            if (month < 10) {
                month = `0${month}`
            }
            for (let i = 0; i < days; i++) {
                var day = i + 1;
                if (day < 10) {
                    day = `0${day}`
                }
                var strDate = `2022-${month}-${day}`
                // console.log(String(strDate))
                // console.log(arrDays.indexOf(strDate));
                if (arrDays.indexOf(strDate) > -1) {
                    var index = arrDays.indexOf(strDate);
                    var dayPrice = arrPrice[index]
                    var dayTotal = arrTotal[index]
                    dayWiseData.push(dayPrice);
                    dayTotalData.push(dayTotal);
                } else {
                    dayTotalData.push(0)
                    dayWiseData.push(0);
                }
            }
            // console.log(dayWiseData);
            // console.log(dayTotalData)

            //generate empty data
            let finaldata = [];
            if (month < 10) {
                month = `0${month}`
            }
            for (let i = 0; i < days; i++) {
                var day = i + 1;
                if (day < 10) {
                    day = `0${day}`
                }
                var strDate = `2022-${month}-${day}`
                // console.log(String(strDate))
                let obj = {
                    _id: strDate,
                    TotalAmout: dayWiseData[i],
                    TotalTranctions: dayTotalData[i]
                }
                finaldata.push(obj);
            }
            // console.log(finaldata)
            return {
                error: false,
                statusCode: 200,
                finaldata,
            };

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
        try {
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
                userid, date: start
            });
            // catid table :- income id enter
            const Income = await this.model.find({
                categoryid: '62454a54b1a6bad90db0eed5',
                userid, date: start
            });
            let expence = 0;
            let income = 0;
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
