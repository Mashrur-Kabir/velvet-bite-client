"use server";

import { publicService } from "@/services/publicServices/public.service"; // Adjust based on your actual public service path
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

export const getAllReviewsAction = async () =>
  await adminService.getAllReviews();

export const toggleReviewVisibilityAction = async (
  id: string,
  isHidden: boolean,
) => {
  const res = await adminService.toggleReviewVisibility(id, { isHidden });
  if (res.data) revalidateTag("platform-reviews", "max");
  return res;
};

export const deleteReviewAction = async (id: string) => {
  const res = await adminService.deleteReview(id);
  revalidateTag("platform-reviews", "max");
  return res;
};

export const getAllOrdersAction = async () => {
  return await adminService.getAllOrders();
};

export const getAdminOrderByIdAction = async (id: string) => {
  return await adminService.getOrderById(id);
};

export const getAllCategoriesAction = async () => {
  const res = await publicService.getCategories({ cache: "no-store" });
  return res;
};
export const createCategoryAction = async (name: string) => {
  const res = await adminService.createCategory({ name });
  if (res.data) revalidateTag("categories", "max");
  return res;
};

export const updateCategoryAction = async (id: string, name: string) => {
  const res = await adminService.updateCategory(id, { name });
  if (res.data) revalidateTag("categories", "max");
  return res;
};
