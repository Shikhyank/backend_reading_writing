let fs=require('fs')
function httmethod(req,res){
   let url=req.url;

    if(url=='/'){
        return fs.readFile('message.txt',{encoding:'utf-8'},(err,data)=>{
            if(err){
                data='no chat exist'
            }
            res.write(`<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
            </head>
            <body>
            ${data}
              <form action="/abc" method="POST">
                <input type="text" name="message">
                <button type="submit">send message</button>
              </form>
            </body>
            </html>`)
        })
    }

    if(url=='/abc'){
        let body=[];
        req.on('data',(chunks)=>{
            body.push(chunks)
        });
        return req.on('end',()=>{
            let data=Buffer.concat(body).toString().split('=')[1]

            return fs.writeFile('message.txt',data+" ",(err)=>{
                res.statusCode=302;
                res.setHeader('location','/');
                res.end();
            })
        })
    }
}

    module.exports=httmethod;