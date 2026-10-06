import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermissionService } from '../services/permission.service';

export const permissionGuard: CanActivateFn = (route, state) => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  // Check if current route is explicitly permitted for the active role
  const isAllowed = permissionService.isRouteAllowed(state.url);

  if (!isAllowed) {
    // Deny access completely: do not expose the page or data, redirect safely to dashboard
    router.navigate(['/dashboard'], { replaceUrl: true });
    return false;
  }

  return true;
};
