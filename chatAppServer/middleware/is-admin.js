module.exports = (req, res, next) => {
    console.log(req.headers)

    if(req.headers.user_id === "62c949d02ac74d8160c4ecbb"){
       return next()
    }

    else res.status(500).send({message: "Accés réfusé, Statut d'administrateur requis"})
}