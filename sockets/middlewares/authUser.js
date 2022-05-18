

module.exports = function authUserSocketMiddleware(socket,next){
   console.log(socket);
   next()
}