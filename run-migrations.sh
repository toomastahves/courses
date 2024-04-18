#!/bin/sh

# Enter into Docker container and run mirations command
docker exec courses-backend /bin/bash -c  "php artisan migrate --seed"
