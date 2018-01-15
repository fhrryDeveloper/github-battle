import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Battle.css";
import PlayerPreview from "../PlayerPreview/PlayerPreview";

class PlayerInput extends React.Component {
  constructor() {
    super();
    this.state = {
      username: ""
    };
  }

  handleChange = event => {
    const value = event.target.value;
    this.setState(() => {
      return {
        username: value
      };
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.props.id, this.state.username);
  };

  render() {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {this.props.label}
        </label>
        <input
          id="username"
          placeholder="github username"
          type="text"
          value={this.state.username}
          autoComplete="off"
          onChange={this.handleChange}
        />
        <button
          className="button"
          type="submit"
          disabled={!this.state.username}
        >
          Submit
        </button>
      </form>
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

PlayerInput.defaultProps = {
  label: "Username"
};

class Battle extends React.Component {
  constructor() {
    super();
    this.state = {
      playerOneName: "",
      playerTwoName: "",
      playerOneImage: null,
      playerTwoImage: null
    };
  }

  handleSubmit = (id, username) => {
    this.setState(() => {
      const newState = {};
      newState[id + "Name"] = username;
      newState[id + "Image"] =
        "https://github.com/" + username + ".png?size=200";
      return newState;
    });
  };

  handleReset = id => {
    this.setState(() => {
      const newState = {};
      newState[`${id}Name`] = "";
      newState[`${id}Image`] = null;
      return newState;
    });
  };

  render() {
    const playerOneName = this.state.playerOneName;
    const playerTwoName = this.state.playerTwoName;
    const playerOneImage = this.state.playerOneImage;
    const playerTwoImage = this.state.playerTwoImage;
    const match = this.props.match;

    return (
      <div>
        <div className="row">
          {!playerOneName && (
            <PlayerInput
              id="playerOne"
              label="Player One"
              onSubmit={this.handleSubmit}
            />
          )}

          {playerOneImage && (
            <PlayerPreview avatar={playerOneImage} username={playerOneName}>
              <button className="reset" onClick={this.handleReset.bind(null, "playerOne")}>
                Reset
              </button>
            </PlayerPreview>
          )}

          {!playerTwoName && (
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={this.handleSubmit}
            />
          )}

          {playerTwoImage && (
            <PlayerPreview avatar={playerTwoImage} username={playerTwoName}>
              <button className="reset" onClick={this.handleReset.bind(null, "playerTwo")}>
                Reset
              </button>
            </PlayerPreview>
          )}
        </div>
        {playerOneImage &&
          playerTwoImage && (
            <Link
              className="button"
              to={{
                pathname: `${match.url}/results`,
                search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
              }}
            >
              Battle
            </Link>
          )}
      </div>
    );
  }
}

export default Battle;
