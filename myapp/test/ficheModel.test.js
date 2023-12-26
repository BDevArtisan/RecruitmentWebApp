const DB = require("../model/db.js");
const ficheModel = require("../model/ficheModel.js");

describe("Offer Model Tests", () => {
    afterAll((done) => {
        DB.end(done);
    });

    test("read fiche", (done) => {
        ficheModel.read(2, function (res) {
            const lieu = res[0].lieu_de_mission;
            const salaire = res[0].salaire_minimum
            expect(lieu).toBe("Lyon");
            expect(salaire).toBe(40000);
            done();
        });
    });

    test("read all fiches", (done) => {
        ficheModel.readall(function (res) {
            expect(res.length).toBeGreaterThan(5);
            done();
        });
    });
});
