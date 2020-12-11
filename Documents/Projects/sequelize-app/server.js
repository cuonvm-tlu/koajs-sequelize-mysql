const koa = require('koa');
const app = new koa();
const db = require('./models');
const koaBody = require('koa-body');
var fs = require('fs');
const path = require("path");

app.use(koaBody());


const apiRoutes = require("./routes/apiRoutes.js");
const { join } = require('path');
app.use(apiRoutes.routes())
app.use(apiRoutes.allowedMethods());


app.use(function(ctx, next) {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var arr = []; 
    var info = {
        "hour": time,
        "method": ctx.request.method,
        "agent": ctx.request.header['user-agent'],
    }; 
    arr.push(info);
    var dictstring = JSON.stringify(arr);
    var folderName = date; 
    var fildeName = date + '.txt';

    // fs.readFile("./recordedReq/" + folderName + "/" + fildeName,  function (err, data) {
    //     if (err){
    //         fs.mkdirSync("./recordedReq/" + folderName,  function(err) {
    //             if (err) {
    //               console.log(err)
    //             } else {
    //                 fs.writeFile("./recordedReq" + folderName + "/" + date, dictstring, (err, rs) =>{
    //                     if (err){
    //                         console.log(err);
    //                     }
    //                 });
    //             }
    //           })

    //     }
    //     else{
    //         var obj = JSON.parse(data); //now it an object
    //         obj.push(info);
    //         json = JSON.stringify(obj); //convert it back to json
    //         fs.writeFile("./recordedReq/" +date+  ".txt", json, (err, rs) =>{
    //             if (err){
    //                 console.log(err);
    //             }
    //         });
    //     }

    // })

    if (!fs.existsSync(path.join("./recordedReq", folderName))) {
        fs.mkdirSync(path.join("./recordedReq", folderName))
        fs.writeFile("./recordedReq/" + folderName + "/" + fildeName, dictstring, (err, rs) =>{
            if (err){
                console.log(err);
            }
        });
        }
    else {
        fs.readFile("./recordedReq/" + folderName + "/" + fildeName,  function (err, data) {
            if (err){
                    console.log(err);
            }
            else{
                var obj = JSON.parse(data); //now it an object
                obj.push(info);
                json = JSON.stringify(obj); //convert it back to json
                fs.writeFile("./recordedReq/" + folderName + "/" + fildeName, json, (err, rs) =>{
                    if (err){
                        console.log(err);
                    }
                });
            }

        })
    }

    next();
});

db.sequelize.sync().then(() => {
    app.listen(3000, ()=> {
        console.log(`Listening on Port 3000....`);
    });
});
