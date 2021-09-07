import Koa from 'koa'
import koaBody from 'koa-body'
import Router from '@koa/router'
import logger from 'koa-logger'
import cors from '@koa/cors'
import fetch from 'node-fetch'

import { printService } from './services/print-service.js'

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

router.post('/api/print', async (ctx, next) => {
  const id = ctx.request.body.id

  if (!id) {
    ctx.throw(400)
  }

  const api_url = process.env.API_URL || 4000

  let response = await fetch(`${api_url}/api/receipt`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: id})
  }).then(res => res.json())

  if(!response || !response.svg) {
    ctx.throw(400)
  }

  const printStatus = await printService.print(response.svg)

  ctx.body = { success: printStatus.success }
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