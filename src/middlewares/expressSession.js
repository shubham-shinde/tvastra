const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
import * as config from '../../config';

var store = new MongoDBStore({
    uri: config.DB_URL,
    collection: 'sessions'
});
store.on('error', function (error) {
    console.log(error);
});


const expressSession = session({
    cookie: { path: '/', httpOnly: false, secure: false, maxAge: 1000 * 60 * 60 * 24 },
    secret: config.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store
});

export default expressSession;