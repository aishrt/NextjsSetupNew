import { isEmpty } from "@/utils/isEmpty";

export const isOnboarded = (user: any) => {
  return !(isEmpty(user) || (!isEmpty(user) && !user.is_onboarded));
};