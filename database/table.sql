USE CovidDashboard;

CREATE TABLE covid_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  country VARCHAR(255),
  confirmed INT,
  recovered INT,
  deaths INT,
  date DATE
);

CREATE TABLE covid_global_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  confirmed INT,
  recovered INT,
  deaths INT,
  date DATE
);
