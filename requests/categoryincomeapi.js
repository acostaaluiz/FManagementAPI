router.get('checkcategoryincome/:id?',function(req,res,next){
 
    CategoryController.checkCategoryIncome(req.params.id, function(err, rows){

        if(!err){

            var numRows = rows.length;
            var categoryObj;
            var category;
            var response;

            if(numRows > 0){

                category = rows[0].category;
                response = "INVALID_CATEGORY";

                categoryObj = {

                    category: category,
                    response: response
                };

                res.json(categoryObj);


            } else {

                categoryObj = {

                    category: req.params.id,
                    response: "OK"
                };

                res.json(categoryObj);
            }
        }
    });
});