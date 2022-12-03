import express from 'npm:express';
import cors from 'npm:cors';

const app = express();
app.use(cors());

const port = Deno.env.get('PORT');
const baseUrl = Deno.env.get('API_URL');

app.get('/', (_req, res) => {
   res.send({ message: 'Hello from Proxy! 👋' });
});

app.get('/json/random', async (_req, res) => {
   const data = await fetch(`${baseUrl}/basic/monsters/random/json`);
   res.send(await data.json());
});

app.get('/json/custom', async (req, res) => {
   const {
      primaryColor = 'FFFFFF',
      secondaryColor = 'FFFFFF',
      fillType = '0',
   } = req.query;
   const data = await fetch(
      `${baseUrl}/basic/svgmonsters/json?primaryColor=%23${primaryColor}&secondaryColor=%23${secondaryColor}&fillType=${fillType}`
   );
   res.send(await data.json());
});

app.listen(port, () => {
   console.log(`🪐 Server listening at http://localhost:${port} ✨`);
});
