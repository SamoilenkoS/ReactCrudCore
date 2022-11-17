import React, { Component } from "react";

import { Routes, Route, Link } from "react-router-dom";
import GoodsService from "../services/goods.service";

export default class Goods extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    GoodsService.GetAll().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
          {this.state.content.map((x) => 
          <div>
            <div>Title:{x.title} Description:{x.description}</div>
            <button onClick=
            {
              () => 
              {
                GoodsService.deleteById(x.id)
                window.location.reload()
              }
            }>Delete</button>
            <button><Link
                to={"/goods/" + x.id}
                className="badge badge-warning"
              >
                Update
              </Link>
              </button>
          </div>
          )}
           <button><Link
                to={"/goods/create"}
                className="badge badge-warning"
              >
                Create
              </Link>
              </button>
      </div>
    );
  }
}