# stop and remove any old containers and volumes
docker-compose down -v --remove-orphans

# remove named volumes (optional, starts fresh)
docker volume rm inventree-db-data -f
docker volume rm inventree-redis-data -f
docker volume rm inventree-data -f

# pull latest images
docker-compose pull

# start DB and Redis first
docker-compose up -d db redis

# run migrations
docker-compose run --rm inventree python /home/inventree/src/backend/InvenTree/manage.py migrate

# start InvenTree server
docker-compose up -d inventree

# show logs
docker-compose logs -f inventree