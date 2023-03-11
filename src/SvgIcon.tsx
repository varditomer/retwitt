// React / Redux
import { MouseEventHandler } from "react"
// Custom hooks
import { useDynamicSvgImport } from "./hooks/useDynamicSvgImport"


interface IProps {
  iconName: string
  wrapperStyle?: string
  svgProp?: React.SVGProps<SVGSVGElement>
  handleClick?: MouseEventHandler<HTMLDivElement>
}

export const SvgIcon: React.FC<IProps> = ({ iconName, wrapperStyle, svgProp, handleClick }) => {

  const { loading, SvgIcon } = useDynamicSvgImport(iconName)
  
  return (
    <>
      {loading && (
        <div className="rounded-full bg-slate-400 animate-pulse h-8 w-8"></div>
      )}
      {SvgIcon && (
        <div className={wrapperStyle} onClick={handleClick}>
          <SvgIcon {...svgProp} />
        </div>
      )}
    </>
  )
}
