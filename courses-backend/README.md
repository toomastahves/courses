# Alternative Back-End Setup Guide (without Docker)

Before you begin, ensure you have PHP 8.3 and Composer 2.7 installed and configured on your system.

1.	Navigate to back-end application directory:
```
cd /courses/courses-backend
```

2.	 Install necessary dependencies:
```
composer install
```

3.	Start application server by using command:
```
php artisan serve –port=5001
```

4.	Run database migrations and seed database with initial data:
```
php artisan migrate --seed
```

5.	Open web browser and confirm the application is active:
```
http://localhost:5001/api/documentation
```
