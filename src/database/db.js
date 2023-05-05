const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const connectDatabase = () => {
  console.log('Conectando ao mongo');

  mongoose.connect(process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('Conexão efetuada'))
    .catch(error => console.log(error))
}
module.exports = connectDatabase