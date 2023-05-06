import { useEffect, useState } from "react"
import {Routes,Route, BrowserRouter} from "react-router-dom";
// import Folder from "./components/folder"
import { Storage } from "@plasmohq/storage";
import List from "./components/folder"
import Folder from "./components/folder2";
function IndexPopup() {
  const [currenturl, setcurrenturl] = useState("")
  const storage = new Storage()

  const getcurrenturl = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    setcurrenturl(tab.url)
  }
  useEffect(() => {
    getcurrenturl()
  }, [])

  return (
    <>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h2>
        You are at {currenturl}
      </h2>
    </div>

      {/* <Routes>
          <Route path='/folder/:foldername' element={<List/>} />
      </Routes> */}
    <Folder current={currenturl}/>
    </>
  )
}

export default IndexPopup
