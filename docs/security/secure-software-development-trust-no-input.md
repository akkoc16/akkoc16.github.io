---
date: 2021-10-09
layout: post
title: Secure Software Development-Trust No Input
subtitle: 'Trust No Input'
description: >-
image: >-
  ../images/trust-no-input.jpg
optimized_image: >-
  ../images/trust-no-input.jpg
category: tech
tags:
  - secure software
  - software development
  - trust-no-input
author: mehmetenverakkoc
paginate: true
---
![Trust No Input](../images/trust-no-input.jpg)

<strong>What does “Trust No Input” mean?</strong>

As a rule, services or applications should not accept input without further validations. This avoids performing the next execution steps with possibly outdated, malformed, or malicious data.

Let’s look at an example:

We’ll look at how a bad database value can crash a system which does not properly validate input. Say an application allows users to make calculations based on values in database. In this case, the user wants to calculate “5*height”. Because of a past mistake, height is set to -4 in the database. However, the application expects height, and the result of the calculation, to be a positive number. Unfortunately, the application does not check the value received from the database before doing the calculation. Since the result is -20 , an exception is raised because of the negative sign. The application crashes.

<strong>Let’s see how the same application would handle the situation if proper input validation was implemented:</strong>

Again, the user wants to calculate “5*height”, and because of a past mistake, “height” is set to -4 in the database. However, to protect against unexpected errors, this time the application validates the input before further processing. The application finds the negative value and does not proceed with the calculation. Instead, it shows the user an error message and continues running.

Let’s take a look at “OS Command Injection” example:

Say an application has been poorly designed, and is vulnerable to command injection, due to improper input validation. When the user executes an action, the GET parameter *‘fileToDelete’* is passed to the system shell without prior validation. An attacker notices this, and crafts a malicious URL. He appends a shell command to the parameter value of a request. The application appends the GET parameter to the command string and the malicious command is executed.

```javascript
file=request.getParameter(“fileToDelete”);
validatedFile= validate(file);
execShellCommand(“rm-rf”+validatedFile;)
```
All the web application files are deleted. The web application becomes unavailable.

<strong>Let’s see how the application would deal with this if proper input validation was implemented:</strong>

Again, an attacker crafts a malicious URL. He appends a shell command to the parameter value of a request. This time, the application validates the input before executing the command. It has a blacklist of characters that will abort the execution. The application matches the “/” character to the blacklist and does not execute the command. Instead the attacker is presented an error message, and the application continues to run.

<strong>To prevent the vulnerabilities associated with “Trust no input”</strong>

- Never trust user input
- Limit the user’s options when providing input to the application. For example, provide them with a drop-down list using an index number, instead of full context.
- Validate all input before execution by using a secure validation scheme. This should include input coming from files, other services or databases.
- Perform server side validation using one of following schemes: Exact match, Whitelisting, Blacklisting.
- If possible, reject invalid data. Otherwise, at least clean or escape it.
- Developers should also consider validation of input coming from all types of sources, including: users,files,database,network, external services.

*I hope you found this article useful. You can contact me <a href="#">here</a> for your suggestions and thoughts about the series.*