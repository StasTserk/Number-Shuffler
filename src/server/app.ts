import * as express from 'express';
import * as http from 'http';

const port = process.env.PORT || 3000;
const assetsDirectory = `${__dirname}/../client`;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const httpServer = http.createServer(app);

app.use('/', express.static(assetsDirectory));

httpServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Shuffled Numbers server listening on ${port}`);
});
