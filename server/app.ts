import express, { Request, Response, Express, NextFunction } from 'express'
import next from 'next'
const cors = require('cors');
const router = express.Router();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server: Express = express();
    server.use(cors())
    server.use(express.json())
    server.use(express.urlencoded({ extended: true }))

    server.all("*", (req: Request, res: Response, next: NextFunction) => {
      if (req.url.startsWith('/api')) {
        return next();
      }
      return handle(req, res);
    });

    server.use('/api', function (req, res) {
      res.json({ data: 1 });
    });

    server.listen(port, (err?: any) => {
      if (err) {
        console.log('throw')
        throw err
      };
      console.log(`> Ready on ${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error('e.message', e.message);
    process.exit(1);
  }
})();
