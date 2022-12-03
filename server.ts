import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import {
   Application,
   Router,
   helpers,
} from 'https://deno.land/x/oak@v11.1.0/mod.ts';

const app = new Application();
const router = new Router();

const appPort = Deno.env.get('PORT');
const baseUrl = Deno.env.get('API_URL');

app.use(router.routes());
app.use(oakCors());

router.get('/', (context) => {
   context.response.body = { message: 'Hello World!' };
});

router.get('/json/random', async (context) => {
   const data = await fetch(`${baseUrl}/basic/monsters/random/json`);
   context.response.body = await data.json();
});

router.get('/json/custom', async (context) => {
   const { primaryColor, secondaryColor, fillType } = helpers.getQuery(context);
   const data = await fetch(
      `${baseUrl}/basic/svgmonsters/json?primaryColor=%23${primaryColor}&secondaryColor=%23${secondaryColor}&fillType=${fillType}`
   );
   context.response.body = await data.json();
});

console.log(`🪐 Server listening at http://localhost:${appPort} ✨`);
await app.listen({ port: parseInt(appPort as string) });
