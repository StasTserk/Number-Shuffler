import * as express from 'express';
import * as http from 'http';
import { NumberProvider } from './NumberProvider';
import { NumbersApi } from './NumbersApi';

const port = process.env.PORT || 3000;
const assetsDirectory = `${__dirname}/../client`;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const httpServer = http.createServer(app);

app.use('/', express.static(assetsDirectory));

const numberProvider = new NumberProvider();
const numbersApi = new NumbersApi(numberProvider);
numbersApi.register(app);

httpServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Shuffled Numbers server listening on ${port}`);
});
