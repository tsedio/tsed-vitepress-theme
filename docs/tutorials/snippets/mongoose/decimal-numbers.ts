import {Property} from "@tsed/schema";
import type {Model, NumberDecimal, Decimal128} from "@tsed/mongoose";

@Model()
export class ProductModel {
  @ObjectID("id")
  _id: string;

  @Property()
  sku: string;

  @NumberDecimal()
  price: Decimal128;
}
