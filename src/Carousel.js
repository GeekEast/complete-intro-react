import React from 'react';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      active: 0,
    };
    this.handleIndexClick = this.handleIndexClick.bind(this);
  }

  handleIndexClick(event) {
    this.setState({
      active: +event.target.dataset.index,
    });
  }

  // 渲染前的数据处理适用于props -> state
  static getDerivedStateFromProps({ media }) {
    let photos = ['http://placecorgi.com/600/600'];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={index === active ? 'active' : ''}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
