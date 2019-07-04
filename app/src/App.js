import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Loading from './components/Loading';
import Card from './components/Card';
import Grid from './components/Grid';
import { Select, Option, Label } from './components/Control';

const DATA_ENDPOINT = 'http://localhost:8000/api/products';

const LIMIT = 20;

function App() {
    const [items, setItems] = useState([]);
    const [loading, toggleLoading] = useState(true);
    const [buffer, setBuffer] = useState([]);
    const [sortBy, setSortBy] = useState('id');
    const [pageNo, setPageNo] = useState(0);

    const fetchItems = useCallback(async () => {
        const order = sortBy === 'date' ? 'desc' : 'asc';
        const url = `${DATA_ENDPOINT}?_sort=${sortBy}&_order=${order}&_page=${pageNo}&_limit=${LIMIT}`;
        toggleLoading(true);
        const result = await fetch(url);
        const products = await result.json();
        setItems(products);
        console.log({ url, products });
        toggleLoading(false);
    }, [sortBy, pageNo]);

    const updateSort = event => {
        setSortBy(event.target.value);
    };

    useEffect(() => {
        fetchItems();
    }, [fetchItems, sortBy]);

    return (
        <div className="App">
            <h1>The Emoji Store</h1>
            <Label>Sort By</Label>
            <Select value={sortBy} onChange={updateSort}>
                <Option value="price">Price</Option>
                <Option value="size">Size</Option>
                <Option selected value="id">
                    Id
                </Option>
            </Select>
            {loading ? (
                <Loading />
            ) : (
                <Grid>
                    {items.length
                        ? items.map(emoji => (
                              <Card key={emoji.id} emoji={emoji} />
                          ))
                        : null}
                    <Loading bottom />
                </Grid>
            )}
        </div>
    );
}

export default App;
