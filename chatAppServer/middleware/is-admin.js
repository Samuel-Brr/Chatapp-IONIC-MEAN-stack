module.exports = (req, res, next) => {
    console.log(req.headers)

    if(req.headers.user_id === "626682f4fa8b7172b8fe5eac"){
       return next()
    }

    else res.status(500).send({message: "Accés réfusé, Statut d'administrateur requis"})
}