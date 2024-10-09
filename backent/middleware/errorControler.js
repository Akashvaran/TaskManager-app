export const errorControler=(req,res)=>{
    res.status(404).json({
        message:`${req.baseUrl} this url currently nor avlible`
    })
}