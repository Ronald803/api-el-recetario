exports.success = function (req,res,message,body,status){
    res.status(status||200).send({
        message,
        body
    })
}

exports.error = function (req,res,status,details){
    res.status(status||500).send({
        message: 'Algo salió mal',
        body: {
            details
        }
    })
}