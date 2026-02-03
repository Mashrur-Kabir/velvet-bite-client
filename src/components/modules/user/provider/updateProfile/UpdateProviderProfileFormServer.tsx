import { providerService } from "@/services/providerServices/provider.service";
import UpdateProviderProfileFormClient from "./UpdateProviderProfileFormClient";

export default async function UpdateProviderProfileFormServer() {
  const { data: provider } = await providerService.getMyProvider();
  if (!provider) return null;

  return <UpdateProviderProfileFormClient provider={provider} />;
}
