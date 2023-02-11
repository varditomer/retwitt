
type Props = {
    modalClass: string,
    children: any
}

export const Modal: React.FC<Props> = ({ modalClass, children }) => {
    return (
        <article className={`${modalClass} modal`}>
            {children}
        </article>
    )
}