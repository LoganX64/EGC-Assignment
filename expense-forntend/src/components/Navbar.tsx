import { useState } from "react";
import { Button } from "./ui/button";
import { KanbanSquare, FileDown, PlusCircle } from "lucide-react";

import { useAppDispatch } from "@/store/hooks";
import { fetchAllTransactions } from "@/features/transactions/transactionSlice";
import { AddEditTransactionDialog } from "./add-edit-transactions-dialog";

export const Navbar = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddSuccess = () => {
    dispatch(fetchAllTransactions({}));
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <KanbanSquare className="h-6 w-6 text-blue-500" />
        <h1 className="text-2xl font-bold font-headline">FinanceFlow</h1>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <Button variant="outline" size="sm">
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>

        <Button
          size="sm"
          className="bg-blue-500 hover:bg-blue-400"
          onClick={() => setDialogOpen(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      <AddEditTransactionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleAddSuccess}
      />
    </header>
  );
};
