
type Props = {
    modalClass: string,
    modalRef?: React.RefObject<HTMLDivElement>,
    children: any
}

export const Modal: React.FC<Props> = ({ modalClass, children, modalRef }) => {
    return (
        <article ref={modalRef} className={`${modalClass} modal`}>
            {children}
        </article>
    )
}