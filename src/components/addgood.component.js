import React, { Component } from "react";
import GoodsService from "../services/goods.service";
import { withRouter } from '../common/with-router';

class AddGood extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);

    this.state = {
      currentGood: {
        id: null,
        title: "",
        price: "",
        category: "",
        description: ""
      },
      message: ""
    };
  }

  async createGood(){
    await GoodsService.Create(this.state.currentGood);
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentGood: {
        ...prevState.currentGood,
        description: description
      }
    }));
  }


  render() {
    const { currentGood } = this.state;

    return (
      <div>
        {(
          <div className="edit-form">
            <h4>Good</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentGood.title}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={currentGood.price}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  value={currentGood.category}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentGood.description}
                  onChange={this.onChangeDescription}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={()=>this.createGood()}
            >
              Create
            </button>

            <p>{this.state.message}</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(AddGood);