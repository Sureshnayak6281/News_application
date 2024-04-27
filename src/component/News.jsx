import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country = "in", pageSize = 9, category = "general", setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    updateNews();
  }, [country, pageSize, category]);

  const updateNews = async () => {
    setProgress(10);
    console.log(category);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=9a1e91a593fb4fb3b673bb549df83a93&page=${page}&pageSize=${pageSize}`;

    const data = await fetch(url);
    setProgress(30);
    const parsedData = await data.json();
    setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    setProgress(100);
  };

  const fetchData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=9a1e91a593fb4fb3b673bb549df83a93&page=${page}&pageSize=${pageSize}`;

    const data = await fetch(url);
    const parsedData = await data.json();
    setArticles([...articles, ...parsedData.articles]);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-center">News headlines</h1>
      {loading && <Spinner />} 
      
      <InfiniteScroll
        dataLength={articles.length} 
        next={fetchData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {!loading && articles.map((element, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 9,
  category: "general"
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired
};

export default News;
