# Readme

This project contains two applications in separate folders: courses-backend (Laravel, PHP) and courses-frontend (React, TypeScript)

Applications run in Docker containers. Setup using Docker Compose:
```
docker compose up -d
```

After applications have started, then run database migrations inside backend container, which creates database tables and seed data:
```
php artisan migrate --seed
```

Frontend app is available at: http://localhost:5000/

Backend app is available at: http://localhost:5001/api/documentation/

