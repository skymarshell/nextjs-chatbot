import DisplayAlert from "@/Components/DisplayAlert";
import Cookie from "./Cookie";

/**
 * A utility object containing validation functions.
 */
const Validator = {
  /**
   * Validates the login input by checking the provided username and password.
   *
   * @param username - The username provided by the user.
   * @param password - The password provided by the user.
   * @returns A boolean indicating whether the input is valid.
   *
   * @remarks
   * - If either the username or password is missing, an alert is displayed with a warning message.
   * - If the password is not equal to "123", an alert is displayed with a warning message.
   * - If the input passes all checks, the function returns `true`.
   *
   * @throws Logs an error to the console if an exception occurs during validation.
   */
  Login_Input: (username: string, password: string): boolean => {
    try {
      if (!username || !password) {
        DisplayAlert({
          text: "โปรดกรอกข้อมูลให้ครบถ้วน",
          icon: "warning",
        });
        return false;
      }

      if (password !== "123") {
        DisplayAlert({
          text: "รหัสผ่านต้องเท่ากับ 123 เท่านั้น",
          icon: "warning",
        });
        return false;
      }

      return true;
    } catch (error) {
      console.log("Error Validator Login_Input : " + error);
      return false;
    }
  },



/**
 * Checks whether the user is logged in based on the presence of a username in the cookie.
 * 
 * @returns {Promise<boolean>} true if logged in, false otherwise
 */
  IsLoggedIn: async (): Promise<boolean> => {
    try {
      const response = await Cookie.getUserCookie();
      return !!response?.username;
    } catch (error) {
      console.log("Error Validator IsLoggedIn : " + error);
      return false;
    }
  },
};

export default Validator;
