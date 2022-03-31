
import express from 'express';
import userRoute from './UserRoute';
import categoryRoute from './CategoryRoute';
import IEDataRoute from './IEDataRoute';


const router = express.Router();


userRoute(router);
categoryRoute(router)
IEDataRoute(router)


export default router;
