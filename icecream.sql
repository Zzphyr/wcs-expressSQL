CREATE TABLE icecream (
   id int AUTO_INCREMENT,
   name varchar(100),
   entry_date date,
   isVegan boolean,
   PRIMARY KEY (id)
)

INSERT INTO icecream (name, entry_date, isVegan) VALUES 
   ('Chocolate Ice Cream', '2015-05-10', false),
   ('Dark Chocolate Sorbet', '2015-06-18', true),
   ('Vanilla Ice Cream', '2015-12-06', true),
   ('Chocolate Chip Cookie Dough', '2017-07-09', false),
   ('Coffee Ice Cream','2017-11-03', true),
   ('Coconut Ice Cream', '2018-01-31', true),
   ('Green Tea Ice Cream', '2018-02-01', true),
   ('Mocha Chip Ice Cream', '2018-02-01', false),
   ('Tiramisu Ice Cream', '2018-03-13', false),
   ('Cherry Vanilla Ice Cream','2017-11-24', false),
   ('Cherry Ice Cream','2017-10-14', true),
   ('Pistachio Ice Cream', '2018-01-17', true),
   ('Rum Raisin Ice Cream', '2018-03-19', true),
   ('Peanut Butter Ice Cream','2017-09-01', false);



