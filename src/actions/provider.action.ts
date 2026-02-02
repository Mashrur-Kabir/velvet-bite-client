"use server";

import { providerService } from "@/services/providerServices/provider.service";
import { ICreateProviderPayload } from "@/types";
import { revalidateTag } from "next/cache";

export const createProviderAction = async (data: ICreateProviderPayload) => {
  const res = await providerService.createProvider(data);
  if (res.data) revalidateTag("provider-profile", "max");
  return res;
};

export const getMyProviderAction = async () => {
  return await providerService.getMyProvider();
};
