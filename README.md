🌊 AquaClean - API

📋 Sobre a API

Essa api foi feita para prover dados de mensagens, a ideia era usalo em conjunto com o frontend do aquaclean frontend,
a ideia é que a pessoa entre no projeto e deixe uma mensagem e quando um administrador entrar na aba de recados da navbar
e colocar a KEY de administrador ele consiga ter acesso a essas mensagens atravez da API

👨‍🔧 Rotas:

``` Mensagens
Criar mensagen
/message/create
body: { email: 'exemplo@gmail.com', 'mensagem': 'Bom dia' }

Mostrar mensagens
/message/show/keyId - Esse keyId seria a key de admin, só ele vai poder ver as mensagens deixadas pelo usuário.
```

``` Keys
Criar uma key
/key/create
body: { "key": "crie sua key." }

Deletar uma key
/key/delete/:id - Aqui você deve passar o id da KEY que você quer deletar.
```

💻 Tecnologias Utilizadas:

```
- Express
- MongoDB
- Nodemon
```
