@echo off

REM Set the name of the VM configuration where dockerd will be hosted

set BOOT2DOCKER_VM=default

REM set PATH=%PATH%;"C:\Program Files\Docker Toolbox\"

REM Start the default machine (or any other machine)

docker-machine start %BOOT2DOCKER_VM%

REM docker-compose up or docker run

REM docker-compose up -d

@FOR /f "tokens=*" %%i IN ('docker-machine env default') DO @%%i

docker start node-siyu



REM @FOR /f "tokens=*" %i IN ('docker-machine env default') DO @%i