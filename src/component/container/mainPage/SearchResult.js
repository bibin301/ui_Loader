import React, { Component } from "react";
import ResultFilter from "../ResultFilter";
import HotelContent from "../hotel/HotelContent";

class SearchResult extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="sectionCard d-flex flex-row justify-content-center">
          <ResultFilter />
          <div className="flex-column filterResult">
            <HotelContent/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchResult;
