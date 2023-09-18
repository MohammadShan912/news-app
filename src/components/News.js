import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        contry: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // articles = [
    //     {
    //         "source": {
    //             "id": "news24",
    //             "name": "News24"
    //         },
    //         "author": "news24",
    //         "title": "At least 3 US Marines killed, several injured after aircraft crashes during war games in Australia",
    //         "description": "At least three US Marines have died after an Osprey aircraft crashed on a remote tropical island north of Australia during war games, according to US military officials.",
    //         "url": "https://www.news24.com/news24/world/news/at-least-3-us-marines-killed-several-injured-after-aircraft-crashes-during-war-games-in-australia-20230827",
    //         "urlToImage": "https://cdn.24.co.za/files/Cms/General/d/3726/caf98c02fcc845e3817315f94493ef6c.jpg",
    //         "publishedAt": "2023-08-27T10:39:47",
    //         "content": "<ul><li>At least three US Marines have been reported dead after an Osprey aircraft crashed during drills in Australia.</li><li>The three deceased were among 23 personnel on board – five were transpor… [+3474 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "fox-news",
    //             "name": "Fox News"
    //         },
    //         "author": "Landon Mion",
    //         "title": "US military aircraft carrying more than 20 Marines crashes over Australia, injuring all onboard",
    //         "description": "A military aircraft with more than 20 U.S. Marines onboard crashed Sunday near Melville Island in Australia's Northern Territory. No Australians were involved in the crash.",
    //         "url": "https://www.foxnews.com/world/us-military-aircraft-carrying-about-20-marines-crashes-over-australia-3-injuring-all-onboard",
    //         "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2022/07/GettyImages-1241108751.jpg",
    //         "publishedAt": "2023-08-27T06:50:34Z",
    //         "content": "A military helicopter carrying more than 20 U.S. Marines crashed Sunday morning during an exercise in Australia's Northern Territory, injuring the military personnel onboard, according to officials.\r… [+2626 chars]"
    //     }
    // ]

    constructor(props) {
        super(props);
        console.log(`I'm a constructor from news component.`)
        this.state = {
            // articles: this.articles,
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = 'category' ? `${this.capitalizeFirstLetter(this.props.category)} - NewsMonk` : 'NewsMonk';
    }

    async updateNews() {
        this.props.setProgress(10);
        console.log('cdm');
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(60);
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        // console.log('cdm');
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=45e272b319684494826016f1ffcec203&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false
        // })
        this.updateNews();
    }

    handlePrevClick = async () => {
        // console.log("Previous")
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=45e272b319684494826016f1ffcec203&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // console.log(parsedData);
        // this.setState({
        //     articles: parsedData.articles,
        //     page: this.state.page - 1,
        //     loading: false
        // })
        this.setState({
            page: this.state.page - 1
        })
        this.updateNews();
    }

    handleNextClick = async () => {
        console.log("Next")
        // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        // }
        // else {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=45e272b319684494826016f1ffcec203&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     let data = await fetch(url);
        //     let parsedData = await data.json()
        //     console.log(parsedData);
        //     this.setState({
        //         articles: parsedData.articles,
        //         page: this.state.page + 1
        //     })
        // }

        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=45e272b319684494826016f1ffcec203&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({ loading: true });
        //     let data = await fetch(url);
        //     let parsedData = await data.json()
        //     console.log(parsedData);
        //     this.setState({
        //         articles: parsedData.articles,
        //         page: this.state.page + 1,
        //         loading: false
        //     })
        // }
        this.setState({
            page: this.state.page + 1
        })
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
    };

    render() {
        return (
            <>
                <div className="container my-3" style={{ backgroundColor: '#ECECEC', borderRadius: '7px', padding: '20px 40px' }}>
                    <h2 className='text-center'>NewsMonk - Top {this.capitalizeFirstLetter(this.props.category)} Headlines.</h2>
                    {this.state.loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={this.state.loading && <Spinner />}
                    >
                        <div className='container'>
                            <div className="row">
                                {/* !this.state.loading &&*/} {this.state.articles.map((element) => {
                                    return <div className="col-md-4" key={element.url}>
                                        <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                        {/* <NewsItem title={element.title >= 40 ? element.title.slice(0, 45) : element.title} description={element.description >= 60 ? element.description.slice(0, 60) : element.description} imageUrl={element.urlToImage} newsUrl={element.url} /> */}
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
                {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div> */}
            </>
        )
    }
}

export default News