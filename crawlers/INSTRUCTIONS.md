# desafio-backend

Essas instruções vão te deixar com uma cópia utilizável do projeto para desenvolvimento ou produção.

### Requisitos
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Docker](https://www.docker.com/get-docker)
* [Docker Compose](https://docs.docker.com/compose/install/#install-compose)


Entre na pasta do projeto
```sh
 cd desafio-backend/crawlers
```

## Executando com Docker

Rode o projeto em docker usando docker-compose

**A porta do container mongo é a 27017, certifique-se que ela já não esta sendo utilizada**
```sh
npm run docker:start
```

***A porta do db 27017 está exposta para visualização dos dados inseridos, podendo ser acessados por softwares como Robo3T**
