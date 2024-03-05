const fs = require('fs');

function handlevent(req, res){
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="message" method="POST"><input type="text" name="message"><button type="Submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    
    }

    else if(url==='/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk)=>{
            console.log(chunk);
            body.push(chunk);
        })
        req.on('end', ()=>{
            const parsedbody = Buffer.concat(body).toString();
            console.log(parsedbody);
            const message = parsedbody.split('=')[1];
            fs.writeFile('message.txt', message, (err)=>{
                if(err){
                    
                    console.log(err);
                }
                res.statusCode = 302;
                   res.setHeader('Location', '/');
                    return res.end();
                
            });
           
        })   
        
        }

       else{

        res.setHeader ('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><head>');
        res.write('<body><h1> Welcome to my Node Js project </h1></body>');
        res.write('</html>');
        res.end();
        
       } 
}


//module.exports = handlevent;


/*module.exports = {
    handler: handlevent,
    SomeText: 'Some hard coded text'
};*/

module.exports.handler = handlevent;
module.exports.SomeText = 'Some hard coded text';