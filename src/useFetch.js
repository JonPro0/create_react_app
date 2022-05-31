import {useState, useEffect } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abordCont = new AbortController()

        fetch(url, {signal: abordCont.signal})  
        .then(res => {
            console.log(res)
            if(!res.ok){
                throw Error('could ot fetch the data for this resource')
            }
            return res.json();
        })  
        .then(data => {
            setData(data)
            setIsPending(false)
            setError(null)
        })
        .catch(err => {
            if(err.name === 'AbordError') {
                console.log("Fetch aborted")
            } else {
                setIsPending(false)
                setError(err.message)
            }
        })

        return () => abordCont.abort()
    }, [url])
    return {
        data,
        isPending,
        error
    }
}

export default useFetch