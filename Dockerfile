# Use a imagem oficial do Node.js para construir a aplicação
FROM node:18 AS build

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

# Construir a aplicação Angular para produção
RUN npm run build --prod

# Usar uma imagem NGINX para servir a aplicação Angular
FROM nginx:alpine

# Copiar os arquivos construídos para o diretório padrão do NGINX
COPY --from=build /app/dist/random-quotes-app /usr/share/nginx/html

# Expor a porta 80 para acesso à aplicação
EXPOSE 80

# Comando padrão para rodar o NGINX
CMD ["nginx", "-g", "daemon off;"]
