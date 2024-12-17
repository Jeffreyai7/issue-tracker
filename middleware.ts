import { NextRequest } from "next/server";
import { auth } from "@/app/auth";
import authConfig from "./app/auth.config";
export { auth as middleware } from "@/app/auth";

export const config = {
  matcher: ["/issues/new", "/issues/edit/:id*"],
};

export default async function middleware(req: NextRequest) {
  console.log("Middleware triggered for", req.url);
  // Check the session or user authentication status
}
