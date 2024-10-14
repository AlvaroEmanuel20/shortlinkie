import { Router } from 'express';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml';
import path from 'node:path';
import fs from 'node:fs';

const docsRoutes = Router();
const swaggerSpec = yaml.parse(
  fs.readFileSync(path.join(__dirname, 'docs', 'swagger.yaml'), 'utf8')
);

docsRoutes.use('/', swaggerUi.serve);
docsRoutes.get(
  '/',
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: 'ShortLinkie API',
  })
);

export default docsRoutes;
