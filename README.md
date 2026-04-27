# Project & Task Management API

A robust backend system built with **Node.js**, **Express**, and **MongoDB** to manage organizational workflows through Projects and Tasks.

## 🚀 Features

* **Project Lifecycle Management**: Create and track projects with specific statuses such as `Active`, `Completed`, or `Archived`.
* **Granular Task Tracking**: Manage individual tasks with progress states including `Pending`, `In Progress`, and `Done`.
* **Schema Validation**: Strict data integrity via Mongoose, ensuring minimum lengths for descriptions and required title fields.
* **Automatic Timestamps**: Built-in tracking for `createdAt` and `updatedAt` on every entry.
* **RESTful Routing**: Dedicated routers for clean and scalable API architecture.

## 🛠️ Tech Stack

* **Runtime**: Node.js
* **Framework**: Express
* **Database**: MongoDB
* **ODM**: Mongoose

## 📋 API Reference

### Projects (`/projects`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/` | Retrieve all projects |
| **GET** | `/:id` | Get details for a specific project |
| **POST** | `/` | Create a new project |
| **PATCH** | `/:id` | Update project properties |
| **DELETE** | `/:id` | Remove a project from the system |

### Tasks (`/tasks`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/` | List all tasks |
| **POST** | `/` | Create a new task |
| **PATCH** | `/:id` | Update task status or details |
| **DELETE** | `/:id` | Delete a task by ID |

## 📝 Data Models

### Task
* **Title**: String (Required)
* **Description**: String (Min length 5)
* **Status**: Enum (`Pending`, `In Progress`, `Done`)

### Project
* **Title**: String (Required, Min length 3)
* **Description**: String (Default provided)
* **Status**: Enum (`Active`, `Completed`, `Archived`)

## ⚙️ Setup

1. **Install Dependencies**:
   ```bash
   npm install
2. **Environment**:
   Ensure your MongoDB connection is established in your entry file.
3. **Run**:
   ```bash
   node server.js
