 let express=require("express");
let app=express();
app.use(express.json());
app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Orihgin, X-Requested-With, Content-Type, Accept"

    );
    next();
});
var port =process.env.PORT ||2410;
app.listen(port,()=>console.log(`Listening on port ${port}!`));

let { customerData }=require("./customerData.js");
  let fs=require("fs");
  let fname="customers.json";


  app.get("/resetData",function(req,res){
    let data=JSON.stringify(customerData)
    fs.writeFile(fname,data,function(err){
        if(err) res.status(404).send(err)
        else res.send("Data in file is reset");
    });
  });

  app.get("/customers",function(req,res){
    fs.readFile(fname,"utf8",function(err,data){
        if(err) res.status(404).send(err);
        else{
            let customersArray=JSON.parse(data);
            res.send(customersArray);
        }
    })
  })
    app.get("/customers/:id",function(req,res){
    let id=req.params.id;
    fs.readFile(fname,"utf8",function(err,data){
        if(err) res.status(404).send(err);
        else{

            let customersArray=JSON.parse(data);
            let customer=customersArray.find((st)=>st.id==id);
            if (customer) res.send(customer);
            else res.status(404).send("No customer found");

        }
    })
  })
  
  app.post("/customers",function(req,res){
    let body=req.body;
    fs.readFile(fname,"utf8",function(err,data){
        if(err) res.status(404).send(err);
        else{
            let customersArray=JSON.parse(data);
           
            let newcustome={...body};
            customersArray.push(newcustome);
            let data1=JSON.stringify(customersArray);
            fs.writeFile(fname,data1,function(err){
                if(err) res.status(404).send(err);
                else res.send(newcustome);
            })
        }
    })
  })


  app.put("/customers/:id",function(req,res){
    let body=req.body;
    let id=req.params.id;
    fs.readFile(fname,"utf8",function(err,data){
        if(err) res.status(404).send(err);
        else{
            let customersArray=JSON.parse(data);
            let index=customersArray.findIndex((st)=>st.id==id);
            if(index>=0){
                let updateCutomer={...customersArray[index],...body};
                customersArray[index]=updateCutomer;
                let data1=JSON.stringify(customersArray);
                fs.writeFile(fname,data1,function(err){
                    if(err) res.status(404).send(err);
                    else res.send(updateCutomer);
                })
            }
            else res.status(404).send("No Customer found");
        }
    })
  })
   

  app.delete("/customers/:id",function(req,res){
   
    let id=req.params.id;
    fs.readFile(fname,"utf8",function(err,data){
        if(err) res.status(404).send(err);
        else{
            let customersArray=JSON.parse(data);
            let index=customersArray.findIndex((st)=>st.id==id);
            if(index>=0){
              let deletedCustomer=customersArray.splice(index,1);
                let data1=JSON.stringify(customersArray);
                fs.writeFile(fname,data1,function(err){
                    if(err) res.status(404).send(err);
                    else res.send(deletedCustomer);
                })
            }
            else res.status(404).send("No customer found");
        }
    })
  })
   
 
