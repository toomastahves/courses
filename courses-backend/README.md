# Readme

Project was generated using:
```
composer create-project laravel/laravel courses-backend
```

Run database migrations:
```
php artisan migrate
```

Launch application:
```
php artisan serve
```

Used commands:
```
php artisan make:model Course -m
php artisan make:model Coordinator -m
php artisan make:factory CoordinatorFactory --model=Coordinator
php artisan make:factory CourseFactory --model=Course
php artisan make:seeder CoordinatorSeeder
php artisan make:seeder CourseSeeder
php artisan make:controller Api/CourseController --api
php artisan make:controller Api/CoordinatorController --api
php artisan make:resource CourseResource
php artisan make:resource UserResource
php artisan make:resource CoordinatorResource

php artisan route:list
php artisan migrate:refresh --seed
```
