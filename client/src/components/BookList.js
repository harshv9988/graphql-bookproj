import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";

import { getBooksQuery } from "../queries/queries";

import BookDetails from "./BookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  displayBooks() {
    const { data } = this.props;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map((book) => {
        return (
          <li
            key={book.id}
            onClick={(e) => {
              this.setState({ selected: book.id });
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

const newComponent = graphql(getBooksQuery)(BookList);

export default newComponent;
