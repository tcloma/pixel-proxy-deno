# Pixel Encounter Proxy

A simple Deno server using Oak that serves as a proxy to the Pixel Encounter API for CORS support

Deployed on:
[https://tcloma-pixel-proxy-deno.deno.dev/](https://tcloma-pixel-proxy-deno.deno.dev/)

```JS
apiRoutes: {
   '/json/random',
   '/json/custom': {
      params: {
            primaryColor: 'string',
            secondaryColor: 'string',
            fillType: 'number (0 - 4)',
         }
   },
   '/svg/random',
   '/svg/custom': {
       params: {
            saturation: 'number (< 1)',
            colorVariations: 'number (< 1)',
            edge: 'number (< 1)',
         }
   }
}
```
