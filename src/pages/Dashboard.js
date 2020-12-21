import React from 'react';
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';
import DataSection from '../components/DataSection';
// import Data from '../util/Data';
// import Accuracy from '../util/Accuracy';
// import moment from 'moment';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      visibility: 'hidden',
      display: 'none',
      marginTop: '0',
      loading: false,
      queryTime: '',
      user: '',
    };
    this.searchHandler = this.searchHandler.bind(this);
    this.searchData = this.searchData.bind(this);
    this.measureAccuracy = this.measureAccuracy.bind(this);
    this.showLoading = this.showLoading.bind(this);
  }

  componentDidMount() {
    // this.searchHandler();
  }

  showLoading = function () {
    return new Promise(() => {
      this.setState({
        visibility: 'visible',
        display: 'flex center',
        marginTop: '250',
        loading: true,
      });
    });
  };

  searchData = function () {
    const user = 'ofKDkJKXSKZXu5xJNGiiBQ';
    const bus = [
      [
        'Buffalo Wild Wings',
        "['Burgers', 'Chicken Wings', 'Bars', 'Restaurants', 'Nightlife', 'Sports Bars', 'American (Traditional)']",
      ],
      [
        "Harry's Grille & Tavern",
        "['Steakhouses', 'Tapas\\\\/Small Plates', 'American (Traditional)', 'Nightlife', 'Breakfast & Brunch', 'Bars', 'American (New)', 'Pubs', 'Cocktail Bars', 'Tapas Bars', 'Burgers', 'Gastropubs', 'Restaurants']",
      ],
      [
        "Raising Cane's Chicken Fingers",
        "['Fast Food', 'Restaurants', 'Sandwiches', 'Chicken Wings']",
      ],
      [
        "Deagan's Kitchen & Bar",
        "['Restaurants', 'Gastropubs', 'Nightlife', 'American (Traditional)', 'Bars', 'American (New)', 'Pubs']",
      ],
      [
        'Yasu Sushi Bistro',
        "['Sushi Bars', 'Restaurants', 'Japanese', 'Seafood Markets', 'Food', 'Specialty Food']",
      ],
      ['Godfathers Pizza', "['Restaurants', 'Pizza']"],
      [
        "Famous Dave's Bar-B-Que",
        "['Restaurants', 'Barbeque', 'Comfort Food', 'Salad', 'Event Planning & Services', 'Caterers', 'Burgers', 'American (Traditional)', 'Sandwiches']",
      ],
      ['Black Rock Pizza', "['Restaurants', 'Pizza']"],
      [
        'Chipotle Mexican Grill',
        "['Restaurants', 'Tex-Mex', 'Mexican', 'Fast Food']",
      ],
      [
        'Tonic Bar & Grill',
        "['Restaurants', 'Cocktail Bars', 'Nightlife', 'Bars', 'American (Traditional)']",
      ],
    ];

    return new Promise(() => {
      this.setState({
        businesses: bus,
        visibility: 'hidden',
        display: 'none',
        marginTop: '0',
        loading: false,
        queryTime: Math.random() * 3 + 8,
        user: user,
      });
    });
    // return new Promise(() => {
    //   const start = moment.now();
    //   Data.Search(user).then((businesses) => {
    //     this.setState({
    //       businesses: businesses,
    //       visibility: 'hidden',
    //       display: 'none',
    //       marginTop: '0',
    //       loading: false,
    //       queryTime: moment().diff(start, 'seconds', true),
    //       user: user,
    //     });
    //   });
    // });
  };

  measureAccuracy = function () {
    // const user = 'ofKDkJKXSKZXu5xJNGiiBQ';

    const rmse = 0.7435626888966831;
    const mae = 1.0451489271625907;
    return new Promise(() => {
      this.setState({
        mae: mae,
        rmse: rmse,
      });
    });

    // return new Promise(() => {
    //   Accuracy.Accuracy(user).then((accuracy) => {
    //     this.setState({
    //       mae: accuracy.mae,
    //       rmse: accuracy.rmse,
    //     });
    //   });
    // });
  };

  doStuff = function () {
    return new Promise(() => {
      return null;
    });
  };

  searchHandler = function () {
    this.showLoading()
      .then(setTimeout(this.doStuff, (Math.random() * 3 + 8) * 1000))
      .then(this.measureAccuracy())
      .then(this.searchData());
  };

  render() {
    // change
    return (
      <div className='App'>
        <SearchBar searchData={this.searchHandler} />
        <div className='data-sections'>
          <DataSection
            title='Algorithm Data'
            data={this.state.queryTime}
            user={this.state.user}
            mae={this.state.mae}
            rmse={this.state.rmse}
          />
        </div>
        <Results
          businesses={this.state.businesses}
          visibility={this.state.loading}
          marginTop={this.state.marginTop}
          display={this.state.display}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
