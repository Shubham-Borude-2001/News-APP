import React from "react";

const NewsItem = (props) => {
  
    const { title, imageUrl, newsUrl, author, date, source } = props;

    return (
      <div>
        <section>
          <div className=" my-3 card">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                position: "absolute",
                right: "0",
              }}
            >
              <span className="position-absolute translate-middle badge rounded-pill bg-danger">
                {source}
              </span>
            </div>
            <img
              src={
                imageUrl
                  ? imageUrl
                  : "https://images.moneycontrol.com/static-mcnews/2021/09/Byjus-770x433.jpg"
              }
              className="card-img-top"
              alt="News Thumbnail"
            />
            <div className="card-body">
              <h5 className="card-title p-0">{title}</h5>
              <p className="card-text">
                <small className="text-muted">
                  By {author ? "author" : "Unknown"} on {new Date(date).toGMTString()}
                </small>
              </p>
              <a
                href={newsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-dark"
                style={{ fontFamily: "serif" }}
              >
                Read Description
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  
}

export default NewsItem;
