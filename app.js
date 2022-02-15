const mysql = require("mysql2");
const moment = require("moment");
const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 4000;

app.use(bodyparser.json());
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/services", express.static(__dirname + "public/services"));
app.use("/img", express.static(__dirname + "public/img"));

app.set("views", "./views");
app.set("view engine", "ejs");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_calc",
  multipleStatements: true,
});

connection.connect((err) => {
  if (!err) console.log("MySQL conectado!");
  else console.log("Conexão recusada!" + JSON.stringify(err, undefined, 2));
});

app.get("", (req, res) => {
  res.render("index");
});

app.get("/infos", (req, res) => {
  res.render(__dirname + "/views/infos.ejs");
});

app.get("/requests", (req, res) => {
  connection.query("SELECT * FROM tbl_requests", (err, rows, fields) => {
    if (!err) {
      rows.map((el) => {
        el.created = moment(el.created).format("DD/MM/YYYY");
      });
      res.send(rows);
    } else console.log(err);
  });
});

app.post("/requests", (req, res) => {
  let request = req.body;
  let sql =
    "INSERT INTO tbl_requests(request, result, created, createdBy) values (?,?,?,?)";
  connection.query(sql, [
    request.request,
    request.result,
    request.created,
    request.createdBy,
  ]);
});

app.listen(port, () => console.info(`Aplicação rodando na porta ${port}`));
