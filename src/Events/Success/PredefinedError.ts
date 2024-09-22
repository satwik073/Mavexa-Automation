import { AuthFlowIdentifier, RolesIdentifier } from "@/Constants/structure";
export const DEFAULT_EXECUTED = {
    ERROR : 'Something went wrong',
}
export const TENANT_AUTHENTICATION = (
    user_type_specified: RolesIdentifier,
    auth_type_specified: AuthFlowIdentifier
  ) => {
    if (user_type_specified === RolesIdentifier.USER) {
      if (auth_type_specified === AuthFlowIdentifier.REGISTER_VAR) {
        return `${RolesIdentifier.USER} ${AuthFlowIdentifier.REGISTER_VAR}ed Successfully`;
      } else if (auth_type_specified === AuthFlowIdentifier.SIGN_IN) {
        return `${RolesIdentifier.USER} ${AuthFlowIdentifier.SIGN_IN} Successful`;
      }
    } else if (user_type_specified === RolesIdentifier.ADMIN) {
      if (auth_type_specified === AuthFlowIdentifier.REGISTER_VAR) {
        return `${RolesIdentifier.ADMIN} ${AuthFlowIdentifier.REGISTER_VAR}ed Successfully`;
      } else if (auth_type_specified === AuthFlowIdentifier.SIGN_IN) {
        return `${RolesIdentifier.ADMIN} ${AuthFlowIdentifier.SIGN_IN} Successful`;
      }
    }
    return DEFAULT_EXECUTED.ERROR;
  };
  