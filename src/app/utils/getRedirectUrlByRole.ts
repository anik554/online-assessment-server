export const getRedirectUrlByRole = (role: string) => {
  switch (role) {
    case "EMPLOYER":
      return "/employer/dashboard";
    case "CANDIDATE":
      return "/candidate/dashboard";
    default:
      return "/";
  }
};
