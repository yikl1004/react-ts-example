import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { observer } from "mobx-react";
import './ModalContainer.scss';
import { useModal } from 'store/mobx';
import { IModal } from 'store/mobx/modal';


const ModalContainer = (props: {[key: string]: any}): JSX.Element | null => {
    
    const el: HTMLElement = document.querySelector('#root') as HTMLElement;
    const modals: IModal = useModal();

    useEffect(() => {
        document.body.appendChild(el as HTMLElement);
        console.log('like DidMount  props.children', props.children);

        return () => {
            document.body.removeChild(el as HTMLElement);
            console.log('like WillUnmount');
        };
    }, [el, props.children]);

    const { isOpen, closeModal } = modals;

    return isOpen ? 
        createPortal(
            <div className="modal-container">
                { props.children }
                <button onClick={ closeModal }>닫기</button>
            </div>,
            el
        )
        : null;
};

export default observer(ModalContainer);