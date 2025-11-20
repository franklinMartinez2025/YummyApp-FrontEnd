export type LayoutType = 'public' | 'private' | 'auth' | 'admin';

export interface LayoutConfig {
  type: LayoutType;
  showHeader?: boolean;
  showFooter?: boolean;
  showSidebar?: boolean;
  requireAuth?: boolean;
  allowedRoles?: string[];
}

