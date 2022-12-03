import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import {
   Application,
   Router,
   helpers,
} from 'https://deno.land/x/oak@v11.1.0/mod.ts';

const appPort = Deno.env.get('PORT');
const baseUrl = Deno.env.get('API_URL');

const router = new Router();
router.get('/', (context) => {
   context.response.body = { message: 'Hello World!' };
});

router.get('/json/random', async (context) => {
   const data = await fetch(`${baseUrl}/basic/monsters/random/json`);
   context.response.body = await data.json();
});

router.get('/json/custom', async (context) => {
   const {
      primaryColor = 'FFFFFF',
      secondaryColor = 'FFFFFF',
      fillType = '0',
   } = helpers.getQuery(context);
   const data = await fetch(
      `${baseUrl}/basic/svgmonsters/json?primaryColor=%23${primaryColor}&secondaryColor=%23${secondaryColor}&fillType=${fillType}`
   );
   context.response.body = await data.json();
});

router.get('/svg/random', async (context) => {
   const data = await fetch(`${baseUrl}/v2/basic/svgmonsters?saturation=0.5`);
   context.response.body = await data.text();
});

router.get('/svg/custom', async (context) => {
   const {
      saturation = 0.5,
      colorVariations = 1,
      edgeBrightness = 0.5,
   } = helpers.getQuery(context);
   const data = await fetch(
      `${baseUrl}/v2/basic/svgmonsters?saturation=${saturation}&colorVariations=${colorVariations}&edgeBrightness=${edgeBrightness}`
   );
   context.response.body = await data.text();
});

const app = new Application();
app.use(oakCors());
app.use(router.routes());

console.log(`🪐 Server listening at http://localhost:${appPort} ✨`);
await app.listen({ port: parseInt(appPort as string) });
