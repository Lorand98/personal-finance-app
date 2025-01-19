"use server";

import resourceAction from "@/lib/server/resource-action";
import {
  createPot,
  deletePot,
  updatePot,
  updateTotalPot,
} from "@/lib/supabase/data-service";
import { potSchema, potChangeAmount } from "@/lib/validations";
import { PotInsert } from "@/components/pots/types";

export async function createPotAction(pot: PotInsert) {
  return resourceAction({
    data: pot,
    schema: potSchema,
    type: "create",
    fn: createPot,
    revalidatePathRoute: "/pots",
  });
}

export async function editPotAction(pot: PotInsert, id: number) {
  return resourceAction({
    data: pot,
    schema: potSchema,
    type: "update",
    fn: updatePot,
    id,
    revalidatePathRoute: "/pots",
  });
}

export async function editTotalPotAction(
  amount: number,
  totalCurrent: number,
  id: number,
  addition: boolean
) {
  return resourceAction({
    type: "update",
    fn: (supabase, data, id) =>
      updateTotalPot(
        supabase,
        {
          amount: addition ? data.amount : -data.amount,
        },
        id
      ),
    id,
    data: { amount },
    schema: potChangeAmount(totalCurrent),
    revalidatePathRoute: "/pots",
  });
}

export async function deletePotAction(id: number) {
  return resourceAction({
    type: "delete",
    fn: deletePot,
    id,
    revalidatePathRoute: "/pots",
  });
}
