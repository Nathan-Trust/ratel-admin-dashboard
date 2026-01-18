export type MetaKeys = "errCode";
export type Meta = Record<MetaKeys, string>;

export type ErrorValue = {
  message: string;
  type: string;
};

export const queryText = (message: string) => `Failed to fetch ${message}`;

export class QueryKeys {
  // Users
  static readonly Get_User = "get_user";
  static readonly Get_Transactions = "get_transactions";
  static readonly Get_Wallet_Transactions = "get_wallet_transactions";

  // Vendor
  static readonly Get_Vendor_List = "get_vendor";
  static readonly Get_Restock_Order = "get_restock_order";
  static readonly Get_Client_List = "get_client_list";
  static readonly Get_Insight_List = "get_insight_list";
  static readonly Get_Delivery_List = "get_delivery_list";

  // Alerts
  static readonly Get_Alerts = "get_alerts";

  // Services
  static readonly Get_Isps = "get_isps";
  static readonly Get_Data_Plans = "get_data_plans";
  static readonly Get_Electricity_Providers = "get_electricity_providers";
  static readonly Get_CableTV_Providers = "get_cabletv_providers"; // Added cabletv providers
  static readonly Get_GiftCard_Countries = "get_giftcard_countries";
  static readonly Get_GiftCards = "get_giftcards";
  static readonly Get_GiftCard_Price = "get_giftcard_price";
  static readonly Get_Internet_Providers = "get_internet_providers";
  static readonly Get_Esim_Countries = "get_esim_countries";
  static readonly Get_Esim_Packages = "get_esim_packages";

  // Subscription Services
  static readonly Get_Wallet_Balance = "get_wallet_balance";
  static readonly Get_Service_Categories = "get_service_categories";
  static readonly Get_Services_By_Category = "get_services_by_category";
  static readonly Get_Service_Variations = "get_service_variations";

  // --- NEW: Bus Service Query Keys ---
  static readonly Get_Bus_States = "get_bus_states";
  static readonly Get_My_Bus_Bookings = "get_my_bus_bookings";
  static readonly View_Bus_Order = "view_bus_order";
  static readonly Search_Bus_Trips = "search_bus_trips"; // New
  static readonly Request_Bus_Trip = "request_bus_trip"; // New

  //Transactions
  static readonly Process_Transaction = "process_transaction";
  static readonly Validate_Tag = "validate_tag"; // New addition
  static readonly Get_Banks = "GET_BANKS"; // Add this
  static readonly Get_Support = "GET SUPPORT";
  static readonly Get_Tickets = "GET_TICKETS";

  static readonly Get_Reports = "get_reports";
  static readonly Get_App_Settings = "get-app-settings";
  // Leaderboard
  static readonly Get_Leaderboard = "get_leaderboard";
  static readonly Get_Leaderboard_Prizes = "get_leaderboard_prizes";
  // Flight and Airport
  static readonly Search_Airport = "search_airport";
  static readonly Search_Flight = "search_flight";
  static readonly Search_Single_Flight = "search_single_flight";
  // Store
  static readonly Get_All_Store = "get_all_store";
  static readonly Get_My_Store = "get_my_store";
  static readonly View_Store = "view_store";
  static readonly Get_Store_Products = "get_store_products";
  static readonly Get_Single_Product = "get_single_product";
  static readonly Get_Cart = "get-cart";
  static readonly Get_Delivery_Details = "get-delivery-details";

  // Orders
  static readonly Customer_Orders = "customer-orders";
  static readonly Merchant_Orders = "merchant-orders";

  // education
  static readonly Get_Education_Providers = "get_education_providers";

  //hotel
  static readonly Get_Hotels_List = "get_hotel_list";
  static readonly Get_Hotel_Locations = "get_hotel_locations";
  static readonly Get_Single_Hotel = "get_single_hotel";
  static readonly Get_Selected_Hotel = "get_selected_hotel";
  static readonly Get_Hotel_Details = "get_hotel_details";

  //sochitel
  static readonly Get_Sochitel_By_Country = "Get_Sochitel_By_Country";
  static readonly Get_Single_Sochitel = "Get_Single_Sochitel";

  // Recycling
  static readonly Get_Recycling_Monthly_Stats = "get_recycling_monthly_stats";
  static readonly Get_Recycling_Streak = "get_recycling_streak";

  // Pickup
  static readonly Get_Pickup_Status = "get_pickup_status";
  static readonly Get_Pickup_By_Id = "get_pickup_by_id";
  static readonly Get_My_Pickups = "get_my_pickups";
  static readonly Get_Available_Pickups = "get_available_pickups";
  static readonly Get_Unlocked_Pickups = "get_unlocked_pickups";
  static readonly Get_Pickup_Stats = "get_pickup_stats";
}

// Make sure this is added to the queryCacheOnError to display error correctly.
export class QueryErrCodes {
  static readonly User = queryText("user");
  // vendors
  static readonly RestockOrders = queryText("restock orders");
  static readonly Alerts = queryText("alerts");
  static readonly Vendors = queryText("all vendors");
  static readonly Clients = queryText("all clients");
  static readonly Deliveries = queryText("all deliveries");
  static readonly Insights = queryText("all insights");
  static readonly SingleUser = queryText("single user");
  static readonly UserAnalysis = queryText("user analysis");

  static readonly Socials = queryText("socials");
  static readonly Wallets = queryText("wallets");

  static readonly Notification = queryText("notification");

  static readonly TikTokVideo = queryText("tiktok video");
  static readonly Adverts = queryText("adverts");
  static readonly AdvertsByCreator = queryText("adverts by creator");
  static readonly AdvertsFulfillmentSocials = queryText(
    "adverts fulfillment socials"
  );

  static readonly GetBusStates = queryText("bus states");
  static readonly GetMyBusBookings = queryText("your bus bookings");
  static readonly ViewBusOrder = queryText("bus order details");
  static readonly SearchBusTrips = queryText("bus trips"); // New
  static readonly RequestBusTrip = queryText("bus trip request"); // New

  static readonly Currency = queryText("currency");
  static readonly Pricing = queryText("pricing");
  static readonly Transactions = queryText("transactions");
  static readonly WalletTransactions = queryText("wallet transactions");
  static readonly SupportedBanks = queryText("supported banks");
  static readonly BanksAccounts = queryText("bank accounts");
  static readonly GetCurrentUser = queryText("profile information");

  static readonly AllTransactions = queryText("all transactions");
  static readonly SingleTransaction = queryText("single transaction");
  static readonly UserTransactions = queryText("user transactions");
  static readonly LastFiveUserTransactions = queryText(
    "last five user transactions"
  );
  static readonly UserBanks = queryText("user banks");
  static readonly TransactionAnalysis = queryText("transaction analysis");
  static readonly Process_Transaction = queryText("process transaction");

  // Admin
  static readonly PricingConfig = queryText("pricing config");
  static readonly AdminNotification = queryText("admin notification");
  static readonly WithdrawalRequest = queryText("withdrawal requests");

  //Services
  static readonly Isps = queryText("ISP providers");
  static readonly Data_Plans = queryText("Data plans");
  static readonly Electricity_Providers = queryText("Electricity providers");
  static readonly CableTV_Providers = queryText("CableTV providers"); // Added CableTV providers
  static readonly GiftCard_Countries = queryText("gift card countries");
  static readonly GiftCards = queryText("gift cards");
  static readonly GiftCard_Price = queryText("gift card price");
  static readonly GiftCard_Process = queryText("gift card processing");
  static readonly Internet_Providers = queryText("internet providers");
  static readonly ESim_Countries = queryText("eSIM countries");
  static readonly ESim_Packages = queryText("eSIM packages");
  static readonly Tag_Validation = queryText("tag validation"); // New addition
  static readonly GetBanks = queryText("GET_BANKS_ERROR"); // Add this
  static readonly GetSupport = queryText("get support");
  static readonly GetReports = queryText("get reports ");
  static readonly Tickets = queryText("TICKETS_ERROR");
  static readonly AppSettings = queryText("app settings");

  // Subscription Services
  static readonly WalletBalance = queryText("wallet balance");
  static readonly ServiceCategories = queryText("service categories");
  static readonly ServicesByCategory = queryText("services by category");
  static readonly ServiceVariations = queryText("service variations");
  // Leaderboard
  static readonly Leaderboard = queryText("leaderboard");
  static readonly LeaderboardPrizes = queryText("leaderboard prizes");
  // Flight and Airport
  static readonly Search_Airport = queryText("airport search");
  static readonly Search_Flight = queryText("flight search");
  static readonly Search_Single_Flight = queryText("single flight search");
  // Store
  static readonly GetAllStore = queryText("all store");
  static readonly GetMyStore = queryText("your store");
  static readonly ViewStore = queryText("store");
  static readonly GetStoreProducts = queryText("store products");
  static readonly GetSingleProduct = queryText("single product");
  static readonly GetCart = queryText("get cart");

  static readonly CustomerOrders = queryText("customer orders");
  static readonly MerchantOrders = queryText("merchant orders");

  //education
  static readonly EducationProviders = queryText("education providers");

  //hotels
  static readonly Hotels = queryText("hotels");
  static readonly RecyclingMonthlyStats = queryText("recycling monthly stats");
  static readonly RecyclingStreak = queryText("recycling streak");

  // Pickup
  static readonly PickupStatus = queryText("pickup status");
  static readonly PickupById = queryText("pickup details");
  static readonly AvailablePickups = queryText("available pickups");
  static readonly UnlockedPickups = queryText("unlocked pickups");
  static readonly PickupStats = queryText("pickup stats");
}
