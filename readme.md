# SKU Market Printing Station Server

---
---

### Requirements
 - config.env file in the root directory

---

### Config .env file

Make sure there is a config.env file in the root directory!

Config.env fields:

| Field name | Field value  | Comment |
--- | --- | ---
| NODE_ENV | `development or` `production` ||
| PORT | INTEGER ||
| API_URL | URL |

So the config file should look somehting like this:

```
NODE_ENV=development
PORT=4030
API_URL=http://localhost:4000
```

---

### Test Scripts

These are scripts to test if the printer is working. If commands are getting sent to the printer. 
 - `test-01.js` converts an svg to `png` format
 - `test-02.js` converts an svg to `jpeg` format

*JPEG produces higher quality prints*

```
node scripts/test-01.js
node scripts/test-02.js
```