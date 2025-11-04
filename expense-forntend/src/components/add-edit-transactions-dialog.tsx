import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TransactionForm from "@/components/TransactionForm";
import type { Transaction } from "@/features/types/types";

interface AddEditTransactionDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  transaction?: Transaction;

  onSuccess?: () => void;
}

export const AddEditTransactionDialog = ({
  open,
  onOpenChange,
  transaction,
  onSuccess,
}: AddEditTransactionDialogProps) => {
  const handleClose = () => {
    onOpenChange(false);
  };

  const handleFormSuccess = () => {
    handleClose();
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {transaction ? "Edit Transaction" : "Add New Transaction"}
          </DialogTitle>
          <DialogDescription>
            {transaction
              ? "Update the transaction details below."
              : "Fill in the details to add a new transaction."}
          </DialogDescription>
        </DialogHeader>

        <TransactionForm
          existingTransaction={transaction}
          onClose={handleFormSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};
