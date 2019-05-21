use sakila;

-- 1a. Display the first and last names of all actors from the table actor
select first_name, last_name from actor;  

-- 1b. Display the first and last name of each actor in a single column in upper case letters. Name the column Actor Name
select concat_ws(' ', upper(first_name), upper(last_name)) as Actor_Name from actor;

-- 2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe."
select actor_id, first_name, last_name from actor where first_name = 'Joe';

-- 2b. Find all actors whose last name contain the letters GEN
select first_name, last_name from actor where last_name like '%GEN%';

## REVISED ## -- 2c. Find all actors whose last names contain the letters LI. 
--  This time, order the rows by last name and first name, in that order:
select first_name, last_name from actor where last_name like '%LI%';

-- 2d. Using IN, display the country_id and country columns of the following countries: Afghanistan, Bangladesh, and China:
select country_id, country from country where country in ('Afghanistan', 'Bangladesh', 'China');

-- 3a. create a column in the table actor named description and use the data type BLOB
alter table actor add column description BLOB;

-- 3b. Delete the description column.
alter table actor drop column description;

-- 4a. List the last names of actors, as well as how many actors have that last name
select last_name, count(last_name) from actor group by last_name;

-- 4b. List last names of actors and the number of actors who have that last name, 
--     but only for names that are shared by at least two actors
select last_name, count(last_name) from actor group by last_name having count(last_name) > 1; 

## REVISED -- 4c. The actor HARPO WILLIAMS was accidentally entered in the actor table as GROUCHO WILLIAMS. Write a query to fix the record.
update actor set first_name = 'HARPO' where first_name = 'GROUCHO' AND last_name = 'WILLIAMS';

## REVISED -- 4d. In a single query, if the first name of the actor is currently HARPO, change it to GROUCHO
update actor set first_name = 'GROUCHO' where first_name = 'HARPO' AND last_name = 'WILLIAMS';

-- 5a. You cannot locate the schema of the address table. Which query would you use to re-create it?
show create table address;
CREATE TABLE IF NOT EXISTS `address` (
   `address_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
   `address` varchar(50) NOT NULL,
   `address2` varchar(50) DEFAULT NULL,
   `district` varchar(20) NOT NULL,
   `city_id` smallint(5) unsigned NOT NULL,
   `postal_code` varchar(10) DEFAULT NULL,
   `phone` varchar(20) NOT NULL,
   `location` geometry NOT NULL,
   `last_update` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`address_id`),
   KEY `idx_fk_city_id` (`city_id`),
   SPATIAL KEY `idx_location` (`location`),
   CONSTRAINT `fk_address_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`) ON UPDATE CASCADE
 );
 
-- 6a. Use JOIN to display the first and last names, as well as the address, of each staff member. Use the tables staff and address:
select staff.first_name, staff.last_name, address.address
from staff
join address on address.address_id=staff.address_id;

## REVISED -- 6b. Use JOIN to display the total amount rung up by each staff member in August of 2005. Use tables staff and payment
select staff.first_name, staff.last_name, sum(payment.amount) as 'total amount rung up' from payment
join staff
on payment.staff_id=staff.staff_id
where payment.payment_date < "2005-08-31 23:59:59" and payment.payment_date > "2005-08-01 00:00:00"
group by staff.first_name;

-- 6c. List each film and the number of actors who are listed for that film. Use tables film_actor and film. Use inner join
select film.title, count(film_actor.actor_id) as 'number of actors' from film
inner join film_actor
on film.film_id=film_actor.film_id
group by film.title;

-- 6d. How many copies of the film Hunchback Impossible exist in the inventory system?
select film.title, count(inventory.film_id) as 'number of copies in inventory' from inventory
join film
on inventory.film_id=film.film_id
where film.title = 'Hunchback Impossible';

-- 6e. Using the tables payment and customer and the JOIN command, list the total paid by each customer. 
--     List the customers alphabetically by last name:
select customer.first_name, customer.last_name, sum(payment.amount) as 'total amount paid' from payment
join customer
on payment.customer_id=customer.customer_id
group by customer.last_name
order by customer.last_name;

## REVISED -- 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. As an unintended consequence,
--     films starting with the letters K and Q have also soared in popularity. Use subqueries to display the titles
--     of movies starting with the letters K and Q whose language is English
-- Old ver. pulling language name without using subqueries
	-- select film.title, language.name from film, language
	-- where language.name = 'English'
	-- and (film.title like 'Q%' or film.title like 'K%');
select film.title
from film
where film.title like 'Q%' or film.title like 'K%' and language_id IN
	(
	select language_id
	from language
	where name = 'English'
	);

-- 7b. Use subqueries to display all actors who appear in the film Alone Trip
SELECT first_name, last_name, actor_id
FROM actor
WHERE actor_id IN
(
 SELECT actor_id
 FROM film_actor
 WHERE film_id IN
  (
   SELECT film_id
   FROM film
   WHERE title = 'Alone Trip'
  )
);

-- 7c. You want to run an email marketing campaign in Canada, for which you will need the names and 
--     email addresses of all Canadian customers. Use joins to retrieve this information
select customer.first_name , customer.last_name, customer.email, country.country from customer
join address
on customer.address_id=address.address_id
join city
on address.city_id=city.city_id
join country
on city.country_id=country.country_id
where country.country = 'CANADA';

-- 7d. Sales have been lagging among young families, and you wish to target all family 
--     movies for a promotion. Identify all movies categorized as family films.
select film.title, category.name from film
join film_category
on film.film_id=film_category.film_id
join category
on film_category.category_id=category.category_id
where category.name = 'Family';

-- 7e. Display the most frequently rented movies in descending order.
select film.title, count(rental.inventory_id) as 'times rented' from film
join inventory
on film.film_id=inventory.film_id
join rental
on inventory.inventory_id=rental.inventory_id
group by film.title
order by count(rental.inventory_id) desc;

-- 7f. Write a query to display how much business, in dollars, each store brought in
select staff.store_id as 'store id', format(sum(payment.amount), 2) as 'business in dollars' from payment
join staff
on payment.staff_id=staff.staff_id
group by staff.store_id;

-- 7g. Write a query to display for each store its store ID, city, and country.
select store.store_id, city.city, country.country from store
join address
on store.address_id=address.address_id
join city
on address.city_id=city.city_id
join country
on city.country_id=country.country_id;

-- 7h. List the top five genres in gross revenue in descending order. 
--     (Hint: you may need to use the following tables: category, film_category, inventory, payment, and rental.)
select category.name, format(sum(payment.amount), 2) as 'gross revenue in dollars' from payment
join rental 
on payment.rental_id=rental.rental_id
join inventory
on rental.inventory_id=inventory.inventory_id
join film_category
on inventory.film_id=film_category.film_id
join category
on film_category.category_id=category.category_id
group by category.name
order by format(sum(payment.amount), 2) desc limit 5;

-- 8a. In your new role as an executive, you would like to have an easy way of viewing the Top five genres by gross revenue. 
--     Use the solution from the problem above to create a view. If you haven't solved 7h, you can substitute another query to create a view.
create view top_five_genres_by_gross_revenue as
select category.name, format(sum(payment.amount), 2) as 'gross revenue in dollars' from payment
join rental 
on payment.rental_id=rental.rental_id
join inventory
on rental.inventory_id=inventory.inventory_id
join film_category
on inventory.film_id=film_category.film_id
join category
on film_category.category_id=category.category_id
group by category.name
order by format(sum(payment.amount), 2) desc limit 5;

-- 8b. How would you display the view that you created in 8a?
select * from top_five_genres_by_gross_revenue;

-- 8c. You find that you no longer need the view top_five_genres. Write a query to delete it.
drop view top_five_genres_by_gross_revenue;