import { instance } from "./base.api";
import UserInterface from "../interface/interfaces";

const endpoint = "users";

export const users = {
  getAll: function () {
    return instance.get(endpoint);
  },

  getById: function ({ id }: { id: string | undefined }) {
    return instance.get(`${endpoint}/${id}`);
  },

  create: function (values: UserInterface) {
    const { first_name, email, password } = values;
    return instance.post(endpoint, { first_name, email, password });
  },

  update: function (id: string, values: UserInterface) {
    const { first_name, email, password } = values;
    return instance.put(`${endpoint}/${id}`, { first_name, email, password });
  },

  delete: function (id: string) {
    return instance.delete(`${endpoint}/${id}`);
  },
};
