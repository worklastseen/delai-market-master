import gql from "graphql-tag";
const QUERY = gql`
  query data {
    blanks(orderBy: position_ASC) {
      colors
      description
      name
      price
      id
      createdAt
      sizes
      thickness
      min_amount
      soldout
      image {
        color
        url
      }
    }
    printings(orderBy: position_ASC) {
      name
      description
      selected
    }
    questions(orderBy: position_ASC) {
      question
      answer
    }
    legals {
      text {
        html
      }
    }
    overloads {
      overload
      caption
    }
  }
`;
export default QUERY;
