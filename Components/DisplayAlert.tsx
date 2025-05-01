import Swal, { SweetAlertOptions } from "sweetalert2";

/**
 * Displays a SweetAlert2 modal with the specified configuration.
 *
 * This utility function wraps `Swal.fire` and enforces some default behavior,
 * such as disabling outside clicks and the escape key to close the modal.
 *
 * @param {SweetAlertOptions} options - Configuration options for the SweetAlert modal.
 * These include properties like `title`, `text`, `icon`, `showConfirmButton`, `confirmButtonText`, etc.
 * All options are based on the SweetAlert2 API.
 *
 * @returns {Promise<import("sweetalert2").SweetAlertResult<any>>} A promise that resolves with the result
 * of the modal (e.g., whether it was confirmed, dismissed, or input was entered).
 *
 * @example
 * ```ts
 * DisplayAlert({
 *   title: "Validation Error",
 *   text: "โปรดกรอกข้อมูลให้ครบถ้วน", // Please fill in all required fields
 *   icon: "warning",
 * });
 * ```
 *
 * @see https://sweetalert2.github.io/ for full documentation on available options.
 */
export default function DisplayAlert(options: SweetAlertOptions) {
  return Swal.fire({
    allowOutsideClick: false,
    allowEscapeKey: false,
    ...options,
  });
}
