import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Loading, { EndOfList } from './components/Loading';
import Card from './components/Card';
import Grid from './components/Grid';
import { Select, Option, Label } from './components/Control';
import Header from './components/Header';

const DATA_ENDPOINT = 'http://localhost:8000/api/products';

const LIMIT = 20;

function App() {
    const [items, setItems] = useState([]);
    const [loading, toggleLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [sortBy, setSortBy] = useState('id');
    const [pageNo, setPageNo] = useState(1);

    const fetchItems = useCallback(async () => {
        const url = `${DATA_ENDPOINT}?_page=${pageNo}&_sort=${sortBy}&_limit=${LIMIT}`;
        toggleLoading(true);
        const result = await fetch(url);
        const products = await result.json();
        if (products.length < 20) {
            setHasMore(false);
        }
        setItems(prevState => [...prevState, ...products]);
        toggleLoading(false);
    }, [pageNo, sortBy]);

    const handleScroll = () => {
        if (
            window.scrollY + window.innerHeight ===
                document.documentElement.offsetHeight &&
            hasMore &&
            !loading
        ) {
                setPageNo(pageNo + 1);
        }
    };

    const updateSort = event => {
        setSortBy(event.target.value);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, false);
        return () => window.removeEventListener('scroll', handleScroll, false);
    });

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);


    return (
        <div className="App">
            <Header>
                <h1>The Emoji Store</h1>
                <div>
                    <Label>Sort By</Label>
                    <Select defaultValue="id" onChange={updateSort}>
                        <Option value="price">Price</Option>
                        <Option value="size">Size</Option>
                        <Option value="id">Id</Option>
                    </Select>
                </div>
            </Header>
            {loading && hasMore ? <Loading bottom /> : null}
            {items.length ? (
                <Grid>
                    {items.map(emoji => (
                        <Card key={emoji.id} emoji={emoji} />
                    ))}
                </Grid>
            ) : null}
            {!hasMore ? <EndOfList /> : null}
        </div>
    );
}

export default App;
