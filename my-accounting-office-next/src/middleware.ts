import { TranslateUtils } from "./utils/translateUtils";

export { default } from "next-auth/middleware";

export const config = { matcher: ['/extra', '/dashboard', '/settings'] };

export const translateUtils: TranslateUtils = new TranslateUtils();