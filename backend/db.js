const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;
const connectTomongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('connected to mongo')
        const fetched_data = mongoose.connection.db.collection("Products");
        const data = await fetched_data.find({}).toArray();
        global.shop_items = data;
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectTomongo;