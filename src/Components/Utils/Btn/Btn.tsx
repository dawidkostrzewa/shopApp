import { Link } from "react-router-dom"
import Style from './Btn.module.scss'


const Btn = ({ web, children }: { web: string, children: React.ReactNode }) => {
    return (
        <Link className={Style.wrapBtn} to={web}>{children}</Link>
    )
}

export default Btn

export const BtnIcon = ({ web, children }: { web: string, children: React.ReactNode }) => {
    return (
        <Link className={Style.btnIcon} to={web}>{children}</Link>
    )
}

