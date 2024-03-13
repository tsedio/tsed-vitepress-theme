import {BodyParams} from "@tsed/platform-params";
import {Get, Post, Returns} from "@tsed/schema";
import {Controller} from "@tsed/di";
import {Person} from "../models/Person";

@Controller("/")
export class PersonsCtrl {
  @Post("/")
  @Returns(200, Person)
  save1(@BodyParams() person: Person): Promise<Person> {
    console.log(person instanceof Person); // true

    return person; // will be serialized according to your annotation on Person class.
  }

  // OR
  @Post("/")
  @Returns(200, Person)
  save2(@BodyParams("person") person: Person): Promise<Person> {
    console.log(person instanceof Person); // true

    return person; // will be serialized according to your annotation on Person class.
  }

  @Get("/")
  @Returns(200, Array).Of(Person) // Add the correct json schema for swagger essentially.
  getPersons(): Promise<Person[]> {
    return Promise.resolve([new Person()]);
  }
}
