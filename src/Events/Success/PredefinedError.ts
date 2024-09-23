import { AuthFlowIdentifier, RolesIdentifier } from "@/Constants/structure";
export const DEFAULT_EXECUTED = {
    ERROR : 'Something went wrong',
}
export const TENANT_AUTHENTICATION = (
    user_type_specified: RolesIdentifier,
    auth_type_specified: AuthFlowIdentifier
  ) => {
    const validation_checker = (user_type_specified === RolesIdentifier.ADMIN || user_type_specified === RolesIdentifier.USER)
    if(auth_type_specified === AuthFlowIdentifier.SIGN_IN && validation_checker){
      return `${AuthFlowIdentifier.SIGN_IN} Successfull`;
    }
    if(auth_type_specified === AuthFlowIdentifier.REGISTER_VAR && validation_checker){
      return `${AuthFlowIdentifier.REGISTER_VAR} Successfull`
    }
    return DEFAULT_EXECUTED.ERROR;
  };
  