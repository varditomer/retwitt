import { RefObject, useEffect } from "react";

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
    modalTriggerRef: RefObject<T>,
    modalRef: RefObject<T>,
    cb: Function
) => {
    useEffect(() => {
        let handler = (ev: any) => {
            if (!modalTriggerRef.current?.contains(ev.target) && !modalRef.current?.contains(ev.target))  {
                cb()
            }
        };

        document.addEventListener("click", handler);


        return () => {
            document.removeEventListener("click", handler);
        }

    });
}
