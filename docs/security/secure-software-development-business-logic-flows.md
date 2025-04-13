---
date: 2021-09-19
layout: post
title: Secure Software Development-Business Logic Flaws
subtitle: 'Business Logic Flaws'
description: >-
image: >-
  ../images/logic-flow.jpg
optimized_image: >-
  ../images/logic-flow.jpg
category: tech
tags:
  - secure software
  - software development
  - logic flaws
author: mehmetenverakkoc
paginate: true
---
![Business Logic Flaws](../images/logic-flow.jpg)

<strong>What is the Business Logic vulnerability?</strong>

<a href="https://en.wikipedia.org/wiki/Business_logic">Business Logic”</a> flaws allow attackers to manipulate the business logic of a web application to their advantage.

<strong>What causes Business Logic vulnerabilities?</strong>

Logic flaws can be the result of coding bugs, design flaws or wrong logical assumptions made by developers during the implementation of the system.

Let’s look at some examples, first let’s go through a flawed order cancellation.
In this scenario, an attacker is connected to an e-shop where they buy a number of items. When finished, they proceed to the checkout page. When presented with the payment page, the attacker cancels the order. The money is not withdrawn, but because of a logic flaw, the items are still sent to the attacker.

Second example, I will explain reuse of discount coupons.
In this scenario, an attacker is logged into an e-commerce site. They obtain a %25 reduction coupon. The attacker buys products and at the payment screen, uses the discount coupon. However, because of a logic flaw, they are able to reuse the code multiple times, giving them %100 reduction. Proceeding to the checkout, they receive the order for free!

Last example, let’s go through an attacker who increases the bank balance.
The attacker is logged into a bank where they have a bank account. Transferring a negative amount to the account of a victim. The negative transfer is wrongly interpreted and the amount is transferred from the victim to the attacker’s account instead.
Business logic flaws can have significant impacts. Since logic flaws are application specific, their impact depends on the application but is typically high.

- Failures by banks to report potential money laundering related payments are an example of how logic errors can result in serious government regulation compliance breaches.
- Weak account validation could result in transferring more money than normally allowed, resulting in financial damages.
- Flaws in a checkout workflow could allow products to be ordered without paying, leading to theft, resulting in reputational and financial damages.

<strong>To prevent business logic flaws:</strong>

- Business rules should be clearly defined and checked against during the different development phases of the application including design, implementation and testing.
- Use threat modelling to help identify design flaws. Create security tests based on compliance rules, abuse cases and transaction flow analysis.
- Documenting the design of the application is important
- Design assumptions should be clearly stated
- Using data/transaction flow diagrams is recommended
- Make the application’s design resistant to abuse and perform security review and tests, regularly

*I hope you found this article useful. You can contact me <a href="#">here</a> for your suggestions and thoughts about the series.*