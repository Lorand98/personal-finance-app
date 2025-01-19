"use server";

import resourceAction from "@/lib/server/resource-action";
import { createPot, deletePot, updatePot } from "@/lib/supabase/data-service";
import { potSchema } from "@/lib/validations";
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

export async function deletePotAction(id: number) {
  return resourceAction({
    type: "delete",
    fn: deletePot,
    id,
    revalidatePathRoute: "/pots",
  });
}
