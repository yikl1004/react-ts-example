import { observable, action } from "mobx";


export interface IModal {
    isOpen: boolean
    showModal(): void
    closeModal(): void
}

class Modal implements IModal {
    @observable isOpen: boolean = false;

    @action.bound public showModal(): void {
        this.isOpen = true;
    };

    @action.bound public closeModal(): void {
        this.isOpen = false;
    };
}

export const createModalStore = () => {
    return new Modal();
};