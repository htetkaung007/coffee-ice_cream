export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/backoffice/:path*"],
}; /* wild card close all parth line in backoffice */
