import cn from "classnames"
import loading from "./loading.module.scss"

const Loading = () => {
    return (
        <span className={cn(loading.spinner)}></span>
    )
}

export default Loading