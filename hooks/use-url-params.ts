import { usePathname, useSearchParams } from "next/navigation";

const useUrlParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateUrlParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "") {
      params.delete(key);
      history.pushState({}, "", `${pathname}?${params.toString()}`);
      return;
    }

    params.set(key, value);
    history.pushState({}, "", `${pathname}?${params.toString()}`);
  };

  return {
    updateUrlParams,
  };
};

export default useUrlParams;
