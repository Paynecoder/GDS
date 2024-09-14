# GDS-15 Application

This repository contains a digitized GDS-15 form, which is used for administering the GDS-15 scale. The application consists of an Angular 18 frontend (`GDSWeb`) and a .NET 8 backend (`GDSApi`) that uses SQLite for data storage.

### Prerequisites

- Node.js (v18 or later)
- .NET 8 SDK
- SQLite

### Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/gds-15.git
    cd gds-15
    ```

2. Install dependencies for the frontend:
    ```sh
    cd GDSWeb
    npm install
    ```

3. Restore .NET dependencies for the backend:
    ```sh
    cd ../GDSApi
    dotnet restore
    ```

### Running the Application

1. Start the backend:
    ```sh
    cd GDSApi
    dotnet run
    ```

2. Start the frontend:
    ```sh
    cd ../GDSWeb
    npm start
    ```

The frontend will be available at `http://localhost:4200` and will communicate with the backend at `http://localhost:5000`.

