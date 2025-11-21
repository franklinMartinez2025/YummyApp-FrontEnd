import type { GenericItemName } from "../../../shared/types/common";
import type { ListedResponse } from "../../application/common/api-reponses/listed-response";

export interface IRoleGateway {
  /** Obtiene los roles disponibles publicamente */
  getAvailablePublicRoles(): Promise<ListedResponse<GenericItemName>>;
}
