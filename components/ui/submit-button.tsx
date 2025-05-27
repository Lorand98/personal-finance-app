import { Loader2 } from "lucide-react";
import { Button } from "./button";

type SubmitButtonProps = {
  text: string;
  submittingText: string;
  isSubmitting: boolean;
  ref?: React.RefObject<HTMLButtonElement>;
};

const SubmitButton = ({
  text,
  submittingText,
  isSubmitting,
  ref,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className="w-full p-6"
      disabled={isSubmitting}
      ref={ref}
    >
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
