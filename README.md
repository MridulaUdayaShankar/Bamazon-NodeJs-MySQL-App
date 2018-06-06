# Bamazon-NodeJs-MySQL-App

## Getting Started
Bamazon is Amazon-like storefront with the use of MySQL database. The app will take in orders from customers and deplete stock from the store's inventory. 

* Here's a demo to use the app:
![demo](demo.gif)

## Pre-requisites
* Create a MySQL Database
* Populate this database with around 10 different products
* Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale

* The app then prompts the users with two messages:
1. The first asks them the ID of the product they would like to buy.
2. The second message asks how many units of the product they would like to buy.

* Once the customer has placed the order,the application checks if your store has enough of the product to meet the customer's request,if not, the app should log a phrase like Insufficient quantity! and then prevent the order from going through

* However, if the store does have enough of the product,it would fulfill the customer's order by updating the SQL database to reflect the remaining quantity and show the customer the total cost of their purchase


### Installation 
* NodeJs
* Node package modules for mysql, inquirer and console.table(to get the table from database displayed with correct table formatting)

### License
MIT License
