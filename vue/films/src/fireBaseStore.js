import firebaseService from 'firebase';
import config from './config';

firebaseService.initializeApp(config.fireBase);

const fireBaseStore = firebaseService.firestore();

export {firebaseService};
export default fireBaseStore;