
## Online API Test
 Utilize o endpoint:  [devTech-Heroku](https://devtech-backend.herokuapp.com/)
 
 utilize o arquivo de insominia par testar a API, caso demore para a requisição acontecer aguarde uns instantes até que o heroku seje inicializado
 
## Tech

Devtech usa várias libs de código aberto para funcionar corretamente:

- [node.js] - Eventos I/O para backend.
- [Express] - O Express é um framework para aplicativo da web do Node.js!.
- [Cors] - Cliente PostgreSQL.
- [Celebrate] - Interceptador de requisições express utilizado para validação de requisições.
- [Class Transformer] - Permite que você transforme um objeto simples em alguma instância de classe e vice-versa.
- [TypeORM] - TypeORM é um ORM que pode ser executado em NodeJS.
- [pg] - Biblioteca para usar o PostGress.
- [cors] - CORS é um pacote node.js para fornecer um middleware Connect/Express que pode ser usado para habilitar CORS com várias opções.
- [tsyringe] -  Utilizado para inversão de principio de dependencia.

## Instalação

DevTech precisa [Node.js](https://nodejs.org/) v16+ para funcionar.


Instale as dependencias e inicie o servidor

Com npm:
```sh
npm i
npm run dev:server
```

Com yarn:
```sh
yarn
yarn dev:server
```

Não esqueça de colocar as variaveis seguras dentro do arquivo .env

## License

MIT

**Free Software, Hell Yeah!**


[node.js]: <http://nodejs.org>
[express]: <http://expressjs.com>
[cors]: <https://www.npmjs.com/package/cors>
[celebrate]: <https://www.npmjs.com/package/celebrate>
[class Transformer]: <https://www.npmjs.com/package/class-transformer>
[TypeORM]: <https://typeorm.io/>
[pg]: <https://www.npmjs.com/package/pg>
[tsyringe]: <https://www.npmjs.com/package/tsyringe>
