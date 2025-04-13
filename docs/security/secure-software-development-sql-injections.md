---
date: 2021-12-28
layout: post
title: Secure Software Development- SQL Injections
subtitle: 'SQL Injection'
description: >-
image: >-
  ../images/sql-injection.jpg
optimized_image: >-
  ../images/sql-injection.jpg
category: tech
tags:
  - secure software
  - software development
  - sql injection
author: mehmetenverakkoc
paginate: true
---
![SQL Injection](../images/sql-injection.jpg)

<strong>What are SQL Injections?</strong>

SQL injections occur when an attacker is able to inject SQL queries via the input data of an application. A successful attack allows an attacker to access and manipulate the backend database.

<strong>What causes SQL Injections?</strong>

User input is used to dynamically build queries. If this input is not first validated, the query interpreter can be tricked into running arbitrary SQL queries or commands.

To understand a SQL injection security vulnerability, let’s first go through the normal <strong>authentication workflow:</strong>

Let’s say a user submits his credentials using POST parameters. The parameters are appended to a database query string that is submitted to the database. The credentials are valid and the appropriate record is returned to the web server. Finally, the session cookie is returned to the browser; the user is now logged in.

In the next scenario, we’re going to look at an example of an <strong>authentication bypass from a malicious SQL injection:</strong>

Let’s say an attacker submits input values that will take advantage of the query. The submitted input, changes the logic of the query, and because of the always true condition, the password condition gets ignored. The vulnerability is exploited in order to gain control to an account without providing a valid password. The session cookie is returned to the browser and the attacker is now logged in as an administrator.

<img src="https://miro.medium.com/max/1400/1*J0vJ8nYC6eCrGxNBx3j45w.png"/>

SQL injections can hava significant impacts. A successful injection could allow an attacker to Update,Insert or Delete data. All data could be exposed or even deleted. Furthermore, access to the hosting system could be gained by an attacker, with proper Authentication processes being bypassed. As a result, any altered data such as balance and transaction information could cause repudiation issues. Account and private data theft could damage reputation and credibility, leading to customer and revenue loss. System unavailability could result in loss of revenue and reputation too.

<strong>To prevent SQL injections</strong>, it is important to use parameterized queries. The example below shows incorrect code that is vulnerable to SQL injection.

```javascript
insert_user_query="INSERT INTO users (name,age)
VALUES (request_user_name + "," + request_user_age + ")";
insert_user = db.prepare(insert_user_query)
insert_user.execute()
```

Developers should never concatenate user-controllable input with application SQL sent to the database. Instead use parameterized queries.

```javascript
insert_user = db.prepare "INSERT INTO users
(name,age) VALUES (?,?)"
insert_user.execute
(request_user_name, request_user_age)
```

*All of the popular development frameworks provide support for secure connection of database queries.*

<strong>To prevent the vulnerabilities associated with “SQL Injections”</strong>

- Developers should use white-list validation on all user input.
- Apply the least privilege principle on all backend database users.
- Consider GET and POST parameters, Cookies and other HTTP headers.

*I hope you found this article useful. You can contact me <a href="#">here</a> for your suggestions and thoughts about the series.*