create table question(
     id int(11) AUTO_INCREMENT,
     name  varchar(255),
     wording  varchar(255),
     value int(12),
     PRIMARY KEY (id) 
	
);

create table test(
     id int(11) AUTO_INCREMENT,
	 test_subcategories_number int(11),
     name  varchar(255),
     password varchar(255),
	 activation_date Date,
	 expiration_date Date,
     PRIMARY KEY (id)

	 
);

create table category(
     id int(11) AUTO_INCREMENT,
     name  varchar(255),
     subcategories_number int(11),
     PRIMARY KEY (id) 
	
);

create table school(
     id int(11) AUTO_INCREMENT,
     name varchar(255),
     PRIMARY KEY (id)
	 
	 
);


create table subcategory(
     id int(11) AUTO_INCREMENT,
     name varchar(255),
	 id_category int(11),
	 FOREIGN KEY (id_category) REFERENCES category(id) ,
     PRIMARY KEY (id)
	 
	 
);



create table test_category(
     id int(11) AUTO_INCREMENT,
     id_category int(11),
	 id_test int(11),
	 FOREIGN KEY (id_category) REFERENCES category(id) ,
	 FOREIGN KEY (id_test) REFERENCES test(id) ,
     PRIMARY KEY (id)
	 
	 
);


create table test_school(
     id int(11) AUTO_INCREMENT,
     id_test int(11),
	 id_school int(11),
	 FOREIGN KEY (id_test) REFERENCES test(id) ,
	 FOREIGN KEY (id_school) REFERENCES school(id) ,
     PRIMARY KEY (id)
	 
	 
);


create table answer(
     id int(11) AUTO_INCREMENT,
     id_question  int(11),
     value  varchar(255),
     name varchar(255),
     PRIMARY KEY (id),
	 FOREIGN KEY (id_question) REFERENCES question(id) 
	 
);



create table clazz(
     id int(11) AUTO_INCREMENT,
     name varchar(255),
	 id_school int(11),
	 FOREIGN KEY (id_school) REFERENCES school(id) ,
     PRIMARY KEY (id)
	 
	 
);

create table member(
     id int(11) AUTO_INCREMENT,
     firstname varchar(255),
	 lastname varchar(255),
	 email varchar(255),
	 age varchar(255),
	 pseudo varchar(255),
	 password varchar(255),
	 civility varchar(255),
	 id_school int(11),
	 id_clazz int(11),
	 FOREIGN KEY (id_school) REFERENCES school(id) ,
	 FOREIGN KEY (id_clazz) REFERENCES clazz(id) ,
     PRIMARY KEY (id)
	 
	 
);

create table test_member(
     id int(11) AUTO_INCREMENT,
     id_test int(11),
	 id_member int(11),
	 FOREIGN KEY (id_test) REFERENCES test(id) ,
	 FOREIGN KEY (id_member) REFERENCES member(id) ,
     PRIMARY KEY (id)
	 
	 
);


create table choice_member(
     id int(11) AUTO_INCREMENT,
     id_question int(11),
	 id_answer int(11),
	 id_test_member int(11),
	 FOREIGN KEY (id_question) REFERENCES question(id) ,
	 FOREIGN KEY (id_answer) REFERENCES answer(id) ,
	 FOREIGN KEY (id_test_member) REFERENCES test_member(id) ,
     PRIMARY KEY (id)
	
);

create table test_clazz(
     id int(11) AUTO_INCREMENT,
     id_test int(11),
	 id_clazz int(11),
	 FOREIGN KEY (id_test) REFERENCES test(id) ,
	 FOREIGN KEY (id_clazz) REFERENCES clazz(id) ,
     PRIMARY KEY (id)
	 
	 
);

create table test_subcategory(
     id int(11) AUTO_INCREMENT,
     id_category int(11),
	 id_subcategory int(11),
	 id_test int(11),
	 questions_number int(11),
	 wording varchar(255) , 
	 FOREIGN KEY (id_subcategory) REFERENCES subcategory(id) ,
	 FOREIGN KEY (id_category) REFERENCES category(id) ,
	 FOREIGN KEY (id_test) REFERENCES test(id) ,
     PRIMARY KEY (id)
	 
	 
);

create table etalonnage(
     id int(11) AUTO_INCREMENT,
     lower_bound varchar(255),
	 upper_bound varchar(255),
	 value varchar(255),
	 id_subcategory int(11),
	 FOREIGN KEY (id_subcategory) REFERENCES subcategory(id) ,
     PRIMARY KEY (id)
	 
	 
);

ALTER TABLE subcategory ADD  down_description varchar(255);
ALTER TABLE subcategory ADD  up_description varchar(255);


create table manuel_answer(
     id int(11) AUTO_INCREMENT,
     response varchar(255),
	 id_test int(11),
	 id_subcategory int(11),
	 id_member int(11),
	 FOREIGN KEY (id_subcategory) REFERENCES subcategory(id) ,
	 FOREIGN KEY (id_test) REFERENCES test(id) ,
	 FOREIGN KEY (id_member) REFERENCES member(id) ,
     PRIMARY KEY (id)
	 
	 
);
