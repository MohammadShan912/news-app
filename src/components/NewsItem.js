import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <>

                <div className="card my-3" style={{}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        left: 7,
                        top: 7,
                    }}>
                        <span class="badge rounded-pill bg-danger"> {source} </span>
                    </div>
                    {/* <img src={imageUrl ? imageUrl : "https://images.squarespace-cdn.com/content/v1/57825361440243db4a4b7830/1649913264568-A7741UOKA32H9W53N2WZ/yck5pgoudbuw_sjiz62z2u8nta-06bkv_66gcq_byom.jpeg"} className="card-img-top" alt="" /> */}
                    <img style={{ width: 'auto', height: '200px' }} src={imageUrl ? imageUrl : "https://t3.ftcdn.net/jpg/01/89/84/58/360_F_189845840_KapEzJ8uhqxQ8vH2bYi714ZpfaKbPmYZ.jpg"} className="card-img-top" alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{!description ? 'To know more about the article follow the link to article.' : description}...</p>
                        <p className="card-text"><small className="text-body-secondary">by {!author ? 'Unknown' : author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-primary">Read Article</a>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem