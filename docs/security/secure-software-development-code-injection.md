---
date: 2021-09-27
layout: post
title: Secure Software Development-Code Injection
subtitle: 'Code Injection'
description: >-
image: >-
  ../images/code-injection.jpg
optimized_image: >-
  ../images/code-injection.jpg
category: tech
tags:
  - secure software
  - software development
  - code injection
author: mehmetenverakkoc
paginate: true
---
![Code Injection](../images/code-injection.jpg)

<strong>What is <a href="https://en.wikipedia.org/wiki/Code_injection">Code Injection?</a></strong>

It’s a general term given to vulnerabilities that allow a user to inject code that gets interpreted and executed by the application. Code Injection is limited to the capabilities of the injected language. It can happen both on the server and on the client side.

<strong>What causes Code Injection?</strong>

These vulnerabilities occur when untrusted input is used in a context where it can be treated as actual code. The input is not properly validated or encoded before being used.

To understand Code Injection vulnerabilities, let’s look at an example:

“Mathy” is a small web application that allows users to perform calculations. The calculation is performed using an unsafe eval() function.

```javascript
$calc = "5X5+2";
print eval('return'.$calc.';');
```

An attacker manipulates a calculation and enters a string that will result in command execution.

```javascript
$calc = "system('ls')";
print eval('return'.$calc.';');
```

As a consequence, the ‘ls’ command is executed and the directory contents are returned to the attacker.

- Code Injection could have significant impact

It could allow privilege escalation and command injection on the system. This could lead to the server falling into an attacker’s hands. An attacker could modify parts of the application and retrieve sensitive information, causing reputational damage. Or malware could be installed on the application server by abusing a code injection, leading to attacks such as cookie theft, site defacement or phishing.

<strong>To prevent Code Injection:</strong>

- Developers should never trust user input!
- Use parameterized queries and apply least privilege, such as a read only user on both the client and the server side.
- Apply application-wide filters or sanitization on all user-provided input through filtering, encoding, and whitelist validation. Libraries exist for this, in different frameworks. And remember to check not only GET and POST parameters, but Cookies and other HTTP headers as well.
- If possible, don’t let functions execute or interpret user input directly.

*I hope you found this article useful. You can contact me <a href="#">here</a> for your suggestions and thoughts about the series.*