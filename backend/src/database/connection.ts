import {Sequelize} from "sequelize-typescript"
const sequelize = new Sequelize ({
  database:process.env.DB_NAME,
  dialect:'mysql',
  username:process.env.DB_USERNAME,
  password:process.env.DB_PASSWORD,
  host:process.env.DB_HOST,
  port:Number(process.env.DB_PORT),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, // Max time in ms a connection can be idle before error
    idle: 10000,   // Max time in ms a connection can be inactive before release
  },
  models:[__dirname +"/models"] 

})
sequelize
.authenticate()
.then(()=>{
  console.log("connected")
})
.catch ((err)=>{
  console.log(err)
}
)
sequelize.sync({force:false}).then(()=>{
  console.log("synced !!!")
})

export default sequelize