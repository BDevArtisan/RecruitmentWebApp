CREATE TABLE Administrateur (
nom VARCHAR(255),
prenom VARCHAR(255),
email VARCHAR(255) PRIMARY KEY,
date_creation DATE,
actif BOOLEAN DEFAULT TRUE,
tel VARCHAR(255),
mot_de_passe VARCHAR(255) NOT NULL
);

CREATE TABLE Organisation (
nom VARCHAR(255),
type VARCHAR(255),
siren VARCHAR(255) PRIMARY KEY,
siege_social VARCHAR(255)
);

CREATE TABLE Recruteur (
nom VARCHAR(255),
prenom VARCHAR(255),
email VARCHAR(255) PRIMARY KEY,
date_creation DATE,
actif BOOLEAN DEFAULT TRUE,
tel VARCHAR(255),
mot_de_passe VARCHAR(255) NOT NULL,
organisation VARCHAR(255) NOT NULL,
FOREIGN KEY (organisation) REFERENCES Organisation(siren)
);

CREATE TABLE Candidat (
nom VARCHAR(255),
prenom VARCHAR(255),
email VARCHAR(255) PRIMARY KEY,
date_creation DATE,
actif BOOLEAN DEFAULT TRUE,
tel VARCHAR(255),
mot_de_passe VARCHAR(255) NOT NULL
);

CREATE TABLE Offre_emploi (
numero INT PRIMARY KEY,
indication TEXT,
etat ENUM('non publié', 'en cour dédition', 'publié', 'expirée'),
date_de_validite DATE,
recruteur VARCHAR(255) NOT NULL,
organisation VARCHAR(255) NOT NULL,
FOREIGN KEY (recruteur) REFERENCES Recruteur(email),
FOREIGN KEY (organisation) REFERENCES Organisation(siren)
);

CREATE TABLE fiche_de_poste (
numero INT PRIMARY KEY REFERENCES Offre_emploi(numero),
intitule VARCHAR(255),
statut_de_poste VARCHAR(255),
responsable VARCHAR(255),
type_de_metier VARCHAR(255),
lieu_de_mission VARCHAR(255),
rythme TEXT,
description TEXT,
salaire_minimum INT,
salaire_maximum INT
);

CREATE TABLE candidature (
candidat VARCHAR(255),
offre INT,
date DATE,
PRIMARY KEY (candidat, offre, date),
FOREIGN KEY (candidat) REFERENCES Candidat(email),
FOREIGN KEY (offre) REFERENCES Offre_emploi(numero)
);

SELECT DISTINCT Administrateur.email
FROM Administrateur
INNER JOIN Recruteur ON Administrateur.email = Recruteur.email
INNER JOIN Candidat ON Recruteur.email = Candidat.email
WHERE Recruteur.organisation IN (SELECT Organisation.siren FROM Organisation)
AND NOT EXISTS
(SELECT * FROM Candidat
WHERE Candidat.email = Administrateur.email
AND Candidat.email = Recruteur.email) ;