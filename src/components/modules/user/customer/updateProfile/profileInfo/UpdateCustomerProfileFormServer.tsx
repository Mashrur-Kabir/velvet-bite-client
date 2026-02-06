import { getMyProfileAction } from "@/actions/customer.action";
import UpdateCustomerProfileFormClient from "./UpdateCustomerProfileFormClient";
import { AlertCircle } from "lucide-react";

export default async function UpdateCustomerProfileFormServer() {
  const { data: user, error } = await getMyProfileAction();

  if (error || !user) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-dashed border-caramel/20 rounded-3xl bg-black/10 text-center">
        <AlertCircle className="text-caramel size-10 mb-4" />
        <p className="text-cream italic">
          The archives could not be reached. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="mb-8 pl-4 border-l-2 border-caramel">
        <h1 className="text-2xl font-bold text-cream tracking-widest uppercase">
          Identity <span className="text-caramel">Archives</span>
        </h1>
        <p className="text-caramel/50 text-xs italic">
          Update your presence in the Velvet community.
        </p>
      </div>
      <UpdateCustomerProfileFormClient user={user} />
    </div>
  );
}
