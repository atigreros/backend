// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React, { useState }  from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();
let colors = ['blue', 'purple', 'yellow','green']; //initialize
//const [name, setName] = useState(" ");


/*const handleInput = event => {
  setName(event.target.value);  };*/

/*const logValue = () => {
  console.log(name);
  colors.push(name);
};*/

function getStyle(color: string)
{
  return ("<span style=color:" + color + ">" + color + '</span>')
}

app.handle("/", async (req) => {
  console.log(req.url)
  let query = req.url.replace(/\//g, "");
  //console.log(query)
  const params = new URLSearchParams(query);
  //console.log(params)
  let c = params.get("color");

 /* await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body>
          <div>
            <input value={name} onInput={e => setName(e.target.value)}/>
            <button onClick={logValue}>Send Color</button>       
          </div>
        </body>
      </html>,
    ),
  });*/

  if (c) {
    colors.push(c);}

  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body style= {{backgroundColor: "#000000"}}>
          <ul>
          {
            colors.map((col,index) =>            
            <li key={index}>  
              <div className="Container" dangerouslySetInnerHTML={{__html: getStyle(col)}}></div>
            </li>        
            )
            }

          </ul>
        </body>
      </html>
    ),
  });
});

app.listen({ port: 8080 });

/*app.handle("/", async (req) => {
  const query = req.url.replace(/\//g, "");
  const params = new URLSearchParams(query);
  const frase = params.get("frase") || "";
  const fraseDeco = decodeURIComponent(frase);
  const invertida = fraseDeco.split(" ").reverse().join(" ");

  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>servest</title>
        </head>
        <body>
          {invertida}
        </body>
      </html>,
    ),
  });
});
app.listen({ port: 8080 });*/