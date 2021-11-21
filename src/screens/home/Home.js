import React from "react";
import "./Home.css";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Button, Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = (theme) => ({
  root: {
    margin: theme.spacing.unit,
    minWidth: 240,
    position: "absolute",
    right: 0,
    textAlign: "center",
  },
  heading: {
    color: theme.palette.primary.light,
  },
});

const Home = (props) => {
  var hideButton = props.hideButtonInHeader;

  const { classes } = props;

  React.useEffect(() => {
    hideButton();
  });

  const GridApp = () => {
    const [moviesData, setMoviesData] = React.useState([]);

    React.useEffect(() => {
      const getGridData = async () => {
        try {
          const res = await fetch(
            "http://localhost:8085/api/v1/movies?page=1&limit=17",
            {
              method: "GET",
              headers: {
                Accept: "application/json;charset=UTF-8",
              },
            }
          );
          var data = await res.json();

          if (res.ok) {
            const pub = data.movies.filter((data) => {
              if (data.status === "PUBLISHED") {
                return true;
              }
              return false;
            });
            setMoviesData(pub);
          } else {
            const error = new Error();
            error.message = error.message
              ? error.message
              : "something happened";
            throw error;
          }
        } catch (error) {
          alert(error);
        }
        return {};
      };
      getGridData();
    }, []);

    return (
      <div>
        <GridList
          className="grid"
          style={{ flexWrap: "nowrap" }}
          cellHeight={250}
          cols={6}
        >
          {moviesData.map((data) => (
            <GridListTile key={data.id} cols={1}>
              <img src={data.poster_url} alt={data.title} />
              <GridListTileBar title={data.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  };
  const GridRelease = () => {
    const [moviesReleaseData, setMoviesReleaseData] = React.useState([]);
    const [genresData, setGenresData] = React.useState([]);
    const [artistsData, setArtistsData] = React.useState([]);

    const [moveNameData, setMoveNameData] = React.useState("");
    const [releaseStartData, setReleaseStartData] = React.useState("");
    const [releaseEndData, setReleaseEndData] = React.useState("");
    const [artistsCheckBoxData, setArtistsCheckBoxData] = React.useState({});
    const [genresCheckBoxData, setGenresCheckBoxData] = React.useState({});

    const getReleasedData = async () => {
      try {
        const res = await fetch(
          "http://localhost:8085/api/v1/movies?page=1&limit=17",
          {
            method: "GET",
            headers: {
              Accept: "application/json;charset=UTF-8",
            },
          }
        );
        var data = await res.json();

        if (res.ok) {
          const rel = data.movies.filter((data) => {
            if (data.status === "RELEASED") {
              return true;
            }
            return false;
          });
          setMoviesReleaseData(rel);
        } else {
          const error = new Error();
          error.message = error.message ? error.message : "something happened";
          throw error;
        }
      } catch (error) {
        alert(error);
      }
      return {};
    };
    const getGenereData = async () => {
      try {
        const res = await fetch("http://localhost:8085/api/v1/genres", {
          method: "GET",
          headers: {
            Accept: "application/json;charset=UTF-8",
          },
        });
        var data = await res.json();

        if (res.ok) {
          setGenresData(data.genres);
        } else {
          const error = new Error();
          error.message = data.message ? data.message : "something happened";
          throw error;
        }
      } catch (error) {
        alert(error);
      }
      return {};
    };
    const getArtistsData = async () => {
      try {
        const res = await fetch(
          "http://localhost:8085/api/v1/artists?page=1&limit=20",
          {
            method: "GET",
            headers: {
              Accept: "application/json;charset=UTF-8",
            },
          }
        );
        var data = await res.json();

        if (res.ok) {
          setArtistsData(data.artists);
        } else {
          const error = new Error();
          error.message = data.message ? data.message : "something happened";
          throw error;
        }
      } catch (error) {
        alert(error);
      }
      return {};
    };

    React.useEffect(() => {
      const artistsObject = {};
      artistsData.forEach((data) => {
        artistsObject[data.first_name] = false;
      });
      setArtistsCheckBoxData({ ...artistsObject });
    }, [artistsData]);

    React.useEffect(() => {
      const genresObject = {};
      genresData.forEach((data) => {
        genresObject[data.genre] = false;
      });
      setGenresCheckBoxData({ ...genresObject });
    }, [genresData]);

    React.useEffect(() => {
      getReleasedData();
      getGenereData();
      getArtistsData();
    }, []);

    const onNameChange = (event) => {
      setMoveNameData(event.target.value);
    };
    const handleArtistCheckBoxChange = (event) => {
      const state = { ...artistsCheckBoxData };
      state[event.target.name] = event.target.checked;
      setArtistsCheckBoxData({ ...state });
    };
    const handleGenreCheckBoxChange = (event) => {
      const state = { ...genresCheckBoxData };
      state[event.target.name] = event.target.checked;
      setGenresCheckBoxData({ ...state });
    };
    const onReleaseStartChange = (event) => {
      setReleaseStartData(event.target.value);
    };
    const onReleaseEndChange = (event) => {
      setReleaseEndData(event.target.value);
    };
    const applyFiltersHandler = async () => {
      var movieFilter = [...moviesReleaseData];

      if (moveNameData.length > 0) {
        movieFilter = movieFilter.filter((data) => {
          if (data.title === moveNameData) {
            return true;
          }
          return false;
        });
      }
      const genresArray = [];
      for (let key in genresCheckBoxData) {
        if (genresCheckBoxData[key] === true) {
          genresArray.push(key);
        }
      }
      if (genresArray.length > 0) {
        let state = movieFilter.filter((data) => {
          for (let i of genresArray) {
            if (data.genres.includes(i)) {
              return true;
            }
          }
        });
        movieFilter = state;
      }

      const artistsArray = [];
      for (let key in artistsCheckBoxData) {
        if (artistsCheckBoxData[key] === true) {
          artistsArray.push(key);
        }
      }
      if (artistsArray.length > 0) {
        let state = movieFilter.filter((data) => {
          for (let i of artistsArray) {
            for (var artist of data.artists) {
              if (artist["first_name"] === i) {
                return true;
              }
            }
          }
        });
        movieFilter = state;
      }

      if (releaseStartData.length > 0) {
        movieFilter = movieFilter.filter((data) => {
          if (Date.parse(data.release_date) >= Date.parse(releaseStartData)) {
            return true;
          }
        });
      }
      if (releaseEndData.length > 0) {
        movieFilter = movieFilter.filter((data) => {
          if (Date.parse(data.release_date) <= Date.parse(releaseEndData)) {
            return true;
          }
        });
      }
      setMoviesReleaseData([...movieFilter]);
    };
    return (
      <div>
        <div className="flex-container">
          <div className="releaseGrid">
            <GridList className="grid" cellHeight={350} cols={4}>
              {moviesReleaseData.map((data) => (
                <GridListTile key={data.id} id="releasedImage" cols={1}>
                  <Link
                    to={{
                      pathname: `/movie/${data.id}`,
                      state: { moviedetails: data.id },
                    }}
                  >
                    <img
                      src={data.poster_url}
                      className="gridImage"
                      alt={data.title}
                    />
                  </Link>
                  <GridListTileBar
                    title={data.title}
                    className="gridTitle"
                    subtitle={<span>Release Date {data.release_date}</span>}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
          <div className="filter">
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  variant="headline"
                  className={classes.heading}
                  component="h2"
                >
                  FIND MOVIES BY:
                </Typography>
                <br />
                <FormControl className="formControl">
                  <InputLabel htmlFor="movieName">Movie Name</InputLabel>
                  <Input
                    id="movieName"
                    value={moveNameData}
                    onChange={onNameChange}
                  />
                </FormControl>
                <br />
                <br />
                <FormControl className="formControl">
                  <InputLabel htmlFor="genres">Genres</InputLabel>
                  <Select placeholder={"Genres"} value="">
                    {genresData.map((data) => (
                      <MenuItem key={data.id}>
                        <Checkbox
                          checked={genresCheckBoxData[data.genre]}
                          id={data.genre}
                          name={data.genre}
                          onChange={handleGenreCheckBoxChange}
                        />
                        <label htmlFor={data.genre}> {data.genre}</label>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br />
                <br />
                <FormControl className="formControl">
                  <InputLabel htmlFor="artists">Artists</InputLabel>
                  <Select placeholder={"Artists"} value="">
                    {artistsData.map((data) => (
                      <MenuItem key={data.id}>
                        <Checkbox
                          checked={artistsCheckBoxData[data.first_name]}
                          id={data.first_name}
                          name={data.first_name}
                          onChange={handleArtistCheckBoxChange}
                        />
                        <label htmlFor={data.first_name}>
                          {" "}
                          {data.first_name + " " + data.last_name}
                        </label>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br />
                <br />
                <FormControl className="formControl">
                  <InputLabel shrink={true} htmlFor="releaseStart">
                    Release Date Start
                  </InputLabel>
                  <br />
                  <TextField
                    id="releaseStart"
                    type="Date"
                    onChange={onReleaseStartChange}
                  />
                </FormControl>
                <br />
                <br />
                <FormControl className="formControl">
                  <InputLabel shrink={true} htmlFor="releaseEnd">
                    Release Date End
                  </InputLabel>
                  <br />
                  <TextField
                    id="releaseEnd"
                    type="Date"
                    onChange={onReleaseEndChange}
                  />
                </FormControl>
                <br />
                <br />
                <br />
                <Button
                  color="primary"
                  variant="contained"
                  onClick={applyFiltersHandler}
                >
                  APPLY
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="homeHeader">Upcoming Movies</div>
      <GridApp></GridApp>
      <GridRelease></GridRelease>
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
