# Online Shop Front End Project

> [!NOTE]
> **Current Status:** This project is currently utilizing mock data. Integration with a live API for data fetching will be implemented in a future phase.

## Project Overview

This document outlines the functionalities and page structure of the online shop front-end project. The application aims to provide a user-friendly and responsive interface for browsing products, managing a shopping cart, and for administrators to manage the product catalog.

## Target Users and Functionalities

### Administrators

* **Product Management (CRUD):**
    * **Create:** Ability to add new products to the store catalog, including details such as name, description, price and category.
    * **Update:** Ability to modify existing product information.
    * **Delete:** Ability to remove products from the store catalog.

### All Users (Publicly Accessible)

* **Home Page:**
    * Provides a brief introductory overview of the online store.
    * Features a visual carousel to showcase key images.
* **Location Page:**
    * Displays the physical store location visually on an embedded map.
    * Provides the store's physical address in written format.
* **Products List Page:**
    * Presents a comprehensive listing of all available products.
* **Product Detail Page:**
    * Provides a dedicated page for each product, displaying detailed information such as name, description, price, and available stock.

### Clients (Logged-in Users)

* **Cart:**
    * Displays a summary of the products the user has added for purchase.
    * Provides a clear overview of the total amount.
    * Facilitates the initiation of the online checkout process.

### Store Administrator (Logged-in User)

* **Manage Products:**
    * Offers a user interface for performing CRUD operations on products.
    * Includes a filtering mechanism based on product categories.
