import type { GenericItemName } from "../../../shared/types/common";
import type { ListedResponse } from "../../../shared/types/api";
import type { IRoleGateway } from "../../domain/gateways/IRoleGateway";
import { apiClient } from "../api/apiClient";

export class RoleAdapter implements IRoleGateway {
  async getAvailablePublicRoles(): Promise<ListedResponse<GenericItemName>> {
    try {
      return await apiClient.get<ListedResponse<GenericItemName>>(
        "/Role/GetAvailablePublicRoles"
      );
    } catch (error) {
      console.error("Error fetching roles:", error);
      return {
        items: [],
        succeeded: false,
        message: "Error fetching roles",
        errors: [],
      };
    }
  }
}
