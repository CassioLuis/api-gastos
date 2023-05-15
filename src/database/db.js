import mongoose from 'mongoose'


const connectDatabase = () => {
  console.log('Conecting on database...');

  mongoose.connect(process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('Connect successfully!'))
    .catch(error => console.log(error))
}

export default connectDatabase