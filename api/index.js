//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
// const {GlobalDiscount} = require('./src/db.js');


// Syncing all the models at once.

conn.sync({ force: false }).then(() => {
  // GlobalDiscount
  // .findAll()
  // .then((e)=>{
  //   e.length>0 && e.forEach((e,i) => {
  //     var fecha = new Date(e.createdAt);
  //     var dias = e.days; // Número de días a agregar
  //     fecha.setDate(fecha.getDate() + dias); //vale la fecha de vencimiento
  //     if(i===0){
  //       e.isCaduced = true;
  //       e.save()
  //     }
  //    if(new Date() > fecha){
  //       e.isCaduced = true;
  //       e.save()
  //    }
  //   });
  // })
  server.listen(process.env.PORT, () => {
    console.log(`%s listening at ${process.env.PORT}`); // eslint-disable-line no-console
  });
});
