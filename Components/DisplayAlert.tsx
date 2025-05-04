import Swal, { SweetAlertOptions } from "sweetalert2";

/**
 * Displays a SweetAlert2 modal with the specified configuration.
 *
 * This utility function wraps `Swal.fire` and enforces some default behavior,
 * such as disabling outside clicks and the escape key to close the modal.
 *
 * @remarks
 * The function applies the following defaults unless overridden:
 * - `allowOutsideClick: false`
 * - `allowEscapeKey: false`
 *
 * @param options - Configuration options for the SweetAlert modal.
 * These include properties like `title`, `text`, `icon`, `showConfirmButton`, `confirmButtonText`, etc.
 * All options conform to the {@link SweetAlertOptions} interface from SweetAlert2.
 *
 * @returns A promise that resolves with the result of the modal interaction.
 * The result includes properties like `isConfirmed`, `isDismissed`, and `value`, as defined in {@link SweetAlertResult}.
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
 * @see {@link https://sweetalert2.github.io/} for full documentation on available options.
 */
export default function DisplayAlert(options: SweetAlertOptions) {
  return Swal.fire({
    allowOutsideClick: false,
    allowEscapeKey: false,
    ...options,
  });
}
