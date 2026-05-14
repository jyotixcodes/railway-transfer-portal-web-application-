# 🚂 Railway Transfer Portal Web Application

A full-stack, decoupled web application designed to streamline, track, and manage railway employee transfer requests and administrative approvals. Built with a secure, scalable RESTful API backend and a dynamic, responsive client interface.

---

## 📂 Repository Structure

This repository is organized as a unified monorepo containing both distinct layers of the application:

* **`/backend`**: Engineered with Java 21 and Spring Boot 3.4.3. Handles the core business logic, relational data modeling with Spring Data JPA, schema migrations via Hibernate, and secure RESTful endpoint exposure.
* **`/frontend`**: The user interface layer built to handle user request submissions, dynamic status tracking, and admin dashboards.

---

## 🚀 Key Features

* **User Submission Portal:** Allows railway employees to seamlessly create, submit, and monitor their structural transfer applications.
* **Admin Approval Workflow:** An interactive dashboard enabling administrators to review, filter, approve, or reject pending transfers.
* **Relational Consistency:** Robust backend validation ensuring all transfer details conform strictly to existing terminal, station, and user records.
* **Automatic Schema Management:** Utilizes Hibernate configuration (`createDatabaseIfNotExist=true`) to guarantee zero-overhead database environment setup locally.

---

## 💻 Local Setup Instructions

### ☕ Backend Setup (Spring Boot & MySQL)
1. Navigate into the backend directory:
   ```bash
   cd backend
