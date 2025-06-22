import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
function Api_handling() {
  //const [products, error, loading, search] = useCustomReact('/api/products')
  //  if (error){
  //   return <h1>Something went wrong</h1>
  //  }
  //  if (loading){
  //   return <h1>Loading....</h1>
  //  }

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await axios.get(
          `/api/products?q=${search}`, 
          {
            signal: controller.signal,
          }
        );

        console.log(response.data); 
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
          return;
        }
        console.error('Actual error:', err);
        setError(true);
        setLoading(false);
      }
    })();

    return () => {
      controller.abort(); //cleaner function
    };
  }, [search]);

  return (
    <>
    <div className='main'><h1>API Lecture</h1></div>
    <input type='text'
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder='type something here...'
    />
    <div>
      {loading && <h2>Loading....</h2>}
      {error && <h2>Something went wrong..</h2>}
      <h2 className='container'>Number of products: {products.length}</h2></div>

    </>
  )
}

export default Api_handling

// const useCustomReact = (url) => {
//    return [products, error, loading]
// }
