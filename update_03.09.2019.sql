


		 create table criterion(
			 id int(11) AUTO_INCREMENT,
			 name varchar(255),
			 PRIMARY KEY (id) 
		);
		
	
			 create table test_criterion(
				 id int(11) AUTO_INCREMENT,
				 id_test int(11),
				 id_criterion int(11),
				 id_category int(11),
				 ordre  int(11),
				 id_subcategory1 int(11),
			     id_subcategory2 int(11),
				 median bool,
				 PRIMARY KEY (id),
				 FOREIGN KEY (id_test) REFERENCES test(id),
				 FOREIGN KEY (id_criterion) REFERENCES criterion(id),
				 FOREIGN KEY (id_category) REFERENCES category(id),
				 FOREIGN KEY (id_subcategory1) REFERENCES subcategory(id),
		         FOREIGN KEY (id_subcategory2) REFERENCES subcategory(id)
			);
		
		
		
		
		 create table criterion_result(
			 id int(11) AUTO_INCREMENT,
			 id_test int(11),
			 id_member int(11),
			 id_criterion int(11), 
			 result bigint,
			 PRIMARY KEY (id) ,
			 FOREIGN KEY (id_criterion) REFERENCES criterion(id),
			 FOREIGN KEY (id_test) REFERENCES test(id),
		    FOREIGN KEY (id_member) REFERENCES member(id)
		);
		
		
		
		