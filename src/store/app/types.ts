export interface ISidebar {
    open: boolean;
    miniVariant: boolean;
}

export interface IAppState {
    layout: string;
    sidebar: ISidebar;
}
