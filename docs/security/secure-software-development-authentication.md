---
date: 2021-09-18
layout: post
title: Secure Software Development -Authentication
subtitle: 'Authentication'
description: >-
image: >-
  ../images/authentication.jpg
optimized_image: >-
  ../images/authentication.jpg
category: tech
tags:
  - secure software
  - software development
  - authentication
author: mehmetenverakkoc
paginate: true
---

# Authentication Security

![Authentication Security](../images/authentication.jpg)

## Best Practices

First, we will go through various Authentication vulnerabilities, their causes & preventions & some potential hazards.

<strong>What are Authentication vulnerabilities?</strong>

The "Authentication" vulnerability groups weaknesses that have to do with keeping the overall user authentication process secure. Failure to do so can result in the takeover of user accounts.

<strong>What causes Authentication vulnerabilities?</strong>

- Inadequate password policies
- Sending credentials over an insecure channel
- Insecure password recovering mechanisms
- Information leakage on failed login
- Unlimited logon attempts
- Weakly hashed passwords

Let's look at some examples, first let's go through a <a href="https://en.wikipedia.org/wiki/Information_leakage">"Information Leakage"</a>

In this scenario, an attacker tries to guess existing account names by submitting common login names on the login page. When the user name doesn't exist the web server displays the message: <strong>"Account does not exist"</strong>. But when the user does exist the web server returns a different message: <strong>"Wrong password"</strong>. Because of the different responses, the attacker is able to determine the username of the existing 'admin' account. He can now start to attack the user's password.

Second example, explanation of security breaches as a result of a weak password policy, and no lockout mechanism.
In this scenario, an administrator of a site has set an easy to guess password. This was possible because a lax password policy has allowed it. An attacker tries to guess the password of the administrator account using a password list. Because no lockout mechanism exists, the attacker can try all possible passwords from the list. After a few guesses, he finds a matching administrator password. He can now control the web application or something. Not a good scenario! 😟

- Authentication vulnerabilities can have severe implications.

Weakly implemented controls allow attackers to guess user account names and allow for the guessing or cracking of passwords. User and administrative accounts could be taken over, including privileged accounts. With a stolen account, the attacker could do anything the victim could do. Due to account theft, sensitive end-user or customer data could be stolen, leading to reputational damage and revenue loss. And a stolen administrator account could lead to disruption of the website, causing loss of customers and revenue.

<strong>Implementing strong authentication controls are required to protect against authentication vulnerabilities.</strong>

- A strong password policy
- Securely hashed passwords, using unique salts
- A generic message on failed login
- Account lock on too many failed login attempts
- A secure password recovery mechanism
- A secure communication channel

*I hope you found this article useful. You can contact me <a href="#">here</a> for your suggestions and thoughts about the series.*