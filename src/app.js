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

  //const id = '44d1366c-92f1-4071-b4af-b24a3ca1e0e9'

  if (!id) {
    ctx.throw(400)
  }

  let response = await fetch('http://localhost:4000/api/receipt', {
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

  // not sure if this should be awaited and status sent to client
  printService.print(response.svg).then( (res) => {
    console.log(`printService print() completed - ${res.status}`)
  })

  ctx.body = { success: true }
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