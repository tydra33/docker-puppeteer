import ImageSliderGrid from "./components/ImageSliderGrid"
import Paginatior from "./components/Paginatior"
import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import './App.css';

function App() {
  const [imgs, setImgs] = useState([])
  const [loading, setLoading] = useState(false)
  const [currPage, setCurrPage] = useState(1)
  const [imgsPerPage, setImgsPerPage] = useState(20)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const tempData = await axios.get("http://localhost:3001/")
      setImgs(tempData.data)
      setLoading(false)

      if (tempData.data.length >= 500) {
        console.log("STOPPING RE-RENDERS")
        clearInterval(intervalId)
      }
    }

    fetchData()

    // set up interval to refetch data every 10 seconds
    // and stop when 500 items have been loaded
    const intervalId = setInterval(fetchData, 10000)
    return () => clearInterval(intervalId)
  }, [])

  const containerStyle = {
    width: "1000px",
    margin: "0 auto"
  }

  // paginator logic
  const indexLastImg = currPage * imgsPerPage
  const indexFirstImg = indexLastImg - imgsPerPage
  const currImgs = useMemo(() => {
    return imgs.slice(indexFirstImg, indexLastImg)
  }, [imgs, indexFirstImg, indexLastImg])

  const paginate = (pageNum: number) => {
    setCurrPage(pageNum)
  }
  return (
    <div >
      <h1>Real Estate - {currPage}</h1>
      <div
        style={containerStyle}
      >
        <ImageSliderGrid sliders={currImgs} loading={loading}></ImageSliderGrid>
      </div>
      <Paginatior
        imgsPerPage={imgsPerPage}
        totalImgs={imgs.length}
        paginate={paginate}
        currPage={currPage}
      ></Paginatior>
    </div>
  )
}

export default App