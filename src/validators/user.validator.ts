import joi from "joi";
import { regexConstant } from "../constants/regex.constant";

export class UserValidator {
  public static userName = joi.string().min(3).max(50).messages({
    "string.empty": "{{#label}} not be empty",
    "string.max":
      "{{#label}} length must be less than or equal to {{#limit}} characters long2",
    "string.min":
      "{{#label}} length must be at least {{#limit}} characters long2"
  });

  private static phone = joi.string().regex(regexConstant.PHONE).trim();
  private static age = joi.number().min(6).max(100);
  private static email = joi.string().regex(regexConstant.EMAIL).trim().lowercase();
  private static password = joi.string().regex(regexConstant.PASSWORD).min(5).max(50).trim();

  public static create = joi.object({
    name: this.userName.required(),
    email: this.email.required(),
    password: this.password.required(),
    age: this.age.required(),
    phone: this.phone.required()
  });

  public static update = joi.object({
    name: this.userName,
    age: this.age,
    phone: this.phone
  })

  public static login = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}

