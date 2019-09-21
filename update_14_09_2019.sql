alter table criterion drop FOREIGN KEY  criterion_ibfk_3;
alter table criterion drop column id_category;
alter table criterion drop column result;
drop table criterion_result;
rename table criterion to criterion_test_category;
alter table criterion_test_category drop column name;
create table criterion(
     id int(11) AUTO_INCREMENT,
     name varchar(255),
     PRIMARY KEY (id) 
);
alter table criterion_test_category add column id_criterion int(11);
alter table criterion_test_category add FOREIGN KEY (id_criterion) REFERENCES criterion(id);
alter table criterion_test_category add column id_test_category int(11);
alter table criterion_test_category add FOREIGN KEY (id_test_category) REFERENCES test_category(id);
create table criterion_result(
	id int(11) AUTO_INCREMENT,
	id_criterion_test_category int(11),
	id_member int(11),
	result bigint,
	PRIMARY KEY (id),
	FOREIGN KEY (id_criterion_test_category) REFERENCES criterion_test_category(id),
    FOREIGN KEY (id_member) REFERENCES member(id)
);
alter table criterion_result add column id_test bigint;
alter table criterion_result add FOREIGN KEY (id_test) REFERENCES test(id);
		
	