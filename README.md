# Prototype project for uv-managed python monorepo

Adapted from previous personal protype repo for containerised deployment of applications

Includes:
- ui/
    - Angular frontend application -- included for completeness from previous fork, not relevant to the prototype itself
- api-1/
    - A python api application  
- api-2/
    - Another python api application with different dependencies
- api-java/
    - A java api application with its own dependencies. This was in the original project not relevant to this prototype but currently left in place as an example of multi-language monorepo structure.
    
These will be managed by uv and containerised with their individual dependencies for deployment but we will set up the development environment to understand both of these sets of dependencies.

## Currently incomplete

- python apis
- terraform. This was started but fell by the wayside before forking this repo. Left in place for now in case prototyping terraform with uv-managed monorepo is desired later.
