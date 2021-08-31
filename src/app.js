import Koa from 'koa'
import koaBody from 'koa-body'
import Router from '@koa/router'
import logger from 'koa-logger'
import cors from '@koa/cors'

/*
*** Router Setup
*/

const router = new Router();

/*
 * BASIC index.html file that gets returned
*/
router.get('/', async (ctx, next) => {
  ctx.body = 'Hello'
})


/*
*** *** *** *** *** *** *** *** *** *** *** ***
*** *** *** *** *** *** *** *** *** *** *** ***
*** *** *** *** *** *** *** *** *** *** *** ***
*/

/*
 * Server Setup
*/

const cors_options = {
  origin: '*'
}

const app = new Koa()

app
  .use(logger())
  .use(cors(cors_options))
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods());

export { app };