import { CreateUserCookieResponse } from "@/types/Cookie";
import User_Info from "@/types/User_Info";
import axios from "axios";

const Cookie = {
  createUserCookie: async (username: string) => {
    try {
      const response = await axios.post<CreateUserCookieResponse>(
        "/api/cookie/user",
        {
          username,
        }
      );

      return response;
    } catch (error) {
      console.log("Error Cookie CreateUserCookie with : ", error);
    }
  },

  /**
   * Retrieves the `User_Info` cookie from the server via the `/api/cookie/user` GET endpoint.
   *
   * @returns {Promise<User_Info | null>} return json type User_Info or null if not found.
   *
   * ```json
   *{
   *  "username": "abc"
   *}
   * ```
   *
   * Example JWT Value:
   * `"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJpYXQiOjE3NDYyNTY4MjJ9.xa..."`
   *
   * @example
   * ```ts
   * const jwt = await Cookie.GetUserCookie();
   * if (jwt) {
   *   console.log("Token:", jwt);
   *   console.log("username:", user_info?.username );
   * }
   * ```
   */
  getUserCookie: async (): Promise<User_Info | null> => {
    try {
      const response = await axios.get<User_Info>("/api/cookie/user");

      return response.data;
    } catch (error) {
      console.log("Error Cookie getUserCookie (Unauthorized): " + error);
      return null;
    }
  },

  /**
   *
   * @returns {boolean} true if cleared user cookie else false
   */
  clearUserCookie: async () => {
    try {
      const response = await axios.delete("/api/cookie/user");

      return response.data.success === true;
    } catch (error) {
      console.log("Error Cookie clearUserCookie : " + error);
      return false;
    }
  },
};

export default Cookie;
