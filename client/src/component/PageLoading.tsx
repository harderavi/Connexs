import { ImSpinner8 } from "react-icons/im"

const PageLoading = () => {
  return (
    <div className="absolute left-0 top-0 flex justify-center items-center h-screen w-screen">
        <ImSpinner8 className="animate-spin" />

    </div>
  )
}

export default PageLoading