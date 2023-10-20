SELECT DISTINCT(CONCAT(collector_firstname_en,' ',collector_lastname_en)) as collname,collector_id,collectorsame01,numberofcollector,precollector_collid
FROM preinsertcollector LEFT JOIN
collector ON CONCAT(collector_firstname_en,' ',collector_lastname_en) = preinsertcollector.collectorsame01
where collector_id IS NULL
and numberofcollector > 0
