const mongoose = require('mongoose');
const mongooseString = process.env.MONGODB;

mongoose.connect(mongooseString, {
    //options
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => {
    console.log('Connect mongo atlas successfully!');
})
.catch(err => {
    console.error('Connect mongo atlas failed');
    console.error(err.message)
})