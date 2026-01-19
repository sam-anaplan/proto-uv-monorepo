# Prototype project for uv-managed python monorepo

Adapted from previous personal protype repo for containerised deployment of applications.

## Overview
This is a prototype monorepo project to demonstrate use of `uv` tool to manage multiple python applications with different dependencies in a single repository.

The applications are containerised using docker for deployment.

## Structure
- `ui/`
    - Angular frontend application -- included for completeness from previous fork, not relevant to the prototype itself
- `api-1/`
    - A python api application  
- `api-2/`
    - Another python api application with different dependencies
- `api-java/`
    - A java api application with its own dependencies. This was in the original project not relevant to this prototype but currently left in place as an example of multi-language monorepo structure.
    - At the moment this is here for reference purposes and not included in the build scripts.
    
## Environment setup
- Install uv: https://uv.dev/docs/getting-started/installation
    - The recommended way is to use the install script as this allows it to self-manage updates
- Install python 3.12
- Install docker: https://docs.docker.com/get-docker/

### (Optional) for dev setup
- Install nodejs and npm if you want to run the ui application: https://nodejs.org/en/download/
    - [Install nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script) to manage node versions
    - Then use nvm to install nodejs version 24:
    ```
    nvm install 24
    nvm use 24
    ```
- Use/review the configure_dependencies.sh script to set up python virtual environments using `uv` tool and install node.js dependencies using `npm` for the ui application.
    - From the root of the repo, run:
    ```
    configure_dependencies.sh
    ```

## Building and running the applications
- From the root of the repo, run:
```
./build_all.sh
```
- This will build docker images for all applications.
- To run the applications, use:
```
./run_all.sh
```
- This will start all applications in docker containers.

- The ui application will be accessible in a browser at:
    - http://localhost:10666/task-list
- The api applications will be accessible at:
    - **api-1**: http://localhost:10667
    - **api-2**: http://localhost:10668

## Currently incomplete

- terraform. This was started but fell by the wayside before forking this repo. Left in place for now in case prototyping terraform with uv-managed monorepo is desired later.
