const http = require('http')
const server = http.createServer(onRequest)
const port = 3000
const fs = require('fs')
const qs = require('querystring')

server.listen(port, ()=>{
    console.log('Mi servidor esta corriendo en localhost: 3000')
})

function onRequest(req, res){
    console.log('se ha detectado una nueva peticion')
    if(req.url == '/'){
        fs.readFile('index.html', (err,content)=>{
            if(err){
                if(err.code == 'ENOENT'){
                    res.setStatus = 404
                    console.log('No se encontro el archivo')
                }else{
                    res.setStatus = 500
                    console.log('Ha ocurrido un error en el servidor')
                }
            }else {
                res.setStatus = 202
                res.setHeader('Content-type','text/html')
                res.write(content)
                res.end()
            }
        })
    }else if(req.url == '/users'){
        if(req.method == 'GET'){
            res.setStatus = 202
            res.setHeader('Content-type','text/html')
            res.write('Accediendo a usuarios')
            res.end()
        }else if (req.method == 'POST'){
            var datos = ''
            req.on('data', (d) => {
                datos += d
            })
            req.on('end', ()=>{
                var post = qs.parse(datos)
                res.end('Datos recibidos: ' + post.numero)
            })
        }else if (req.method == 'PUT'){
            var datos = ''
            req.on('data', (d) => {
                datos += d
            })
            req.on('end', ()=>{
                var post = qs.parse(datos)
                res.end('Datos recibidos: ' + post.numero)
            })                  
        }else if (req.method == 'DELETE'){
            var datos = ''
            req.on('data', (d) => {
                datos += d
            })
            req.on('end', ()=>{
                var post = qs.parse(datos)
                res.end('Datos recibidos: ' + post.numero)
            })  
        }         
    }
}