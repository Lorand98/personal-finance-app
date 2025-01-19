"use client";

import BaseDialog from "@/components/modals/base-dialog";
import { useDialog } from "@/hooks/use-dialog";
import { THEME_CODES, TOAST_MESSAGES } from "@/lib/constants";
import useSWR, { mutate } from "swr";
import PotForm from "./pot-form";

const fetcher = (
  url: string
): Promise<{
  availableColors: Array<(typeof THEME_CODES)[number]>;
}> => fetch(url).then((res) => res.json());

export default function NewPot() {
  const { open, setOpen, handleSuccess } = useDialog(
    TOAST_MESSAGES.POT_CREATED
  );

  const { data, error, isLoading } = useSWR(
    "/api/pots/available-themes",
    fetcher
  );

  const onFormSuccess = () => {
    mutate("/api/pots/available-themes");
    handleSuccess();
  };

  let dialogContent: React.ReactNode = null;

  if (error) {
    dialogContent = (
      <p className="text-red-500">
        Failed to load avaiable pot themes. Please try again later.
      </p>
    );
  } else if (isLoading) {
    dialogContent = <p>Loading pots...</p>;
  } else if (data) {
    const { availableColors } = data;

    dialogContent = (
      <PotForm onSuccess={onFormSuccess} availableColors={availableColors} />
    );
  }

  return (
    <BaseDialog
      open={open}
      onOpenChange={setOpen}
      buttonLabel="+ Add New Pot"
      dialogTitle="Add New Pot"
      dialogDescription="Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
    >
      {dialogContent}
    </BaseDialog>
  );
}
