"use client"

import { useRouter } from "next/navigation"

const BackButton =()=>{
let router= useRouter()
    return (
        <button
        className="blueButton mb-4 mt-0"
        onClick={() => router.back()}
        title="Back"
      >
        <i className="fa-solid fa-arrow-left me-1"></i>
        Back
      </button>
    )
}
export default BackButton