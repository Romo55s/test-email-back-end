const {} = require('express');
const nodeMailer = require('nodemailer');


// Funcion para mandar el correo 
const sendEmail = (req=request,resp=response) =>{
    let body = req.body;

    // Protocolo por el cual se va mandar el correo y la cuenta la cual va mandar el correo
    let config = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        post: 587,
        auth:{
            user: 'test9072686@gmail.com',
            pass: 'alratqniiglkgwdo'
        }
    });

    // Contenido del correo
    const options = {
        from: 'Bisne',
        subject: body.about,
        to: body.email,
        text: body.mssg
    };

    config.sendMail(options,function(error,result){
        if (error) return resp.json({ok: false, msg: error});
        return resp.json({
            ok:true,
            msg:result
        })
    });
}

module.exports = {
    sendEmail
}