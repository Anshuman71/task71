import React, { useState, useEffect, useCallback } from 'react';
import Loading, { EndOfList } from './components/Loading';
import Card from './components/Card';
import Grid from './components/Grid';
import { LIMIT, DATA_ENDPOINT, IMAGE_ENDPOINT } from './constants';
import { Select, Option, Label } from './components/Control';
import Header from './components/Header';
import './App.css';

function App() {
    const [items, setItems] = useState([]);
    const [buffer, setBuffer] = useState([]);
    const [loading, toggleLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [query, setQuery] = useState({ pageNo: 1, sortBy: 'id' });

    //Fetch products to the main grid list of items
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

    //Fetch products to buffer, to be consumed
    const fetchBuffer = async () => {
        const url = `${DATA_ENDPOINT}?_page=${query.pageNo + 1}&_sort=${
            query.sortBy
        }&_limit=${LIMIT}`;
        const result = await fetch(url);
        const products = await result.json();
        if (products.length < 20) {
            setHasMore(false);
        }
        const src = `${IMAGE_ENDPOINT}?r=${query.pageNo + 1}`;
        setBuffer([...products, src]);
    };

    //Fill the buffer if no data is loading currently
    useEffect(() => {
        if(!loading){
            fetchBuffer();
        }
    }, [loading]);

    //Handle scroll events, fetch new page or consume the buffer if available
    const handleScroll = () => {
        if (
            ((window.scrollY || 1) + window.innerHeight ===
                document.documentElement.offsetHeight) &&
            (hasMore && items.length && !loading)
        ) {
            if(buffer.length){
                setItems(prevState => [...prevState, ...buffer]);
                setBuffer([]);
            } else {
                setQuery(prevState => ({
                    pageNo: prevState.pageNo + 2,
                    sortBy: prevState.sortBy
                }));
            }
        }
    };

    //update the grid to sorted items
    const updateSort = event => {
        setItems([]);
        setQuery({ pageNo: 1, sortBy: event.target.value });
    };

    //Add/remove listener for scroll events
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, false);
        return () => window.removeEventListener('scroll', handleScroll, false);
    });

    //Fetch items to the grid whenever dependencies of fetchItems() changes
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
