```bash
# INICIAR O BACKEND:
ABRIR_O_DOCKER
$ docker-compose up -d
$ npx prisma db push
$ npm install
$ npm run dev

# ABRIR DB LAYOUT:
$ npx prisma studio  # [ NO TERMINAL DO BACKEND ]

# INICIAR O FRONTEND:
$ npm install
$ npm run dev

```
```diff
! PARA ADICIONAR UM NOVO CAMPO:

! NO BACK:
1°
[C:\Users\vinil\Documents\GitHub\academy-back\prisma\schema.prisma]
- Adicionar o campo nos schema.prisma
- Adicionar a coluna do campo como um item opcional, colocar "?" no final do nome do campo.
- Exemplo: "nome? string | null | undefined; 

2° 
- Utilizar o comando "npx prisma db push"

3°
- Mexer em domain
- - src\domain\entities
- - src\domain\use-cases

4°
- Mexer em data
- - src\data\contracts\domain
- - src\data\contracts\repositories
- - src\data\services

5°
- Mexer em infra
- - src\infra\repositories
- - src\infra\repositories

6° 
- Mexer em presentation
- - presentation\controllers



! NO FRONT: 
- academy-front\models
- academy-front\contexts
```
