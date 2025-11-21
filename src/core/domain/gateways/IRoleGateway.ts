import type { GenericItemName } from "../../../shared/types/common";
import type { ListedResponse } from "../../../shared/types/api";

export interface IRoleGateway {
  /** Obtiene los roles disponibles publicamente */
  getAvailablePublicRoles(): Promise<ListedResponse<GenericItemName>>;
}
