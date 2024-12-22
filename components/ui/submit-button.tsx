import { Loader2 } from "lucide-react";
import { Button } from "./button";

type SubmitButtonProps = {
  text: string;
  submittingText: string;
  isSubmitting: boolean;
};

const SubmitButton = ({
  text,
  submittingText,
  isSubmitting,
}: SubmitButtonProps) => {
  return (
    <Button type="submit" className="w-full p-6" disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {submittingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default SubmitButton;
