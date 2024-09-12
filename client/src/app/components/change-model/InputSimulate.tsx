import React from 'react'

type InputSimulateProps = {
  value: string
}

const InputSimulate = ({value} : InputSimulateProps ) => {
  return (
    <div className="flex text-sm pl-4 items-center font-semibold text-center border rounded-lg w-[200px] bg-white h-[38px]">
      {value}
    </div>
  )
}

export default InputSimulate