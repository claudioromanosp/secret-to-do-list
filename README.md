# Secret To Do List


Secret To Do List é uma aplicação para criar listas de afazeres. É possível criar uma tarefa, atualizá-la e deletar. Não há limite para criar tarefas.

Veja ele em ação aqui: [Link do Projeto](https://secret-to-do-list.vercel.app/)

Elogios, críticas ou me pagar uma cerveja [entre em contato](claudioromano13@gmail.com)

## Visão geral do projeto

Essa aplicação foi desenvolvida com React no Front-End e Firebase no Back-End. 

**Front-End**
O Front-End da aplicação foi desenvolvido com o framework React.
As rotas e redirecionamentos foram construídas com react-router-dom.
**Obs:** Optei por não utilizar nenhum framework de css pela baixa complexidade da estilização.
	
**Back-End**
Utiliza-se o Firestore DataBase para o CRUD: Create, Read, Update, Delete.
A autenticação de Login com e-mail e senha é realizada no Firebase Authentication, assim como a autenticação via conta Google.

## Como usar?

**1. Clone o projeto**
<code>git clone https://github.com/claudioromanosp/secret-to-do-list.git</code>

**2. Entre no diretório criado e digite:**
<code>npm install</code>
para instalar as dependências

**3. Crie um projeto no Firebase com as funcionalidades Authentication e Firestore Database**
<code>https://firebase.google.com/products/realtime-database</code>
  
  **4. Crie um arquivo .env na raíz do projeto clonado e coloque a API_KEY gerada pelo Firestore**
  <code>REACT_APP_API_KEY = cole-aqui-a-api-key-gerada</code>
  
  **Obs:** NÃO coloque a api_key entre aspas.
  
  A chave REACT_APP_API_KEY é usada no arquivo config.js que está dentro do diretório src:
  <code>apiKey: process.env.REACT_APP_API_KEY</code>
  
Como a api_key é um fator de risco de segurança ela dever estar muito bem guardada e não deverá ser enviada para o servidor, git ou qualquer outro lugar, por isso ela está no arquivo .env, que está no gitignore. Se você for hospedar na Vercel, há um campo **environment variables** nas configurações. Cole essa api_key lá, blz?

**5. Para rodar o projeto digite:**
<code>npm start</code>

Se, por acaso, alguma coisa não der certo me chame [no e-mail](claudioromano13@gmail.com) 

**- PAZ -**