"use client";

import BaseDialog from "@/components/modals/base-dialog";
import { useDialog } from "@/hooks/use-dialog";
import { THEME_CODES, TOAST_MESSAGES } from "@/lib/constants";
import useSWR from "swr";
import PotForm from "./pot-form";
import { Pot } from "./types";
import { OptionModalCompProps } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EditPot({
  entity: pot,
  onClose,
}: OptionModalCompProps<Pot>
) {
  const { open, setOpen, handleSuccess } = useDialog(
    TOAST_MESSAGES.POT_UPDATED
  );

  const {
    data: optionsData,
    error: optionsError,
    isLoading: optionsLoading,
  } = useSWR<{
    availableColors: Array<(typeof THEME_CODES)[number]>;
  }>("/api/pots/available-themes", fetcher);

  const onFormSuccess = () => {
    handleSuccess();
    onClose();
  };

  let dialogContent: React.ReactNode = null;

  if (optionsError) {
    dialogContent = (
      <p className="text-red-500">
        Failed to load data. Please try again later.
      </p>
    );
  } else if (optionsLoading) {
    dialogContent = <p>Loading data...</p>;
  } else if (optionsData) {
    const { availableColors } = optionsData;

    const colors = new Set(availableColors);
    colors.add(pot.theme);

    dialogContent = (
      <PotForm
        pot={{ ...pot }}
        availableColors={Array.from(colors)}
        onSuccess={onFormSuccess}
      />
    );
  }

  return (
    <BaseDialog
      open={open}
      onOpenChange={setOpen}
      buttonLabel="Edit Pot"
      dialogTitle="Edit Pot"
      dialogDescription="Update a previously created pot."
      dialogTriggerButtonProps={{
        variant: "ghost",
        className: "w-full text-left justify-start",
      }}
    >
      {dialogContent}
    </BaseDialog>
  );
}
