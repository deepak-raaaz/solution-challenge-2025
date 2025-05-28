import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Test from "./test";

interface ConfirmationDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
  }
  
  const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    isOpen,
    onOpenChange,
    onConfirm,
  }) => {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange} >
        <DialogContent className="max-w-5xl max-md:max-w-[90%] max-h-[90vh] overflow-y-auto max-md:rounded-lg ">
          <Test onOpenChange={onOpenChange}  onConfirm={onConfirm}/>
        </DialogContent>
      </Dialog>
    );
  };


export default ConfirmationDialog;