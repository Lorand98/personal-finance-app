import { useId } from "react";

const useFallbackId = (idParam: string | undefined) => {
  const idGen = useId();
  const id = idParam || idGen;

  return id;
};

export default useFallbackId;
