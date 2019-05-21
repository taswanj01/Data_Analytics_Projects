use wolves_db;

-- This is a sample query where the day trading setup criteria at this time is stocks 
-- that have a percentage change of 1 or more on the day in either direction

select * from market_data;

create or replace view high_percentage_change as 
select * from market_data where Percentage_change > 1 or Percentage_change < -1;

select * from high_percentage_change;