export interface ServerSideComponentProps<
  Params = undefined,
  SearchParams = undefined
> {
  params: Params;
  searchParams: SearchParams;
}

export interface OptionModalCompProps<T> {
  entity: T;
  onClose: () => void;
}

export type ColumnMeta = {
  hideOnMobile?: boolean;
};
