import { useSearchParams, useRouter, usePathname } from "next/navigation";

const useUrlParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateUrlParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return updateUrlParams;
};

export default useUrlParams;
