import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinners from "./Spinners";
import PropTypes from "prop-types";

const News = (props) => {
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

    

  const updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=3aab69427c034ad5a193613c1d77c3be&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  }


   useEffect(() => {
    document.title = `${capitalizeFirstLetter( props.category)} - NewsMonkey`;
       updateNews();
   }, [])


  const handlePrevClick = async () => {
    setPage(page - 1 );
    updateNews();
  };

  const handleNextClick = async () => {
    setPage(page + 1 );
    updateNews();
  };

  
    return (
      <div className="container ">
        <h2 className="text-center bg-info" style={{marginTop: '6%'}}>
          NewsMonkey- Top {capitalizeFirstLetter(props.category)}{" "}
          Headlines
        </h2>
        {loading && <Spinners />}
        <div className="row my-3">
          {!loading &&
            articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-sm btn-dark"
            onClick={handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-sm btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
 } 

export default News;

News.defaultProps = {
  country: "in",
  pageSize: 12,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};