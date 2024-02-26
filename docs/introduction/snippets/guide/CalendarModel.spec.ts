import {getJsonSchema} from "@tsed/schema";
import Ajv from "ajv";
import {CalendarModel} from "./CalendarModel";

function validate(model: CalendarModel) {
  const schema = getJsonSchema(CalendarModel);

  const ajv = new Ajv();

  const isValid= ajv.validate(schema, model);

  return {
    isValid,
    errors: ajv.errors
  }
}

describe("CalendarModel", () => {
  it("should generate a JsonSchema", () => {
    const jsonSchema = getJsonSchema(CalendarModel);

    expect(jsonSchema).toEqual({
      type: "object",
      properties: {
        id: {
          minLength: 1,
          type: "string"
        },
        name: {
          type: "string",
          minLength: 3
        },
        description: {
          type: "string",
          minLength: 1,
          maxLength: 100
        }
      },
      required: ["id", "name", "description"]
    });
  });
  it("should generate a JsonSchema (creation)", () => {
    const jsonSchema = getJsonSchema(CalendarModel, {groups: ["creation"]});

    expect(jsonSchema).toEqual({
      type: "object",
      properties: {
        name: {
          type: "string",
          minLength: 3
        },
        description: {
          type: "string",
          minLength: 1,
          maxLength: 100
        }
      },
      required: ["name", "description"]
    });
  });

  it("should validate model", async () => {
    const model = new CalendarModel();
    model.id = "1";
    model.name = "My calendar";
    model.description = "My calendar description";

    const {isValid} = validate(model);

    expect(isValid).toEqual(true);
  });

  it("should not validate the model if description is missing", async () => {
    const model = new CalendarModel();
    model.id = "1";
    model.name = "My calendar";
    model.description = "";

    const {isValid, errors} = validate(model);

    expect(isValid).toEqual(false);
    expect(errors).toEqual([
      {
        "instancePath": "/description",
        "keyword": "minLength",
        "message": "must NOT have fewer than 1 characters",
        "params": {
          "limit": 1
        },
        "schemaPath": "#/properties/description/minLength"
      }
    ])
  });
});
