const Router = require('koa-router');
const db = require("../models");

// // const koaBody = require('koa-body')({multipart: true, uploadDir: '.'})
// const fs = require('fs');
// const multer = require('@koa/multer');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//       cb(null, './uploads/');
//     },
//     filename: function(req, file, cb) {
//       cb(null, new Date().toISOString() + file.originalname);
//     }
//   });
  
//   const fileFilter = (req, file, cb) => {
//     // reject a file
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   };
  
//   const upload = multer({
//     storage: storage,
//     limits: {
//       fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
//   });
  
const router = new Router({
	prefix: '/books'
});

router.get("/", async function(ctx, next) {
    books = await db.books.findAll();
    ctx.body = books;
    next();
})

router.get("/:id", async function(ctx, next) {
    book = await db.books.findAll({
        where: {
            'id': ctx.params.id
        }
    });
    ctx.body = book; 
    next();
})

router.post("/", async function(ctx, next) {
    await db.books.create({
        text: ctx.request.body.text
    }) 
    next(); 
})

router.delete("/del/:id", async function(ctx, next) {
    await db.books.destroy({
        where: {
            'id': ctx.params.id
        }
    });
    next();
})

router.put("/edit", async function(ctx, next) {
    await db.books.update(
        {
            text: ctx.request.body.text
        },      
        {
        where: {
            'id': ctx.request.body.id}
        }
    );
    next();
})



module.exports = router;