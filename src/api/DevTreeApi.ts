import { isAxiosError } from "axios";
import api from "../config/axios";
import { ProfileForm, TUser } from "../types";

export async function getUser() {
  try {
    const { data } = await api.get<TUser>("/user");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateUser(formData: ProfileForm) {
  try {
    const { data } = await api.patch<string>("/user", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
