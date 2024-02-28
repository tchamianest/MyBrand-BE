[![codecov](https://codecov.io/github/tchamianest/MyBrand-BE/graph/badge.svg?token=ZQK3VYHML4)](https://codecov.io/github/tchamianest/MyBrand-BE)
[![Node.js CI](https://github.com/tchamianest/MyBrand-BE/actions/workflows/testing.yml/badge.svg)](https://github.com/tchamianest/MyBrand-BE/actions/workflows/testing.yml)


# back-endblogs of All my portifolio back end od MyBrand-BE

# Introduction

Welcome to the heart of MyBrand-BE! This repository serves as the backbone of my portfolio backend, showcasing the craftsmanship and design philosophy that defines portifolio. Here, you'll find both the starting point and the final result for each section and project, meticulously crafted to align with our vision.

🚨 **\_Please read the following Frequently Asked Questions (FAQ) carefully before starting ** 🚨

### Q1: How do I download the files?

**A:** If you're new to GitHub and just want to download the entire code, hit the green button saying "Code", and then choose the "Download ZIP" option. If you can't see the button (on mobile), use [this link](https://github.com/tchamianest/MyBrand-BE.git) instead.

# HOW TO TEST.

 <h4>npm start</h4> 
 <h4>npm test</h4>

# Codecov statistics Link

<https://app.codecov.io/gh/tchamianest/MyBrand-BE>

# Authentication

All endpoints, except user registration, getting alllog ,getting all likes and authentication, require a valid user session token for access.

# Endpoints

#### 1. Blog Management

###### Create blogs Item

Endpoint: /api/blogs
Method: POST

###### Geting single blogs Item

Endpoint: /api/portfolio/{id}
Method: GET

###### Geting single blogs Item

Endpoint: /api/blog/:id
Method: PATCH

###### Delete single blogs Item

Endpoint: /api/blogs/:id
Method: DELETE

### 3. Query

##### send message

Endpoint: /api/message
Method: POST

##### Reply message

Endpoint: /api/user/message
Method: POST

### 3. Likes

##### put like

Endpoint: /api/blog/blog_id/likes
Method: POST

##### get all likes

Endpoint: /api/likes
Method: GET

### 3. User

##### Register

Endpoint: /api/register
Method: POST

##### LOGIN

Endpoint: /api/register
Method: POSTs 
=======
