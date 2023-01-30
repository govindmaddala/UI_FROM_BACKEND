const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/* to get html file */
app.set('view engine', 'ejs');
/* to use html file */
app.use(bodyParser.urlencoded({ extended: true }));
/* to get css file */
app.use(express.static("public"))
var items = ["Have a good sleep"];
var works = ["Do Coding"];

/*  To get static data assigned above in arrays*/
app.get('/', function (req, res) {
    var date = new Date();
    var options = { weekday: "long", day: "numeric", month: "long" }
    var currentday = date.toLocaleDateString("en-US", options);

    /* we render the html i.e ejs file with name list.ejs*/
    res.render("list", {
        listTitle: currentday,
        items: items
    });

    /* To add new habits or works */
    app.post('/', function (req, res) {
        var item = req.body.habit;
        /* On + button, we created a "list" name and its value is equal to "heading of the page" */

        if (item !== '') {
            if (req.body.list === 'Work') {
                works.push(item);
                res.redirect('/work');
            } else {
                items.push(item);
                res.redirect('/');
            }
        } else {
            res.redirect('/');
        }
    });

    app.get('/work', function (req, res) {
        res.render("list", {
            listTitle: "Work List",
            items: works
        });
    });
});

app.listen(3000);