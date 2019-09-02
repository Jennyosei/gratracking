

            var Login =require('../models/login'),
                dateFormat = require('dateformat'),
                requestify=require('requestify'),
                csv = require("fast-csv"),
                Token=require('../models/token'),
                express=require('express');
                md5 = require('md5');

            


                var router=express.Router();
                /* Testing Ms sql */



                //databaseconnection
                var mysql = require('mysql'); 
               

                var db_config ={ 
                host : '160.153.129.31', 
                password : 'Innova@2017', 
                // database : 'cragdb', 
                database:'eulom',
                user : 'cocoahub', 
                pool : { maxConnections: 50, maxIdleTime: 30}, 
                }; 




                var connection; 

                function handleDisconnect() { 
                connection = mysql.createConnection(db_config); // Recreate the connection, since 
                // the old one cannot be reused. 

                connection.connect(function(err) { // The server is either down 
                  if(err) { // or restarting (takes a while sometimes). 
                          //console.log('error when connecting to db:', err); 
                              setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect, 
                       } // to avoid a hot loop, and to allow our node script to 
                      
                 }); // process asynchronous requests in the meantime. 
                         
                          // If you're also serving http, display a 503 error. 
                 connection.on('error', function(err) { 
                              //console.log('db error', err); 
                              if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually 
                              handleDisconnect(); // lost due to either server restart, or a 
                              } else { // connnection idle timeout (the wait_timeout 
                              throw err; // server variable configures this) 
                              } 
                  }); 
                } 

                handleDisconnect(); 

                //configure routes 


             




          router.route('/add_graorganisation') 
             .post(function(req, res){ 
                       
                   
                        var t=
                          {
                              name:req.body.name,
                              address:req.body.address,
                              telno :req.body.telno,
                              financialyear: req.body.financialyear,
                             
                             
                          };

                      connection.query("INSERT INTO graorganisation SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

             });


              router.route('/get_graorganisation') 
              .get(function(req, res){ 

                           
                            connection.query("SELECT * FROM graorganisation", function(err, rows, fields){
                              if(!err)
                                res.json({message:rows,status:1});
                              else
                                res.send({status:0});
                            })

             });
   

             
             router.route('/get_graorganistion/:id') 
             .get(function(req, res){ 

               var s=req.params.id;
        
         var string="SELECT * FROM graorganisation where id = '"+s+"'  ";
         // console.log(string);

         connection.query(string, function(err, rows, fields){
           if(!err)
             res.json({message:rows,status:1});
           else
             res.send({status:0});
         })

   });



             


            //router.route('/update_employee') 
                         // .post(function(req, res){ 


                           // connection.query("UPDATE jenemployee SET name='"+req.body.name+"',bank='"+req.body.bank+"',mobile='"+req.body.mobile+"',department='"+req.body.department+"' where employeeid='"+req.body.employeeid+"' ", function(err, rows, fields){
                             // if(!err)
                               // res.json({message:rows,status:1});
                             // else
                               // res.send({status:0});
                           // })

            // })





             router.route('/add_graemployee') 
             .post(function(req, res){ 
                       
                   

                   console.log(req.body);

                        var t=
                          {
                             // date: new Date().toJSON().substr(0,  
                              employeename:req.body.employeename,
                              employeeid: req.body.employeeid,
                              department:req.body.department,
                              unit:req.body.unit,
                              rank:req.body.rank,
                              officelocation:req.body.officelocation,
                              mobileno:req.body.mobileno,
                          };

                      connection.query("INSERT INTO graemployee SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                        {
                          console.log(err);
                          res.send({status:0});
                        }
                       })

             });


               router.route('/get_graemployee') 
                    .get(function(req, res){ 

                           
                            connection.query("SELECT * FROM graemployee", function(err, rows, fields){
                              if(!err)
                                res.json({message:rows,status:1});
                              else
                                res.send({status:0});
                            })

                      });



                      router.route('/get_graemployee/:id')
                          .get(function(req, res){ 

                            var s=req.params.id;
                     
                      var string="SELECT * FROM graemployee where employeeid = '"+s+"'  ";
                      // console.log(string);

                      connection.query(string, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

                });
     

          
          router.route('/add_gracourseprovider') 
             .post(function(req, res){ 
                       
                   
                        var t=
                          {
                             // date: new Date(req.body.date).toJSON().substr(0,  10),
                              name: req.body.name,
                              address:req.body.address,
                              location:req.body.location,
                              amount:req.body.amount,
                              // invoiceno:req.body.invoiceno,
                              // nameofcourse:req.body.nameofcourse,
                              // venue:req.body.venue,
                              // amount:req.body.venue,
                              // exchangerate:req.body.exchangerate,
                              // cediequivalent:req.body.cediequivalent,
                              // datepaid:req.body.datepaid,
                              // coursedescription:req.body.coursedescription,
                            
                          };

                      connection.query("INSERT INTO gracourseprovider SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      }) 

             });


             router.route('/get_gracourseprovider') 
             .get(function(req, res){ 

                    
                     connection.query("SELECT * FROM gracourseprovider", function(err, rows, fields){
                       if(!err)
                         res.json({message:rows,status:1});
                       else
                         res.send({status:0});
                     })

               });


             
                      router.route('/get_gracourseprovider/:id') 
                          .get(function(req, res){ 

                            var s=req.params.id;
                     
                      var string="SELECT * FROM gracourseprovider where id = '"+s+"'  ";
                      // console.log(string);

                      connection.query(string, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

                });
     






                     router.route('/add_gravisafees') 
                         .post(function(req, res){ 
                       
                        console.log(req.body);
                        var t=
                          {

                              currency: req.body.currency,
                              exchangerate:req.body.exchangerate,
                              cediequivalent:req.body.cediequivalent,
                              amount:req.body.amount,
                              total:req.body.total,
                              datepaid:req.body.datepaid,
                              //date: new Date().toJSON().substr(0,  10),
                              
                             
                             
                          };


                          // console.log(t);

                      connection.query("INSERT INTO gravisafees SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          {
                            console.log(err);
                          res.send({status:0});

                           }
                        
                      })

             });


              router.route('/get_gravisafees') 
                          .get(function(req, res){ 

                           
                            connection.query("SELECT * FROM gravisafees", function(err, rows, fields){
                              if(!err)
                                res.json({message:rows,status:1});
                              else
                                res.send({status:0});
                            })

             });


             
             router.route('/get_gravisafees/:id') 
             .get(function(req, res){ 

               var s=req.params.id;
        
         var string="SELECT * FROM gravisafees where id = '"+s+"'  ";
         // console.log(string);

         connection.query(string, function(err, rows, fields){
           if(!err)
             res.json({message:rows,status:1});
           else
             res.send({status:0});
         })

   });









                     router.route('/add_graaccimprest') 
                         .post(function(req, res){ 
                       
                         console.log(req.body);
                        var t=
                          {

                              currency: req.body.currency,
                              exchangerate:req.body.exchangerate,
                              cediequivalent:req.body.cediequivalent,
                              amount:req.body.amount,
                              total:req.body.total,
                              datepaid:req.body.datepaid,
                      
                             
                          };
                            connection.query("INSERT INTO graaccimprest SET?",t, function(err, rows, fields){
                              if(!err)
                                res.json({message:rows,status:1});
                            else
                          {
                            console.log(err);
                          res.send({status:0});

                           }
                        
                            })

             });



             router.route('/get_graaccimprest') 
             .get(function(req, res){ 

              
               connection.query("SELECT * FROM graaccimprest", function(err, rows, fields){
                 if(!err)
                   res.json({message:rows,status:1});
                 else
                   res.send({status:0});
               })

});

             
             router.route('/get_graaccimprest/:id') 
             .get(function(req, res){ 

               var s=req.params.id;
        
         var string="SELECT * FROM graaccimprest where id = '"+s+"'  ";
         // console.log(string);

         connection.query(string, function(err, rows, fields){
           if(!err)
             res.json({message:rows,status:1});
           else
             res.send({status:0});
         })

   });












                     router.route('/add_gramedfacility') 
                         .post(function(req, res){ 
                       
                         console.log(req.body);
                        var t=
                          {

                              name: req.body.name,
                              address:req.body.address,
                              invoiceno:req.body.invoiceno,
                              typeofmedcondition:req.body.typeofmedcondition,
                              venue:req.body.venue,
                              amount:req.body.amount,
                              exchangerate:req.body.exchangerate,
                              cediequivalent:req.body.cediequivalent,
                              datepaid:req.body.datepaid,
                              
                             
                             
                          };

                      connection.query("INSERT INTO gramedfacility SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                         else
                          {
                            console.log(err);
                          res.send({status:0});

                           }
                        
                            })

             });


             router.route('/get_gramedfacility') 
                          .get(function(req, res){ 

                           
                            connection.query("SELECT * FROM gramedfacility", function(err, rows, fields){
                              if(!err)
                                res.json({message:rows,status:1});
                              else
                                res.send({status:0});
                            })

             });


             
            router.route('/get_gramedfacility/:id') 
             .get(function(req, res){ 

               var s=req.params.id;
        
             var string="SELECT * FROM gramedfacility where id = '"+s+"'  ";
         // console.log(string);

         connection.query(string, function(err, rows, fields){
           if(!err)
             res.json({message:rows,status:1});
           else
             res.send({status:0});
         })

   });











                  router.route('/add_gratravelagent') 
                         .post(function(req, res){ 
                       
                         console.log(req.body);
                        var t=
                          {

                              name: req.body.name,
                              address:req.body.address,
                              location:req.body.location,
                              mobileno:req.body.mobileno,
                              amount:req.body.amount,
                              // employeeid:req.body.employeeid,
                              // invoiceno:req.body.invoiceno,
                              //
                              // employeename:req.body.employeename,
                              // datepaid:req.body.datepaid,
                             
                             
                          };

                      connection.query("INSERT INTO gratravelagent SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                         else
                          {
                            console.log(err);
                          res.send({status:0});

                           }
                        
                            })

             });


             router.route('/get_gratravelagent') 
                          .get(function(req, res){ 

                           
                            connection.query("SELECT * FROM gratravelagent", function(err, rows, fields){
                              if(!err)
                                res.json({message:rows,status:1});
                              else
                                res.send({status:0});
                            })

             });

             router.route('/get_gratravelagentfees').post(function (req, res) {
                 connection.query("Select * from gratravelagent where name ='" + req.body.travelagent +"'",
                     function (err, rows) {
                         if (!err) {
                             res.json(rows);
                         } else {
                             res.send({status: 0});
                         }
                     })
             });

             router.route('/get_gracourseproviderfees').post(function (req, res) {
                 connection.query("Select * from gracourseprovider where name = '" + req.body.courseprovider + "'",
                 function (err, rows) {
                     if (!err) {
                         res.json(rows);
                     } else {
                         res.send({status: 0});
                     }
                 })
             });

             router.route('/get_gratravelagent/:id') 
             .get(function(req, res){ 

               var s=req.params.id;
        
         var string="SELECT * FROM gratravelagent where id = '"+s+"'  ";
         // console.log(string);

         connection.query(string, function(err, rows, fields){
           if(!err)
             res.json({message:rows,status:1});
           else
             res.send({status:0});
         })

   });












                     router.route('/add_graperdiem') 
                         .post(function(req, res){ 
                       
                   
                        var t=
                          {

                              currency: req.body.currency,
                              amount:req.body.amount,
                              exchangerate:req.body.exchangerate,
                              cediequivalent:req.body.cediequivalent,
                              totalamount:req.body.totalamount,
                              datepaid:req.body.datepaid,
                              employeeid:req.body.employeeid,
                              employeename:req.body.employeename,





                              //date: new Date().toJSON().substr(0,  10),
                              
                              
                             
                          };
                           console.log(t);
                      connection.query("INSERT INTO graperdiem SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                         else
                          {
                            console.log(err);
                          res.send({status:0});

                           }
                        
                            })

             });


             router.route('/get_graperdiem') 
                          .get(function(req, res){ 

                           
                            connection.query("SELECT * FROM graperdiem", function(err, rows, fields){
                              if(!err)
                                res.json({message:rows,status:1});
                              else
                                res.send({status:0});
                            })

             });


             
             router.route('/get_graperdiem/:id') 
             .get(function(req, res){ 

               var s=req.params.id;
        
         var string="SELECT * FROM graperdiem where id = '"+s+"'  ";
         // console.log(string);

         connection.query(string, function(err, rows, fields){
           if(!err)
             res.json({message:rows,status:1});
           else
             res.send({status:0});
         })

   });












                     router.route('/add_grawarmclothing') 
                         .post(function(req, res){ 
                       
                   
                        var t=
                          {

                              employeeid: req.body.employeeid,
                              datelastpaid:req.body.datelastpaid,
                              amountpaid:req.body.amountpaid,
                              currency:req.body.currency,
                              exchangerate:req.body.exchangerate,
                              cediequivalent:req.body.cediequivalent,
                              totalamount:req.body.totalamount,
                              datepaid:req.body.datepaid,
                             
                              
                          };

                      connection.query("INSERT INTO grawarmclothing SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                         else
                          {
                            console.log(err);
                          res.send({status:0});

                           }
                        
                            })

             });
             router.route('/get_grawarmclothing') 
                          .get(function(req, res){ 

                           
                            connection.query("SELECT * FROM grawarmclothing", function(err, rows, fields){
                              if(!err)
                                res.json({message:rows,status:1});
                              else
                                res.send({status:0});
                            })

             });
     


             
             router.route('/get_grawarmclothing/:id') 
             .get(function(req, res){ 

               var s=req.params.id;
        
         var string="SELECT * FROM grawarmclothing where employeeid = '"+s+"'  ";
         // console.log(string);

         connection.query(string, function(err, rows, fields){
           if(!err)
             res.json({message:rows,status:1});
           else
             res.send({status:0});
         })

   });











                     router.route('/add_grareport') 
                         .post(function(req, res){ 
                       
                          console.log(req.body);
                        var t=
                          {

                              // id: req.body.id,
                              employeename:req.body.employeename,
                              courseprovider:req.body.courseprovider,
                              department:req.body.department,
                              unit:req.body.unit,
                              coursefee:req.body.coursefee,
                              perdiem:req.body.perdiem,
                              warmclothing:req.body.warmclothing,
                              travelagent:req.body.travelagent,
                              airticket:req.body.airticket,
                              organisation:req.body.organisation,
                              visafees:req.body.visafees,
                              medicalprovision:req.body.medicalprovision,
                              accountableimprest:req.body.accountableimprest,
                              dashboard:req.body.dashboard,
                             // date: new Date().toJSON().substr(0,  10),
                              
                             
                             
                          };

                      connection.query("INSERT INTO grareport SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                       else
                          {
                            console.log(err);
                          res.send({status:0});

                           }
                        
                            })

             });
             router.route('/get_grareport') 
                          .get(function(req, res){ 

                           
                            connection.query("SELECT * FROM grareport", function(err, rows, fields){
                              if(!err)
                                res.json({message:rows,status:1});
                              else
                                res.send({status:0});
                            })

             });



             
             router.route('/get_grareport/:id') 
             .get(function(req, res){ 

               var s=req.params.id;
        
         var string="SELECT * FROM grareport where id = '"+s+"'  ";
         // console.log(string);

         connection.query(string, function(err, rows, fields){
           if(!err)
             res.json({message:rows,status:1});
           else
             res.send({status:0});
         })

   });


   


 router.route('/add_grarank') 
             .post(function(req, res){ 
                       
                   

                   console.log(req.body);

                        var t=
                          {
                             // date: new Date().toJSON().substr(0,  10),
                              name: req.body.name,

                             
                          };

                      connection.query("INSERT INTO grarank SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                        {
                          console.log(err);
                          res.send({status:0});
                        }
                       })

             });


              router.route('/get_grarank') 
                          .get(function(req, res){ 

                           
                            connection.query("SELECT * FROM grarank", function(err, rows, fields){
                              if(!err)
                                res.json({message:rows,status:1});
                              else
                                res.send({status:0});
                            })

                      });


                      
                      router.route('/get_grarank/:id') 
                          .get(function(req, res){ 

                            var s=req.params.id;
                     
                      var string="SELECT * FROM grarank where id = '"+s+"'  ";
                      // console.log(string);

                      connection.query(string, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

                });
     

          



          router.route('/add_graofficelocation') 
             .post(function(req, res){ 
                       
                   

                   console.log(req.body);

                        var t=
                          {
                             // date: new Date().toJSON().substr(0,  10),
                              name: req.body.name,
                              location:req.body.location,


                             
                          };

                      connection.query("INSERT INTO graofficelocation SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                        {
                          console.log(err);
                          res.send({status:0});
                        }
                       })

             });


              router.route('/get_graofficelocation') 
                          .get(function(req, res){ 

                           
                            connection.query("SELECT * FROM graofficelocation", function(err, rows, fields){
                              if(!err)
                                res.json({message:rows,status:1});
                              else
                                res.send({status:0});
                            })

                      });

                      
                      router.route('/get_graofficelocation/:id') 
                          .get(function(req, res){ 

                            var s=req.params.id;
                     
                      var string="SELECT * FROM graofficelocation where id = '"+s+"'  ";
                      // console.log(string);

                      connection.query(string, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

                });
     




        router.route('/add_graunit') 
             .post(function(req, res){ 
                       
                   

                   console.log(req.body);

                        var t=
                          {
                             // date: new Date().toJSON().substr(0,  10),
                              name: req.body.name,


                             
                          };

                      connection.query("INSERT INTO graunit SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                        {
                          console.log(err);
                          res.send({status:0});
                        }
                       })

             });


              router.route('/get_graunit') 
                          .get(function(req, res){ 

                           
                            connection.query("SELECT * FROM graunit", function(err, rows, fields){
                              if(!err)
                                res.json({message:rows,status:1});
                              else
                                res.send({status:0});
                            })

                      });


                      
                      router.route('/get_graunit/:id') 
                          .get(function(req, res){ 

                            var s=req.params.id;
                     
                      var string="SELECT * FROM graunit where id = '"+s+"'  ";
                      // console.log(string);

                      connection.query(string, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

                });
     

          
                router.route('/add_gracourses') 
                .post(function(req, res){ 
                          
                      
   
                      console.log(req.body);
   
                           var t=
                             {
                                // date: new Date().toJSON().substr(0,  10),
                                 courseid: req.body.courseid,
                                 coursetitle:req.body.coursetitle,
                                 description:req.body.description,
                                 courseproviderid:req.body.courseproviderid,
   
   
                                
                             };
   
                         connection.query("INSERT INTO gracourses SET?",t, function(err, rows, fields){
                           if(!err)
                             res.json({message:rows,status:1});
                           else
                           {
                             console.log(err);
                             res.send({status:0});
                           }
                          })
   
                });
   
   
                 router.route('/get_gracourses') 
                             .get(function(req, res){ 
   
                              
                               connection.query("SELECT * FROM gracourses", function(err, rows, fields){
                                 if(!err)
                                   res.json({message:rows,status:1});
                                 else
                                   res.send({status:0});
                               })
   
                         });
   
   
                         
                         router.route('/get_gracourses/:id') 
                             .get(function(req, res){ 
   
                               var s=req.params.id;
                        
                         var string="SELECT * FROM gracourses where id = '"+s+"'  ";
                         // console.log(string);
   
                         connection.query(string, function(err, rows, fields){
                           if(!err)
                             res.json({message:rows,status:1});
                           else
                             res.send({status:0});
                         })
   
                   });





                   router.route('/add_gradepartments') 
                     .post(function(req, res){ 
                       
                   

                   console.log(req.body);

                        var t=
                          {
                             // date: new Date().toJSON().substr(0,  10),
                              name: req.body.name,


                             
                          };

                      connection.query("INSERT INTO gradepartments SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                        {
                          console.log(err);
                          res.send({status:0});
                        }
                       })

             });


              router.route('/get_gradepartments') 
                          .get(function(req, res){ 

                           
                            connection.query("SELECT * FROM gradepartments", function(err, rows, fields){
                              if(!err)
                                res.json({message:rows,status:1});
                              else
                                res.send({status:0});
                            })

                      });


                      
                      router.route('/get_gradepartments/:id') 
                          .get(function(req, res){ 

                            var s=req.params.id;
                     
                      var string="SELECT * FROM gradepartments where id = '"+s+"'  ";
                      // console.log(string);

                      connection.query(string, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

                });
     

          
          



                router.route('/add_gracountry') 
                .post(function(req, res){ 
                  
              

              console.log(req.body);

                   var t=
                     {
                        // date: new Date().toJSON().substr(0,  10),
                         region:req.body.region,
                         country:req.body.country,


                        
                     };

                 connection.query("INSERT INTO gracountry SET?",t, function(err, rows, fields){
                   if(!err)
                     res.json({message:rows,status:1});
                   else
                   {
                     console.log(err);
                     res.send({status:0});
                   }
                  })

        });


         router.route('/get_gracountry') 
                     .get(function(req, res){ 

                      
                       connection.query("SELECT * FROM gracountry", function(err, rows, fields){
                         if(!err)
                           res.json({message:rows,status:1});
                         else
                           res.send({status:0});
                       })

                 });


                 
                 router.route('/get_gracountry/:id') 
                     .get(function(req, res){ 

                       var s=req.params.id;
                
                 var string="SELECT * FROM gracountry where id = '"+s+"'  ";
                 // console.log(string);

                 connection.query(string, function(err, rows, fields){
                   if(!err)
                     res.json({message:rows,status:1});
                   else
                     res.send({status:0});
                 })

           });



           router.route('/add_graemergency') 
           .post(function(req, res){ 
             
         

         console.log(req.body);

              var t=
                {
                   // date: new Date().toJSON().substr(0,  10),
                    name: req.body.name,
                    relationship:req.body.relationship,
                    mobile:req.body.mobile,
                    employeeid:req.body.employeeid,
                    date:req.body.date,



                   
                };

            connection.query("INSERT INTO graemergency SET?",t, function(err, rows, fields){
              if(!err)
                res.json({message:rows,status:1});
              else
              {
                console.log(err);
                res.send({status:0});
              }
             })

   });


    router.route('/get_graemergency') 
                .get(function(req, res){ 

                 
                  connection.query("SELECT * FROM graemergency", function(err, rows, fields){
                    if(!err)
                      res.json({message:rows,status:1});
                    else
                      res.send({status:0});
                  })

            });


            
            router.route('/get_graemergency/:id') 
                .get(function(req, res){ 

                  var s=req.params.id;
           
            var string="SELECT * FROM graemergency where employeeid = '"+s+"'  ";
            // console.log(string);

            connection.query(string, function(err, rows, fields){
              if(!err)
                res.json({message:rows,status:1});
              else
                res.send({status:0});
            })

      });



      router.route('/add_graexchangerate') 
      .post(function(req, res){ 
        
    

    console.log(req.body);

         var t=
           {
              // date: new Date().toJSON().substr(0,  10),
               currency: req.body.currency,
               date:req.body.date,
               rate:req.body.rate,


              
           };

       connection.query("INSERT INTO graexchangerate SET?",t, function(err, rows, fields){
         if(!err)
           res.json({message:rows,status:1});
         else
         {
           console.log(err);
           res.send({status:0});
         }
        })

});


router.route('/get_graexchangerate') 
           .get(function(req, res){ 

            
             connection.query("SELECT * FROM graexchangerate", function(err, rows, fields){
               if(!err)
                 res.json({message:rows,status:1});
               else
                 res.send({status:0});
             })

       });


       
       router.route('/get_graexchangerate/:id') 
           .get(function(req, res){ 

             var s=req.params.id;
      
       var string="SELECT * FROM graexchangerate where id = '"+s+"'  ";
       // console.log(string);

       connection.query(string, function(err, rows, fields){
         if(!err)
           res.json({message:rows,status:1});
         else
           res.send({status:0});
       })

 });




          router.route('/add_grafees') 
                     .post(function(req, res){ 
                       
                   

                   console.log(req.body);

                        var t=
                          {
                             // date: new Date().toJSON().substr(0,  10),
                              exchangerate: req.body.exchangerate,
                              total:req.body.total,
                              employeeid:req.body.employeeid,
                              currency:req.body.currency,
                              datepaid:req.body.datepaid,
                              requestid:req.body.requestid,
                              perdiem:req.body.perdiem,
                              type:req.body.type,
                              department:req.body.department,
                              amount:req.body.amount,


                             
                          };

                      connection.query("INSERT INTO grafees SET?",t, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                        {
                          console.log(err);
                          res.send({status:0});
                        }
                       })

             });


              router.route('/get_grafees') 
                          .get(function(req, res){ 

                           
                            connection.query("SELECT * FROM grafees", function(err, rows, fields){
                              if(!err)
                                res.json({message:rows,status:1});
                              else
                                res.send({status:0});
                            })

                      });


                      
                      router.route('/get_grafees/:id') 
                          .get(function(req, res){ 

                            var s=req.params.id;
                     
                      var string="SELECT * FROM grafees where employeeid = '"+s+"'  ";
                      // console.log(string);

                      connection.query(string, function(err, rows, fields){
                        if(!err)
                          res.json({message:rows,status:1});
                        else
                          res.send({status:0});
                      })

                });


                router.route('/add_graregion') 
                .post(function(req, res){ 
                  
              

              console.log(req.body);

                   var t=
                     {
                        // date: new Date().toJSON().substr(0,  10),
                         region: req.body.region,


                        
                     };

                 connection.query("INSERT INTO graregion SET?",t, function(err, rows, fields){
                   if(!err)
                     res.json({message:rows,status:1});
                   else
                   {
                     console.log(err);
                     res.send({status:0});
                   }
                  })

        });


         router.route('/get_graregion') 
                     .get(function(req, res){ 

                      
                       connection.query("SELECT * FROM graregion", function(err, rows, fields){
                         if(!err)
                           res.json({message:rows,status:1});
                         else
                           res.send({status:0});
                       })

                 });


                 
                 router.route('/get_graregion/:id') 
                     .get(function(req, res){ 

                       var s=req.params.id;
                
                 var string="SELECT * FROM graregion where id = '"+s+"'  ";
                 // console.log(string);

                 connection.query(string, function(err, rows, fields){
                   if(!err)
                     res.json({message:rows,status:1});
                   else
                     res.send({status:0});
                 })

           });



           router.route('/add_grarequest') 
           .post(function(req, res){ 
             
         

         console.log(req.body);

              var t=
                {
                   // date: new Date().toJSON().substr(0,  10),
                    employeeid: req.body.employeeid,
                    employeename:req.body.employeename,
                    rank:req.body.rank,
                    type:req.body.type,
                    invoice:req.body.invoice,
                    travelagent:req.body.travelagent,
                    visafees:req.body.visafees,
                    medicalfacility:req.body.medicalfacility,
                    courseprovider:req.body.courseprovider,
                    coursecharge:req.body.coursecharge,
                    exchangerate:req.body.exchangerate,
                    perdiem:req.body.perdiem,
                    datefrom:req.body.datefrom,
                    dateto:req.body.dateto,
                    currency:req.body.currency,
                    enteramount:req.body.enteramount,
                    total:req.body.total,
                    status:req.body.status,
                    reviewedby:req.body.reviewedby,
                   
 
                };

            connection.query("INSERT INTO grarequest SET?",t, function(err, rows, fields){
              if(!err)
                res.json({message:rows,status:1});
              else
              {
                console.log(err);
                res.send({status:0});
              }
             })

   });


    router.route('/get_grarequest') 
                .get(function(req, res){ 

                 
                  connection.query("SELECT * FROM grarequest", function(err, rows, fields){
                    if(!err)
                      res.json({message:rows,status:1});
                    else
                      res.send({status:0});
                  })

            });


            
            router.route('/get_grarequest/:id') 
                .get(function(req, res){ 

                  var s=req.params.id;
           
            var string="SELECT * FROM grarequest where employeeid = '"+s+"'  ";
            // console.log(string);

            connection.query(string, function(err, rows, fields){
              if(!err)
                res.json({message:rows,status:1});
              else
                res.send({status:0});
            })

      });


      //router.route('/get_grarequest') 
      //.get(function(req, res){ 

       
      // connection.query("SELECT medicalfacility FROM grarequest", function(err, rows, fields){
          //if(!err)
            //res.json({message:rows,status:1});
        // else
           // res.send({status:0});
      // })

 // })









   
   







     
     




   

        
        





     

          
          




        
   
             
             
   
   
   
   

























   
   







     
     




   

        
        





        
   
             
             
   
   
   
   







module.exports=router;
