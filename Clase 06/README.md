# Clase 06 · Pruebas de API con Postman

La práctica usa MiniModa API 1.0.0 en modo `con-defectos`, con datos ficticios en memoria. La ejecución se hizo en Windows con Node.js 24.22.1 y Postman CLI 1.91.0.

## Paso 1 · Arranque y smoke test

Cloná el repositorio de la API y ejecutá esto en PowerShell con Node.js 20 o superior. Dejá abierta la terminal del servidor.

```powershell
git clone https://github.com/Simonethg/minimoda-test.git
Set-Location minimoda-test/api
$env:MODO = 'con-defectos'
$env:PORT = '4000'
node server.js
```

En otra terminal, comprobá el estado:

```powershell
curl.exe --noproxy '*' -i http://localhost:4000/health
```

El smoke test obtuvo HTTP 200 y `{"estado":"ok","modo":"con-defectos","version":"1.0.0"}`. [Swagger](http://localhost:4000/docs) y el [contrato OpenAPI 3.0.3](http://localhost:4000/openapi.json) devolvieron HTTP 200.

## Paso 2 · Casos basados en el contrato

El [informe](informe-api-y-carga.md) documenta los seis casos, sus referencias OpenAPI y los resultados observados.

## Paso 3 · Colección y entorno

Importá la [colección](coleccion/MiniModa-Clase-06.postman_collection.json) y el [entorno local](coleccion/local.postman_environment.json) en Postman. Seleccioná el entorno `local` con `baseUrl=http://localhost:4000`. Ejecutá la colección en orden para que las solicitudes auxiliares preparen los datos.

## Paso 4 · Corrida por CLI

Desde la raíz del repositorio de entrega, con la API levantada:

```powershell
npm.cmd install -g postman-cli
Set-Location 'Clase 06'
postman.cmd collection run 'coleccion/MiniModa-Clase-06.postman_collection.json' -e 'coleccion/local.postman_environment.json' --reporters cli
```

La [salida de Postman CLI](resultados/coleccion.txt) registra 13 solicitudes y 27 aserciones. Pasaron 22 y fallaron 5 por discrepancias en tres casos. La búsqueda `q=remera` pasó sus dos aserciones.
