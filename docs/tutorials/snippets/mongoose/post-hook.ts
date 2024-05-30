import {Required} from "@tsed/schema";
import {Model, ObjectID, PostHook} from "@tsed/mongoose";

@Model()
@PostHook("save", (car: CarModel) => {
  if (car.topSpeedInKmH > 300) {
    console.log(car.model, "is fast!");
  }
})
export class CarModel {
  @ObjectID("id")
  _id: string;

  @Required()
  model: string;

  @Required()
  isFast: boolean;

  @Property()
  topSpeedInKmH: number;  // Define the property used in hooks

  // or Prehook on static method
  @PostHook("save")
  static postSave(car: CarModel) {
    if (car.topSpeedInKmH > 300) {
      console.log(car.model, "is fast!");
    }
  }
}
