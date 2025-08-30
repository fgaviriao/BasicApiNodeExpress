import * as yup from "yup";
import { AuthRefreshTokenDto } from "../dtos/AuthRefreshTokenDto";
export const authRefreshTokenSchema: yup.Schema<AuthRefreshTokenDto> =
  yup.object({
    refreshToken: yup.string().required("Refresh Token no proporcionado"),
  });
