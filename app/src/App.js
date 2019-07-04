import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Loading from './components/Loading';
import Card from './components/Card';
import Grid from './components/Grid';

const DATA_ENDPOINT = 'http://localhost:8000/api/products';

const LIMIT = 20;

function App() {
    const [items, setItems] = useState([]);
    const [loading, toggleLoading] = useState(true);
    const [buffer, setBuffer] = useState([]);
    const [sortBy, setSortBy] = useState('id');
    const [pageNo, setPageNo] = useState(0);

    const fetchItems =  useCallback(async () => {
        toggleLoading(true);
        const result = await fetch(
            `${DATA_ENDPOINT}?_sort=${sortBy}&_page=${pageNo}&_limit=${LIMIT}`
        );
        const products = await result.json();
        setItems(products);
        console.log({products});
        toggleLoading(false);
    }, [sortBy, pageNo]);


    useEffect(() => {
        fetchItems();
    }, [fetchItems, sortBy]);

    return (
        <div className="App">
            <h1>The Emoji Store</h1>
            {
              loading ? <Loading /> : <Grid>
                 { items.length ? items.map((emoji) => 
                     <Card key={emoji.id} emoji={emoji}/>
                     ) : null
                 } 
                <Loading bottom/>
              </Grid>
            }
        </div>
    );
}

export default App;
