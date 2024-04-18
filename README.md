# Readme

This project contains two applications in separate folders: courses-backend (Laravel, PHP) and courses-frontend (React, TypeScript)

Applications run in Docker containers. Setup using Docker Compose:
```
docker compose up -d
```

After applications have started, then run database migrations and generate seed data inside backend container:
```
docker exec courses-backend /bin/bash -c  "php artisan migrate --seed"
```

Frontend site is available at: http://localhost:5000/

Backend API is available at: http://localhost:5001/api/documentation/
