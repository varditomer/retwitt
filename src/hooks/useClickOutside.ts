// React / Redux
import { RefObject, useEffect } from "react"

type Props = {

}

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
    modalRef: RefObject<T>,
    cb: Function,
    modalTriggerRef?: RefObject<T>,
    mobileTriggerRef?: RefObject<T>
) => {
    useEffect(() => {
        let handler = (ev: any) => {
            if (!modalTriggerRef?.current?.contains(ev.target) || !mobileTriggerRef?.current?.contains(ev.target) && !modalRef.current?.contains(ev.target))  {
                cb
            }
        }

        document.addEventListener("click", handler)


        return () => {
            document.removeEventListener("click", handler)
        }

    })
}
