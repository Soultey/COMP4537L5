CREATE TABLE patients (
    patientId INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    dateOfBirth DATETIME NOT NULL
) Engine=InnoDB;
