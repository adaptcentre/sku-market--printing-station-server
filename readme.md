## SKU Market Printing Station Server

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

So th config file should look somehting like this:

```
NODE_ENV=
PORT=
```

Virtual Printer Tests
```
node scripts/test-01-a.js
node scripts/test-01-b.js
```

Serial Port Printer Tests
```
node scripts/test-02-a.js
node scripts/test-02-b.js
```