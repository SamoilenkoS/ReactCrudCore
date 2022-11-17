import React, { Component } from "react";
import GoodsService from "../services/goods.service";
import { withRouter } from '../common/with-router';

class Good extends Component {
  constructor(props) {
    super(props);
    this.GetGoodById = this.GetGoodById.bind(this);
    this.updateGood = this.updateGood.bind(this);
    this.deleteGood = this.deleteGood.bind(this);
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

  async componentDidMount() {
   await this.GetGoodById(this.props.router.params.id);
  }

  async GetGoodById(id) {
    console.log(id);
    let response = await GoodsService.getById(id);
    this.setState(
    {
        currentGood: response.data
    });
    console.log(response.data);
  }

  async updateGood() {
    console.log('updating');
    let response = await GoodsService.update(
      this.state.currentGood.id,
      this.state.currentGood);

    console.log(response.data);
    this.setState({
          message: "The tutorial was updated successfully!"
        });
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

  deleteGood() {    
    GoodsService.deleteById(this.state.currentGood.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/goods');
      })
      .catch(e => {
        console.log(e);
      });
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
              onClick={()=>this.deleteGood()}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={async()=>await this.updateGood()}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Good);