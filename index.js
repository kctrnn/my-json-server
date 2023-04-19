require('dotenv').config();

const jsonServer = require('json-server');
const queryString = require('query-string');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: './public',
});

const authController = require('./controllers/auth-controller');
const uploadController = require('./controllers/upload-controller');
const protectedRoute = require('./middlewares/protected-route');
const {
  uploadSingle,
  validateFormData,
  withThumbnail,
} = require('./middlewares/upload-middleware');

const PORT = process.env.PORT || 3000;

const PATHS = {
  IMAGES_FOLDER: './public/images',
  THUMBNAILS_FOLDER: './public/thumbnails',
};

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
  }

  if (req.method === 'PATCH') {
    req.body.updatedAt = Date.now();
  }

  // Continue to JSON Server router
  next();
});

// customize response
router.render = (req, res) => {
  const headers = res.getHeaders();
  const totalCountHeader = headers['x-total-count'];

  if (req.method === 'GET' && totalCountHeader) {
    const queryParams = queryString.parse(req._parsedUrl.query);

    const result = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 10,
        _totalRows: Number.parseInt(totalCountHeader),
      },
    };

    return res.jsonp(result);
  }

  res.jsonp(res.locals.data);
};

// custom routes
server.post('/api/login', authController.login);
server.post('/api/register', authController.register);
server.get('/api/profile', protectedRoute, authController.getProfile);

server.post(
  '/api/upload-image',
  validateFormData,
  uploadSingle(PATHS.IMAGES_FOLDER, 'image'),
  uploadController.uploadImage
);

server.use(
  '/api/with-thumbnail',
  validateFormData,
  uploadSingle(PATHS.THUMBNAILS_FOLDER, 'image'),
  withThumbnail,
  router
);

// private routes
server.use('/api/private', protectedRoute, router);

// /api/posts → /posts
// /api/posts/1 → /posts/1
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
);

// Use default router
server.use(router);
server.listen(PORT, () => {
  console.log('JSON Server is running at port', PORT);
});
