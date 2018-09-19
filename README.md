# uservices_boilerplate
uServices project boilerplate with authentification.

## Getting started

- Deploy all containers in the localhost with the development environment.
Run docker and this command below:
```
make spin_up_services
```
And go to http://127.0.0.1/about to check service health.

## Create a new service

1. Create a new folder within services/
2. Create a Dockerfile
3. Update the Docker-compose.yml file
4. Update the Nginx .conf file

## All makefile commands

1. Deploy all containers in the localhost with the development environment.
```
make spin_up_services
```

2. Deploy all containers inside a virtual machine with the development environment.
```
make dev_env_deploy
```

3. Deploy all containers inside a virtual machine with the production environment.
```
make stage_env_deploy
```

4. Deploy all containers inside a EC2 virtual machine with the production environment.
```
make prod_env_deploy
```

5. Clean all containers.
```
make clean
```

6. Tests all services.
```
make tests
```

7. Test the client.
```
make client-tests
```

8. Test the users services.
```
make users-tests
```

9. Test the quality of code.
```
make flake
```

10. Migrate database.
```
make migrate
```

11. Code coverage.
```
make coverage
```

12. Export some environment variables needed during the building phase.
```
make export
```

13. Create randomly a secret key.
```
make keygen
```
