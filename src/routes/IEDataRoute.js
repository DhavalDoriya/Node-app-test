import Controller from '../controllers/IEDataController';
import auth from '../middleware/auth.middleware'

export default (router) => {
   
    router.post(`/api/IEData`, auth,Controller.insertIEData);

    router.get(`/api/IEData`,auth, Controller.getAllIEData);

    router.get(`/api/IEData/:month`,auth, Controller.montlydata);


    router.get(`/api/IEData/year/:year`,auth, Controller.fliteryear);
    router.get(`/api/date/:m/:d`, auth, Controller.searchDate);
    router.get(`/api/IEData/category/:id`,auth, Controller.getIEDatabycatid);
    router.get(`/api/IEData/:id`,auth, Controller.getIEData);
    router.put(`/api/IEData/:id`, auth,Controller.updateIEData);
    router.delete(`/api/IEData/:id`,auth, Controller.deleteIEData);
};
