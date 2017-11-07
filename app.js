const http = require('http')
const { createCanvas, loadImage } = require('canvas')

http.createServer(function (req, res) {
  const text = decodeURI(req.url).substr(1)
  const size = 80
  const padding = 10

  if (text.length == 0) {
    res.writeHead(400, {'Content-Type': 'text/plain'})
    return res.end('Bad Request')
  }

  res.writeHead(200, {'Content-Type': 'image/png'})
  
  const tmp_canvas = createCanvas()
  const tmp_ctx = tmp_canvas.getContext('2d')
  tmp_ctx.font = size + 'px Impact'
  console.log('width', tmp_ctx.measureText(text).width, 'text', text)
  
  const canvas = createCanvas(tmp_ctx.measureText(text).width + padding * 2, size + padding * 2)
  const ctx = canvas.getContext('2d')
  
  ctx.font = size + 'px Impact'
  ctx.fillText(text, padding, (size + padding * 2) / 2)

  var stream = canvas.pngStream()
  stream.on('data', function(chunk){
    res.write(chunk)
  })
  
  stream.on('end', function(){
    res.end()
  })
}).listen(process.env.PORT || 3000)