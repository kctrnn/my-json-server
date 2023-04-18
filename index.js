require('dotenv').config();

const jsonServer = require('json-server');
const queryString = require('query-string');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const protectedRoute = require('./middlewares/protected-route');

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
server.use('/api/private', protectedRoute, router);

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
);

// Use default router
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
