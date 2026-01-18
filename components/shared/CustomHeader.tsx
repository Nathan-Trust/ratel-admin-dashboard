import React from 'react'

const CustomHeader = ({ header, icon }: {
  header: string, icon?: React.ReactNode
  
}) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      
      <h1
        className="text-lg font-medium tracking-[-0.3px] text-[#000107]"
        style={{ fontFamily: "Montserrat" }}
      >
        {header}
      </h1>
    </div>
  );
}

export default CustomHeader
