const mongoose = require('mongoose');





mongoose.connect(
  `mongodb://nodeauth:nodeauth@localhost:27017/nodeauth?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

mongoose.connection.on('error', () => console.error('connection error:'))
mongoose.connection.once('open', () => console.log('database connected'))



module.exports =  mongoose;

