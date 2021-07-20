# backend
backend class

ejecutar:
npm i

Para este desafio ejecutar
ejecutar:
1. npm start 8081 FORK FACEBOOK_CLIENT_ID FACEBOOK_CLIENT_SECRET 
en otra terminal artillery:
artillery quick --count 50 -n 20 http://localhost:8081/info > result_fork.txt


2. npm start 8081 CLUSTER FACEBOOK_CLIENT_ID FACEBOOK_CLIENT_SECRET 
en otra terminal artillery:
artillery quick --count 50 -n 20 http://localhost:8081/info > result_cluster.txt

3. node --prof ./src/server.js
en otra terminal artillery:
artillery quick --count 50 -n 20 http://localhost:8080/infobloq > result_bloq.txt
artillery quick --count 50 -n 20 http://localhost:8080/info > result_nobloq.txt

4. npm start0x
en otra terminal
npm test


