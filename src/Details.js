import React from 'react';
import pet from '@frontendmasters/pet';
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    throw new Error("lol"); 
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }

    const { name, animal, location, description, media, breed } = this.state;
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

// change default export
export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props}/>
    </ErrorBoundary>
  )
}
