import { adminService } from "@/services/adminServices/admin.service";
import UpdateAdminProfileFormClient from "./UpdateAdminProfileFormClient";

export default async function UpdateAdminProfileFormServer() {
  const { data: admin } = await adminService.getMyProfile();
  if (!admin) return null;

  return <UpdateAdminProfileFormClient user={admin} />;
}
