const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const db = require(__dirname + "/db.js");
const Op = Sequelize.Op;

db.sequelize.sync().then(function() {});
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/:idPotvrde", async function(req, res) {

  let potvrda = await db.zahtjevZaPotvrdu.findOne({ where: { id: req.params.idPotvrde} });
  let svrha = await db.svrha.findOne({ where: { id: potvrda.idSvrhe } });
  let stud = await db.korisnik.findOne({where: { id: potvrda.idstuda }});
  let odgovor = {
    student: {
      ime: stud.ime,
      prezime: stud.prezime,
      brojIndeksa: stud.indeks,
      datumRodjenja: stud.datumRodjenja,
      mjestoRodjenja: stud.mjestoRodjenja,
      kantonRodjenja: stud.kantonRodjenja,
      drzavaRodjenja: stud.drzavaRodjenja
    },
    detaljiOPohadjanju: {
      kojiPut: '2',
      akademskaGodina: '2018/2019',
      semestar: stud.semestar,
      ciklus: stud.ciklus,
      tipStudenta: 'Redovan',
      smjer: odsjek.nazivOdsjeka,
      tipStudija: 'BSc'
    },
    detaljiOFakultetu: {
      dekan: 'V. prof. dr Samim Konjicija, dipl.ing.el.'
    },
    svrha: svrha.nazivSvrhe,
    datumObrade:potvrda.datumObrade
  };
  
  res.json(odgovor);
});

app.listen(8080);