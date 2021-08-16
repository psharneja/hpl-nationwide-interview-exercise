import { PersonPasswordInput } from "./PersonPasswordInput";

export const validateRegister = (options: PersonPasswordInput) => {
    if (options.username.length <= 2) {
        return [
            {
              field: "username",
              message: "length has to be more than 2 character",
            },
          ];
      }
      if (options.username.includes('@')) {
        return [
            {
              field: "username",
              message: "cannot include @ sign",
            },
          ];
      }
      if (options.password.length <= 2) {
        return [
            {
              field: "password",
              message: "password has to be more than 2",
            },
          ];
      }
      return null;
}