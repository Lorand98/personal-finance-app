export interface ServerSideComponentProps<
    Params = undefined,
    SearchParams = undefined,
> {
    params: Params;
    searchParams: SearchParams;
}