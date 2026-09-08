const mongoose=require('mongoose');
async function connectToMongoDb(db){
    return mongoose.connect(db);
}

module.exports={
    connectToMongoDb,
}