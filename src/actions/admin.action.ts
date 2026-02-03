"use server";

import { adminService } from "@/services/adminServices/admin.service";
import { IAdminUpdatePayload } from "@/types";
import { revalidateTag } from "next/cache";

export const getAdminProfileAction = async () =>
  await adminService.getMyProfile();

export const getAllUsersAction = async () => await adminService.getAllUsers();

export const updateAdminProfileAction = async (data: IAdminUpdatePayload) => {
  const res = await adminService.updateProfile(data);
  if (res.data) revalidateTag("admin-profile", "max");
  return res;
};
