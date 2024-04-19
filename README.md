# Step-by-step guide to running the application.

1.	Begin by cloning the repository to your local machine:
```
git clone git@github.com:toomastahves/courses.git
```

2.	Navigate to cloned repository and launch application containers using Docker Compose:
```
cd courses
docker compose up -d
```

3.	Once applications are running, execute database migrations and seed data by entering the backend container: 
```
docker exec courses-backend /bin/bash -c "php artisan migrate --seed"
```

4.	The applications should now be available on following URLs:
```
Frontend: http://localhost:5000/
Backend: http://localhost:5001/api/documentation
```
