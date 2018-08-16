router.get('checkcategory/:id?',function(req,res,next){
 
    CategoryController.checkCategory(req.params.id, function(err,rows){
        
        if(err)
            res.json(err);
        else
            res.json(rows);
    });
});