---
marp: true
paginate: true
footer: "by kazuki tanida"
---

<!-- prerender: true -->

<style>
  section {
    font-size: 20px
  }
</style>

# Rails で SQL構文を利用

---

```ruby
> User.joins(:monthly_expenditures).distinct.where("monthly_expenditures.is_active = ?", true)

 User Load (26.6ms)
 SELECT DISTINCT `users`.* FROM `users`
 INNER JOIN `monthly_expenditures`
 ON `monthly_expenditures`.`user_id` = `users`.`id`
 WHERE (monthly_expenditures.is_active = TRUE)

=> [#<User:0x00007f9a1c2600a8
    id: 1,
    email: "a@a.a",
    password_digest: "[FILTERED]",
    name: "Aさん",
    created_at: Thu, 06 Aug 2020 18:42:01 JST +09:00,
    updated_at: Thu, 06 Aug 2020 18:42:01 JST +09:00>,
 #<User:0x00007f9a1d01bf80
    id: 24,
    email: "b@b.b",
    password_digest: "[FILTERED]",
    name: "Bさん",
    created_at: Sat, 03 Oct 2020 03:46:01 JST +09:00,
    updated_at: Sat, 03 Oct 2020 03:46:01 JST +09:00>]
```


---

```ruby
> User.joins(:monthly_expenditures).distinct.where("monthly_expenditures.is_active = ?", true).to_sql

=>

"SELECT DISTINCT `users`.* FROM `users`
INNER JOIN `monthly_expenditures` ON `monthly_expenditures`.`user_id` = `users`.`id`
WHERE (monthly_expenditures.is_active = TRUE)"
```

---

```ruby
> User.joins(:monthly_expenditures).distinct.where("monthly_expenditures.is_active = ?", true).explain
  User Load (9.9ms)
  SELECT DISTINCT `users`.* FROM `users`
  INNER JOIN `monthly_expenditures` ON `monthly_expenditures`.`user_id` = `users`.`id`
  WHERE (monthly_expenditures.is_active = TRUE)

=> EXPLAIN for:
  SELECT DISTINCT `users`.* FROM `users`
  INNER JOIN `monthly_expenditures` ON `monthly_expenditures`.`user_id` = `users`.`id`
  WHERE (monthly_expenditures.is_active = TRUE)

+----+-------------+----------------------+------------+--------+---------------+---------+---------+----------------------------------------------------+------+----------+------------------------------+
| id | select_type | table                | partitions | type   | possible_keys | key     | key_len | ref                                                | rows | filtered | Extra                        |
+----+-------------+----------------------+------------+--------+---------------+---------+---------+----------------------------------------------------+------+----------+------------------------------+
|  1 | SIMPLE      | monthly_expenditures | NULL       | ALL    | NULL          | NULL    | NULL    | NULL                                               |  119 |     10.0 | Using where; Using temporary |
|  1 | SIMPLE      | users                | NULL       | eq_ref | PRIMARY       | PRIMARY | 8       | money_log_development.monthly_expenditures.user_id |    1 |    100.0 | Using where                  |
+----+-------------+----------------------+------------+--------+---------------+---------+---------+----------------------------------------------------+------+----------+------------------------------+
2 rows in set (0.01 sec)

```

---
## MySQL

```
> SELECT DISTINCT `users`.* FROM `users` INNER JOIN `monthly_expenditures` ON `monthly_expenditures`.`user_id` = `users`.`id` WHERE (monthly_expenditures.is_active = TRUE);

+----+-------+--------------------------------------------------------------+---------+----------------------------+----------------------------+
| id | email | password_digest                                              | name    | created_at                 | updated_at                 |
+----+-------+--------------------------------------------------------------+---------+----------------------------+----------------------------+
|  1 | a@a.a | $2a$12$xzojLtqwNSSfUif1wrr59uwDGzMthDy6MPlnweBxXqkRzLyOeBm5e | Aさん   | 2020-08-06 09:42:01.462768 | 2020-08-06 09:42:01.462768 |
| 24 | b@b.b | $2a$12$OSKaOzQX1u7LG2F7hg9IRuXnB00lSEs5vMDhRDtA8k2YSXCqu28ta | Bさん   | 2020-10-02 18:46:01.867822 | 2020-10-02 18:46:01.867822 |
+----+-------+--------------------------------------------------------------+---------+----------------------------+----------------------------+
2 rows in set (0.01 sec)
```

---

参考:
https://qiita.com/TouMotonori/items/1844e762eb3121156738#2-sql%E3%81%AE%E3%82%B3%E3%82%B9%E3%83%88%E3%82%92%E7%9F%A5%E3%82%8B

