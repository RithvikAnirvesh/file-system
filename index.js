const express = require('express');
const app = express()
const path = require('path');
const fs=require('fs');

app.use(express.json());// middleware Parses JSON request bodies	
app.use(express.urlencoded({extended : true})); //middleware Parses URL-encoded form data

app.use(express.static(path.join(__dirname, 'public'))); // for frontend files whih is there in public folder

app.set('view engine','ejs');




// // app.post('/create',function(req,res){
// //     const title = req.body.title?.trim().split(' ').join(''); // Remove spaces from title
// //     const detail = req.body.detail;
// //     fs.writeFile(`./files/${title}.txt`, detail, function (err){
// //         res.redirect("/")
// //     });
// // })

// // app.get('/',function(req,res){
// //     fs.readdir(`./files`,function(err,files){ 
// //         res.render("index",{files: files});
// //     })
    
// // });


// // app.post('/create', function (req, res) {
// //     const title = req.body.title?.trim().split(' ').join('') || "Untitled"; // Default title if empty
// //     const detail = req.body.detail?.trim() || "No details provided"; // Default detail if empty

// //     if (!req.body.title || !req.body.detail) { // Validate form fields
// //         return res.status(400).send("Title and details are required");
// //     }

// //     fs.writeFile(`./files/${title}.txt`, detail, function (err) {
// //         if (err) {
// //             console.error("Error writing file:", err);
// //             return res.status(500).send("Error creating file");
// //         }
// //         res.redirect("/");
// //     });
// // });


    
// // app.listen(4000,function(){
// //     console.log("its runnung");
// // })




app.get('/', function (req, res) {
    fs.readdir('./files', function (err, files) {
        if (err) {
            console.error("Error reading directory:", err);
            return res.status(500).send("Error loading files");
        }
        res.render("index", { files: files });
    });
});

app.get('/files/:filename', function (req, res) {
    const filePath = path.join(__dirname, 'files', req.params.filename);

    fs.readFile(filePath, "utf-8", function (err, filedata) {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(404).send("File not found");
        }
        res.render('show', { content: filedata, filename: req.params.filename });
    });
});


app.post('/create', function (req, res) {
    const title = req.body.title?.trim().replace(/\s+/g, '') || "Untitled"; // Remove spaces and default to "Untitled"
    const detail = req.body.details?.trim() || "No details provided"; // Fix `details` field name

    if (!req.body.title?.trim() || !req.body.details?.trim()) { // Validate fields properly
        return res.status(400).send("Title and details are required");
    }

    const filePath = path.join(__dirname, 'files', `${title}.txt`); // Ensure correct path

    fs.writeFile(filePath, detail, function (err) {
        if (err) {
            console.error("Error writing file:", err);
            return res.status(500).send("Error creating file");
        }
        res.redirect("/");
    });
});



    
app.listen(3000,function(){
    console.log("server is running int the port 3000");
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // Start the Express server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const app = express();
// const path = require('path');
// const fs = require('fs');

// app.use(express.json()); // Middleware to parse JSON request bodies
// app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded form data

// app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend files from the "public" folder

// app.set('view engine', 'ejs'); // Set view engine to EJS

// // Route to display all files in the "files" directory
// app.get('/', function (req, res) {
//     fs.readdir('./files', function (err, files) {
//         if (err) {
//             console.error("Error reading directory:", err);
//             return res.status(500).send("Error loading files");
//         }
//         res.render("index", { files: files });
//     });
// });


// // app.get("/profile/:username/:age", function (req, res) {
// //     res.send(`Welcome, ${req.params.username} of age ${req.params.age}`);
// // });

// // Route to display the contents of a specific file
// app.get("/file/:filename", function (req, res) {
//     const filePath = path.join(__dirname, 'files', req.params.filename);

//     fs.readFile(filePath, "utf-8", function (err, filedata) {
//         if (err) {
//             console.error("Error reading file:", err);
//             return res.status(404).send("File not found");
//         }
//         res.send("Welcome");
//         // res.render('show', { content: filedata, filename: req.params.filename });
//     });
// });



// // Route to create a new file
// app.post('/create', function (req, res) {
//     const title = req.body.title?.trim().replace(/\s+/g, '') || "Untitled"; // Remove spaces from title
//     const detail = req.body.detail?.trim() || "No details provided"; // Validate detail field

//     if (!req.body.title?.trim() || !req.body.detail?.trim()) { // Ensure both fields have valid input
//         return res.status(400).send("Title and details are required");
//     }

//     const filePath = path.join(__dirname, 'files', `${title}.txt`);

//     fs.writeFile(filePath, detail, function (err) {
//         if (err) {
//             console.error("Error writing file:", err);
//             return res.status(500).send("Error creating file");
//         }
//         res.redirect("/");
//     });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, function () {
//     console.log(`Server is running on port ${PORT}`);
// });
