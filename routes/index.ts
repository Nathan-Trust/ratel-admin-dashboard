export class AdminRoutes {
  static INDEX = "/";
  static LOGIN = "/login";
  static DASHBOARD = "/dashboard";
  static USERS = "/users";
  static GIFT_CARD = "/gift-card";
  static TRANSACTIONS = "/transactions";
  static FINANCE = "/finance";
  static FINANCE_REVENUE_BREAKDOWN = "/finance/revenue-breakdown";
  static SETTINGS = "/settings";

  static publicRoutes = [AdminRoutes.LOGIN];

  static authenticatedRoutes = [
    AdminRoutes.DASHBOARD,
    AdminRoutes.USERS,
    AdminRoutes.GIFT_CARD,
    AdminRoutes.TRANSACTIONS,
    AdminRoutes.FINANCE,
    AdminRoutes.FINANCE_REVENUE_BREAKDOWN,
    AdminRoutes.SETTINGS,
  ];

  static isPublicRoute(pathname: string): boolean {
    return this.publicRoutes.some((route) => pathname.startsWith(route));
  }

  static isAuthenticatedRoute(pathname: string): boolean {
    return this.authenticatedRoutes.some((route) => pathname.startsWith(route));
  }
}
