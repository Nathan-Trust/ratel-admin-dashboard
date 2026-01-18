"use client";

import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Ban, CheckCircle, Copy } from "lucide-react";
import { useState } from "react";
import {
  useUser,
  useUserBanks,
  useUserWallets,
  useToggleBanUser,
} from "@/hooks/use-users";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomTable from "@/components/shared/CustomTable";
import { CustomTableSkeleton } from "@/components/shared/CustomTableSkeleton";
import { FetchLoadingAndEmptyState } from "@/components/shared/FetchLoadinAndEmptyState";
import { AdminUser, UserBank, UserWallet } from "@/models/admin";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replaceAll("/", "-");
};

const formatCurrency = (amount: string | number) => {
  const num = typeof amount === "string" ? Number.parseFloat(amount) : amount;
  return `₦${num.toLocaleString()}`;
};

const copyToClipboard = (text: string, label: string) => {
  navigator.clipboard.writeText(text);
  toast.success(`${label} copied to clipboard`);
};

// Sub-components to reduce cognitive complexity
const LoadingSkeleton = () => (
  <main className="w-full max-w-[1100px] pb-6">
    <div className="flex items-center gap-3 mb-6">
      <Skeleton className="w-8 h-8 rounded-full" />
      <Skeleton className="w-48 h-7" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Skeleton className="h-[300px] rounded-2xl" />
      <Skeleton className="h-[300px] rounded-2xl" />
    </div>
  </main>
);

const UserNotFound = ({ onBack }: { onBack: () => void }) => (
  <main className="w-full max-w-[1100px] pb-6">
    <div className="flex items-center gap-3 mb-6">
      <button
        onClick={onBack}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-[#1F1F1F]" />
      </button>
      <h1 className="text-xl font-semibold font-montserrat text-[#1F1F1F]">
        User Not Found
      </h1>
    </div>
    <p className="text-gray-500">
      The user you are looking for does not exist.
    </p>
  </main>
);

const BasicInfoCard = ({
  user,
  isActive,
}: {
  user: AdminUser;
  isActive: boolean;
}) => (
  <Card className="rounded-2xl border-grey-border">
    <CardHeader className="pb-4">
      <CardTitle className="text-lg font-semibold font-montserrat">
        Basic Information
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Name</span>
        <span className="text-sm font-medium">{user.name}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Email</span>
        <span className="text-sm font-medium">{user.email}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Role</span>
        <Badge variant="outline" className="capitalize">
          {user.role}
        </Badge>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Status</span>
        <Badge variant={isActive ? "default" : "destructive"}>
          {isActive ? "Active" : "Banned"}
        </Badge>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Reference</span>
        <span className="text-sm font-medium">{user.reference}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Joined</span>
        <span className="text-sm font-medium">
          {formatDate(user.created_at)}
        </span>
      </div>
    </CardContent>
  </Card>
);

const FinancialInfoCard = ({
  user,
  banksCount,
  walletsCount,
}: {
  user: AdminUser;
  banksCount: number;
  walletsCount: number;
}) => (
  <Card className="rounded-2xl border-grey-border">
    <CardHeader className="pb-4">
      <CardTitle className="text-lg font-semibold font-montserrat">
        Financial Information
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Balance</span>
        <span className="text-sm font-medium text-teal">
          {formatCurrency(user.balance)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Commission</span>
        <span className="text-sm font-medium">
          {formatCurrency(user.commission)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Total Banks</span>
        <span className="text-sm font-medium">{banksCount}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">Total Wallets</span>
        <span className="text-sm font-medium">{walletsCount}</span>
      </div>
    </CardContent>
  </Card>
);

// Table configurations
const bankHeaders = ["BANK NAME", "ACCOUNT NAME", "ACCOUNT NUMBER", "STATUS"];
const bankHeaderKeyMap = {
  "BANK NAME": "bankName",
  "ACCOUNT NAME": "accountName",
  "ACCOUNT NUMBER": "accountNumber",
  STATUS: "status",
};

const walletHeaders = ["COIN", "SYMBOL", "ADDRESS", "BALANCE", "STATUS"];
const walletHeaderKeyMap = {
  COIN: "coin",
  SYMBOL: "symbol",
  ADDRESS: "address",
  BALANCE: "balance",
  STATUS: "status",
};

const transformBanksData = (banks: UserBank[]) =>
  banks.map((bank) => ({
    bankName: bank.bankName,
    accountName: bank.accountName,
    accountNumber: (
      <div className="flex items-center gap-2">
        <span>{bank.accountNumber}</span>
        <button
          onClick={() => copyToClipboard(bank.accountNumber, "Account number")}
          className="text-gray-500 hover:text-gray-700"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
    ),
    status: (
      <Badge variant={bank.status === 1 ? "default" : "secondary"}>
        {bank.status === 1 ? "Active" : "Inactive"}
      </Badge>
    ),
  }));

const transformWalletsData = (wallets: UserWallet[]) =>
  wallets.map((wallet) => ({
    coin: (
      <div className="flex items-center gap-2">
        <img
          src={wallet.image}
          alt={wallet.coin}
          className="w-6 h-6 rounded-full"
        />
        <span>{wallet.coin}</span>
      </div>
    ),
    symbol: wallet.symbol,
    address: (
      <div className="flex items-center gap-2">
        <span className="max-w-[150px] truncate">{wallet.address}</span>
        <button
          onClick={() => copyToClipboard(wallet.address, "Wallet address")}
          className="text-gray-500 hover:text-gray-700"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
    ),
    balance: wallet.balance,
    status: (
      <Badge variant={wallet.status === 1 ? "default" : "secondary"}>
        {wallet.status === 1 ? "Active" : "Inactive"}
      </Badge>
    ),
  }));

const EmptyBanksState = () => (
  <Card className="rounded-2xl border-grey-border">
    <CardContent className="py-12 text-center">
      <p className="text-gray-500">No banks linked to this account</p>
    </CardContent>
  </Card>
);

const EmptyWalletsState = () => (
  <Card className="rounded-2xl border-grey-border">
    <CardContent className="py-12 text-center">
      <p className="text-gray-500">No crypto wallets linked to this account</p>
    </CardContent>
  </Card>
);

const UserDetailClient = () => {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const [showBanDialog, setShowBanDialog] = useState(false);

  const { data: userData, isLoading: isLoadingUser } = useUser(userId);
  const { data: banksData, isLoading: isLoadingBanks } = useUserBanks(userId);
  const { data: walletsData, isLoading: isLoadingWallets } =
    useUserWallets(userId);
  const { mutate: toggleBan, isPending: isBanning } = useToggleBanUser();

  const user = userData?.data?.[0];
  const banks = banksData?.data?.flat() || [];
  const wallets = walletsData?.data || [];

  const isActive = user?.status === 1;

  const handleBanToggle = () => {
    toggleBan(userId, {
      onSuccess: () => setShowBanDialog(false),
    });
  };

  const banksTableData = transformBanksData(banks);
  const walletsTableData = transformWalletsData(wallets);

  if (isLoadingUser) {
    return <LoadingSkeleton />;
  }

  if (!user) {
    return <UserNotFound onBack={() => router.back()} />;
  }

  return (
    <main className="w-full max-w-[1100px] pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#1F1F1F]" />
          </button>
          <h1 className="text-xl font-semibold font-montserrat text-[#1F1F1F]">
            User Details
          </h1>
        </div>
        <Button
          variant={isActive ? "destructive" : "default"}
          onClick={() => setShowBanDialog(true)}
          disabled={isBanning}
        >
          {isActive ? (
            <>
              <Ban className="w-4 h-4 mr-2" />
              Ban User
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Unban User
            </>
          )}
        </Button>
      </div>

      {/* User Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <BasicInfoCard user={user} isActive={isActive} />
        <FinancialInfoCard
          user={user}
          banksCount={banks.length}
          walletsCount={wallets.length}
        />
      </div>

      {/* Banks and Wallets Tabs */}
      <Tabs defaultValue="banks" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="banks">Banks ({banks.length})</TabsTrigger>
          <TabsTrigger value="wallets">Wallets ({wallets.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="banks">
          <FetchLoadingAndEmptyState
            isLoading={isLoadingBanks}
            numberOfSkeleton={1}
            skeleton={
              <CustomTableSkeleton
                headers={bankHeaders}
                rows={3}
                showViewAll={false}
              />
            }
            data={banks.length}
            emptyState={<EmptyBanksState />}
          >
            <CustomTable
              headers={bankHeaders}
              data={banksTableData}
              headerKeyMap={bankHeaderKeyMap}
              showViewAll={false}
            />
          </FetchLoadingAndEmptyState>
        </TabsContent>

        <TabsContent value="wallets">
          <FetchLoadingAndEmptyState
            isLoading={isLoadingWallets}
            numberOfSkeleton={1}
            skeleton={
              <CustomTableSkeleton
                headers={walletHeaders}
                rows={3}
                showViewAll={false}
              />
            }
            data={wallets.length}
            emptyState={<EmptyWalletsState />}
          >
            <CustomTable
              headers={walletHeaders}
              data={walletsTableData}
              headerKeyMap={walletHeaderKeyMap}
              showViewAll={false}
            />
          </FetchLoadingAndEmptyState>
        </TabsContent>
      </Tabs>

      {/* Ban Confirmation Dialog */}
      <AlertDialog open={showBanDialog} onOpenChange={setShowBanDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isActive ? "Ban User" : "Unban User"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isActive
                ? `Are you sure you want to ban ${user.name}? They will no longer be able to access their account.`
                : `Are you sure you want to unban ${user.name}? They will regain access to their account.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isBanning}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBanToggle}
              disabled={isBanning}
              className={isActive ? "bg-red-600 hover:bg-red-700" : ""}
            >
              {isBanning
                ? "Processing..."
                : isActive
                ? "Ban User"
                : "Unban User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
};

export default UserDetailClient;
