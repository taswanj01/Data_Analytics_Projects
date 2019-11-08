create view sales_amount_by_store as 
SELECT s.store_id, SUM(amount) AS Gross
               FROM payment p
               JOIN rental r
               ON (p.rental_id = r.rental_id)
               JOIN inventory i
               ON (i.inventory_id = r.inventory_id)
               JOIN store s
               ON (s.store_id = i.store_id)
               GROUP BY s.store_id;
               
select * from sales_amount_by_store;