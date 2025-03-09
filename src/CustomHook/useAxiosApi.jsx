import axios from 'axios';
import React, { useEffect, useState } from 'react'

function useAxiosApi(url) {

    let [filterData, setFilterData] = useState([]);
    useEffect(() => {
        axios.get(url)
            .then((resp) => {
                console.log(resp.data, "resp")
                setFilterData(resp.data)
            })
    }, [url])

  return filterData 
}

export default useAxiosApi