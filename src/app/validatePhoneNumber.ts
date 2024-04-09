"use server";

export async function validatePhoneNumber(
  phoneNumber: string
): Promise<boolean> {
  console.log(phoneNumber);
  return /(\d{3})-(\d{3})-(\d{4})/.test(phoneNumber) ? true : false;
}
