init:
	docker-compose up -d
start:
	docker-compose start
restart:
	docker-compose restart
stop:
	docker-compose stop
delete:
	docker-compose down --remove-orphans
ssh:
	docker-compose exec db /bin/sh
