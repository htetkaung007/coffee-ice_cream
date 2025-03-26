export interface Config {
  googleClientId: string;
  googleClientSecreat: string;
  apiBackOfficeUrl: string;
  apiOrederAppUrl: string;
}

export const config: Config = {
  googleClientId: process.env.GOOGLE_CLIENT_ID as string,
  googleClientSecreat: process.env.GOOGLE_CLIENT_SECRET as string,
  apiBackOfficeUrl: process.env.NEXT_PUBLIC_BACK_OFFICE_API_BASE_URL || "",
  apiOrederAppUrl: process.env.NEXT_PUBLIC_ORDER_APP_API_BASE_URL || "",
};
