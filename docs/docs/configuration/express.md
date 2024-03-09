# Express.js

## express.bodyParser <Badge text="6.111.0+"/>

This option let you configure the default bodyParser used by Ts.ED to parse the body request:

```typescript
@Configuration({
  express: {
    bodyParser: {
      text: {},
      json: {},
      urlencoded: {
        extended: true // required
      }
    }
  }
})
```

## express.router

The global configuration for the `Express.Router`. See
express [documentation](http://expressjs.com/en/api.html#express.router).

## statics

- type: @@PlatformStaticsOptions@@

Object to mount all directories under an endpoint.

[//]: # "<<< @/../packages/platform/platform-express/src/interfaces/PlatformExpressStaticsOptions.ts"
