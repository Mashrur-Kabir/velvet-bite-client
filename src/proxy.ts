import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userService } from "./services/userServices/user.service";
import { Roles } from "./constants/userRoles";

// role map
const ROLE_HOME_PAGES: Record<string, string> = {
  [Roles.admin]: "/admin-dashboard",
  [Roles.provider]: "/provider-dashboard",
  [Roles.customer]: "/dashboard",
};

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  // fetch session
  const { data: session } = await userService.getSession();

  // if no session
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathName);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = session.user.role as string;

  // allowed path based on role
  const allowedDashboard = ROLE_HOME_PAGES[userRole];

  if (allowedDashboard && !pathName.startsWith(allowedDashboard)) {
    return NextResponse.redirect(new URL(allowedDashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/provider-dashboard/:path*",
  ],
};
