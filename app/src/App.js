import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Loading, { EndOfList } from './components/Loading';
import Card from './components/Card';
import Grid from './components/Grid';
import { Select, Option, Label } from './components/Control';
import Header from './components/Header';

const DATA_ENDPOINT = 'http://localhost:8000/api/products';
const IMAGE_ENDPOINT = 'http://localhost:8000/ads/';

const LIMIT = 20;

function App() {
    const [items, setItems] = useState([]);
    const [loading, toggleLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [query, setQuery] = useState({ pageNo: 1, sortBy: 'id' });

    const fetchItems = useCallback(async () => {
        const url = `${DATA_ENDPOINT}?_page=${query.pageNo}&_sort=${
            query.sortBy
        }&_limit=${LIMIT}`;
        toggleLoading(true);
        const result = await fetch(url);
        const products = await result.json();
        if (products.length < 20) {
            setHasMore(false);
        }
        const src = `${IMAGE_ENDPOINT}?r=${query.pageNo}`;
        setItems(prevState =>
            query.pageNo === 1
                ? [...products, src]
                : [...prevState, ...products, src]
        );
        toggleLoading(false);
    }, [query]);

    const handleScroll = () => {
        if (
            ((window.scrollY || 1) + window.innerHeight ===
                document.documentElement.offsetHeight) &&
            (hasMore && items.length && !loading)
        ) {
            setQuery(prevState => ({
                pageNo: prevState.pageNo + 1,
                sortBy: prevState.sortBy
            }));
        }
    };

    const updateSort = event => {
        setItems([]);
        setQuery({ pageNo: 1, sortBy: event.target.value });
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
                    {items.map((emoji, index) =>
                        typeof emoji === 'string' ? (
                            <img
                                alt="ad"
                                key={index}
                                className="ad"
                                src={emoji}
                            />
                        ) : (
                            <Card key={emoji.id} emoji={emoji} />
                        )
                    )}
                </Grid>
            ) : null}
            {!hasMore ? <EndOfList /> : null}
        </div>
    );
}

export default App;
