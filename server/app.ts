import express, { Request, Response, Express, NextFunction } from 'express'
import next from 'next'
const cors = require('cors');
const database = require('./database');

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

// const authRoutes = require('./routes/auth');

(async () => {
  try {
    await app.prepare();
    const server: Express = express();

    server.use(cors({ credentials: true, origin : process.env.API_URL, }))
    server.use(express.json())
    server.use(express.urlencoded({ extended: true }))

    server.all("*", (req: Request, res: Response, next: NextFunction) => {
      if (req.url.startsWith('/api')) return next();
      return handle(req, res);
    });

    // server.use('/api', authRoutes);

    database().then(response => {
      server.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
      });
    })
    .catch(e => {
      console.log(e)
    })

  } catch (e) {
    process.exit(1);
  }
})();
