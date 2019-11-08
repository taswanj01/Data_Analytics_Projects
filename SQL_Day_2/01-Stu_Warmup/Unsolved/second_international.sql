create database animals_db;

use animals_db;
create table people (
	name varchar(30) not null,
	has_pet boolean default false,
    pet_name varchar(30),
    pet_age int
);

use animals_db;
insert into people (name, has_pet, pet_name, pet_age)
values ('Jacob', true, 'Sparky', 10),
		('Johnny', false, null, 5),
        ('Bobby', true, 'Bone', 7);

select * from people;

delete from people WHERE name = 'Jacob';
