import { useState, useEffect, useMemo } from "react";
import { RoleAdapter } from "../../../core/infrastructure/adapters/RoleAdapter";
import type { GenericItemName } from "../../../shared/types/common";

export const useRoles = () => {
  const [roles, setRoles] = useState<GenericItemName[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roleAdapter = useMemo(() => new RoleAdapter(), []);

  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await roleAdapter.getAvailablePublicRoles();

        if (result.succeeded && result.items) {
          setRoles(result.items);
        } else {
          throw new Error(result.message || "Error al cargar los roles");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error al cargar los roles";
        setError(errorMessage);
        console.error("Error fetching roles:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoles();
  }, [roleAdapter]);

  return {
    roles,
    isLoading,
    error,
  };
};

