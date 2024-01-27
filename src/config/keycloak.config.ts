import {KeycloakConfigDTO} from "./dto/config.dto";
import * as process from "process";

export default {
    BASE_URL : process.env.KEYCLOAK_BASE_URL,
    REALM:process.env.KEYCLOAK_REALM,
    CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
    CLIENT_SECRET :process.env.KEYCLOAK_CLIENT_SECRET,
} as KeycloakConfigDTO;
