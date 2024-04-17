# Response Filter

Ts.ED response filter provide a @@ResponseFilter@@ decorator to decorate a class and handle data returned by the endpoint before sending it to your consumer.
The decorator take a `Content-Type` value to define when the class must be used to transform data to the expected result.

It's the right place to implement your own serialization logic. For example, you can define a Response filter to transform data to an XML content or wrap the data into another generic object.

With this decorator, you are able to define multiple Response Filter (but only by Content-Type). Ts.ED will choose the better
Response Filter according to the `Accept` HTTP header on the request object, when present, or fallback to the default Response filter.

## Xml Filter

By using the appropriate `Content-Type`, you can define a Xml serializer as following:

::: code-group

```typescript [XmlResponseFilter.ts]
import {ResponseFilter, Context, ResponseFilterMethods} from "@tsed/common";

@ResponseFilter("text/xml")
export class XmlResponseFilter implements ResponseFilterMethods {
  transform(data: any, ctx: Context) {
    return jsToXML(data);
  }
}
```

```typescript [UserCtrl.ts]
import {Configuration} from "@tsed/common";
import {Returns} from "@tsed/schema";

@Controller("/users")
export class UsersCtrl {
  @Get("/:id")
  @Returns(200, User).ContentType("application/json")
  @Returns(200, String).ContentType("text/xml")
  async getUser(@PathParams("id") id: string) {
    return new User({id});
  }
}
```

```typescript [Server.ts]
import {Configuration} from "@tsed/common";
import {XmlResponseFilter} from "./filters/XmlResponseFilter";

@Configuration({
  responseFilters: [
    XmlResponseFilter
  ]
})
```

```typescript [UsersCtrl.spec.ts]
import {UsersCtrl} from "@tsed/common";
import * as SuperTest from "supertest";
import {UsersCtrl} from "./UsersCtrl";
import {Server} from "../../Server";

describe("UserCtrl", () => {
  let request: SuperTest.Agent;

  before(
    PlatformTest.bootstrap(Server, {
      mount: {
        "/rest": [UsersCtrl]
      },
      responseFilters: [XmlResponseFilter]
    })
  );
  before(() => {
    request = SuperTest(PlatformTest.callback());
  });
  after(PlatformTest.reset);
  it("should return the xml format", async () => {
    const response = await request
      .get("/rest/users/1")
      .set({
        Accept: "text/xml"
      })
      .expect(200);

    expect(response.text).toEqual("<xml>...</xml>");
  });
  it("should return the default format", async () => {
    const response = await request.get("/rest/users/1").expect(200);

    expect(response.body).toEqual({id: "1"});
  });
});
```

:::

::: warning
Don't forget to register your Response Filter by adding your class to `responseFilters` field on the server configuration.
:::

## Wrap responses

One of the usage of the Response Filter could be to wrap all returned data into a generic object.
To doing that, use the `application/json` Content-Type with the @@ResponseFilter@@ decorator
to wrap data to the expected result:

::: code-group

```typescript [WrapperResponseFilter.ts]
import {ResponseFilter, Context, ResponseFilterMethods} from "@tsed/common";

@ResponseFilter("application/json")
export class WrapperResponseFilter implements ResponseFilterMethods {
  transform(data: any, ctx: Context) {
    return {data, errors: [], links: []};
  }
}
```

```typescript [UserCtrl.ts]
import {Configuration} from "@tsed/common";
import {Returns} from "@tsed/schema";

@Controller("/users")
export class UsersCtrl {
  @Get("/:id")
  @Returns(200, User).ContentType("application/json")
  @Returns(200, String).ContentType("text/xml")
  async getUser(@PathParams("id") id: string) {
    return new User({id});
  }
}
```

```typescript [Server.ts]
import {Configuration} from "@tsed/common";
import {WrapperResponseFilter} from "./filters/WrapperResponseFilter";

@Configuration({
  responseFilters: [
    WrapperResponseFilter
  ]
})
```

```typescript [UsersCtrl.spec.ts]
import {UsersCtrl} from "@tsed/common";
import * as SuperTest from "supertest";
import {UsersCtrl} from "./UsersCtrl";
import {Server} from "../../Server";

describe("UserCtrl", () => {
  let request: SuperTest.Agent;

  before(
    PlatformTest.bootstrap(Server, {
      mount: {
        "/rest": [UsersCtrl]
      },
      responseFilters: [XmlResponseFilter]
    })
  );
  before(() => {
    request = SuperTest(PlatformTest.callback());
  });
  after(PlatformTest.reset);
  it("should return the wrapped data", async () => {
    const response = await request.get("/rest/users/1").expect(200);

    expect(response.body).toEqual({data: {id: "1"}, errors: [], links: []});
  });
});
```

::: warning
The wrapper won't be documented in your generated `swagger.json`!
:::

## Handle all responses

By using the `*/*` Content-Type value given to the @@ResponseFilter@@ you can intercept all data.

```typescript
import {ResponseFilter, Context, ResponseFilterMethods} from "@tsed/common";

@ResponseFilter("*/*")
export class AnyResponseFilter implements ResponseFilterMethods {
  transform(data: any, ctx: Context) {
    // do something
    return data;
  }
}
```

## Pagination

The following advanced example will show you how you can combine the different Ts.ED features to describe Pagination.
The used features are the following:

- [Generics](/docs/model#generics)
- [Function programming to declare models](/docs/model#using-functions)
- @@For@@ decorator to declare a custom model for JsonSchema, OS2 or OS3.
- Response Filter to manage paginated response.

::: code-group

<<< @/docs/snippets/model/pagination-ctrl.ts [ProductsCtrl.ts]
<<< @/docs/snippets/model/pageable-model.ts [Pageable.ts]
<<< @/docs/snippets/model/pagination-model.ts [Pagination.ts]
<<< @/docs/snippets/model/pageable-product-model.ts [Product.ts]
<<< @/docs/snippets/model/pagination-filter.ts [PaginationFilter.ts]
<<< @/docs/snippets/model/pageable-product-model.ts [ProductsCtrl.spec.ts]

:::
