intilize a project with npm
terminal:
   npm init -y // for package-lock.json
   npm i express //express install


1)setting up parsers for form:
   app.use(express.json());
   app.use(express.urlencoded({extended : true}));


2)setting up ejs for ejs pages:
   //ejs is just similar to html but we can perfrom
   dynamic actions in it//
   example:
   in html: <h1>2+2</h1> o/p = 2+2
   in ejs:  <h1>2+2</h1> o/p = 4

  => install ejs
     setup ejs as a view engine

3)setting up public static files


4 )Dyanamic routing:
    Dyanamic routing
    how to get data coming from front-end at back-end

    
// app.get("/profile/:username/:age", function (req, res) {
//     res.send(`Welcome, ${req.params.username} of age ${req.params.age}`);
// });
