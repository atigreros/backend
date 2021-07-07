# backend
backend class

ejecutar:
npm i
npm start FACEBOOK_CLIENT_ID FACEBOOK_CLIENT_SECRET MODO 

MODO puede ser CLUSTER o FORK


Para ejecutar en el modo forever, es necesario instalar una versión de node 13.14 o inferior.
Para la instalación de varias versiones de node en el PC, se utilizó NVM for Windows: https://github.com/coreybutler/nvm-windows
Para instalar:
 nvm install 13.14 

Para utilizar la versión 13.14:
 nvm use 13.14

Finalmente, efectuar el modo forever:
 npm run prod

Para mostrar procesos:
tasklist /fi "imagename eq node.exe" 

Para matar procesos:
taskkill /f /pid NUMERO_PID

Para efectuar el modo pm2:
 npm run pm2