import React from "react";
import Typography from "@material-ui/core/Typography";
import "./Details.css";
import YouTube from "react-youtube";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Link } from "react-router-dom";

const Details = (props) => {
  const id = props.location.state.moviedetails;

  const [poster, setPoster] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [genres, setGenres] = React.useState([]);
  const [duration, setDuration] = React.useState("");
  const [releaseDate, setReleaseDate] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [plot, setPlot] = React.useState("");
  const [wiki, setWiki] = React.useState("");
  const [trailer, setTrailer] = React.useState("");
  const [artists, setArtists] = React.useState([]);

  const [starColor, setStarColor] = React.useState([
    "nocolorStar",
    "nocolorStar",
    "nocolorStar",
    "nocolorStar",
    "nocolorStar",
  ]);

  const changeStarColorHandler = (event) => {
    var state = parseInt(event.target.id);
    var starTemp = [];
    for (let i = 0; i < starColor.length; i++) {
      i <= state ? starTemp.push("colorStar") : starTemp.push("nocolorStar");
    }
    setStarColor(starTemp);
  };
  const getYouTubeVideoId = (url) => {
    const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return undefined !== arr[2] ? arr[2].split(/[^\w-]/i)[0] : arr[0];
  };

  React.useEffect(() => {
    props.headerCall();
  }, []);

  React.useEffect(() => {
    const getMoviesData = async () => {
      try {
        const res = await fetch(`http://localhost:8085/api/v1/movies/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json;charset=UTF-8",
          },
        });
        var data = await res.json();

        if (res.ok) {
          setPoster(data.poster_url);
          setTitle(data.title);
          setGenres(data.genres);
          setDuration(data.duration);
          setReleaseDate(data.release_date);
          setRating(data.rating);
          setPlot(data.storyline);
          setWiki(data.wiki_url);
          setTrailer(data.trailer_url);
          setArtists(data.artists);
        } else {
          const error = new Error();
          error.message = error.message ? error.message : "something happened";
          throw error;
        }
      } catch (error) {}
      return {};
    };
    getMoviesData();
  }, []);
  return (
    <div>
      <div style={{ marginTop: 8, marginLeft: 24, marginBottom: 0 }}>
        <Link to="/">
          <Typography className="backToHome" variant="subtitle1">
            {"< "}Back to home
          </Typography>
        </Link>
      </div>
      <div className="maincontainer">
        <div className="leftSide">
          <img src={poster} className="leftImage" alt={title} />
        </div>
        <div className="middleSide">
          <Typography
            style={{ fontWeight: "bold" }}
            variant="headline"
            component="h2"
          >
            {title}
          </Typography>

          <Typography
            inline
            style={{ fontWeight: "bold" }}
            variant="subtitle1"
            component="h6"
          >
            Genre:
          </Typography>
          <span>&nbsp;</span>
          <Typography inline variant="subtitle1">
            {genres.toString()}
          </Typography>
          <br></br>

          <Typography
            inline
            style={{ fontWeight: "bold" }}
            variant="subtitle1"
            component="h6"
          >
            Duration:
          </Typography>
          <span>&nbsp;</span>
          <Typography inline variant="subtitle1">
            {duration}
          </Typography>
          <br></br>

          <Typography
            inline
            style={{ fontWeight: "bold" }}
            variant="subtitle1"
            component="h6"
          >
            Release Date:
          </Typography>
          <span>&nbsp;</span>
          <Typography inline variant="subtitle1">
            {releaseDate}
          </Typography>
          <br></br>

          <Typography
            inline
            style={{ fontWeight: "bold" }}
            variant="subtitle1"
            component="h6"
          >
            Rating:
          </Typography>
          <span>&nbsp;</span>
          <Typography inline variant="subtitle1">
            {rating}
          </Typography>
          <div style={{ marginTop: 16 }}>
            <Typography
              inline
              style={{ marginTop: 16, fontWeight: "bold" }}
              variant="subtitle1"
              component="h6"
            >
              Plot:
            </Typography>
            <span>&nbsp;</span>
            <Typography inline variant="subtitle1">
              <a href={wiki} alt="Wiki">
                (wiki Link){" "}
              </a>
              {plot}
            </Typography>
          </div>
          <div style={{ marginTop: 16 }}>
            <Typography
              style={{ fontWeight: "bold" }}
              variant="subtitle1"
              component="h6"
            >
              Trailer:
            </Typography>
            <YouTube
              opts={{ width: "100%" }}
              videoId={getYouTubeVideoId(trailer)}
            ></YouTube>
          </div>
        </div>
        <div className="rightSide">
          <Typography
            style={{ fontWeight: "bold" }}
            variant="subtitle1"
            component="h6"
          >
            Rate this movie:
          </Typography>
          <StarBorderIcon
            id={0}
            className={starColor[0]}
            onClick={changeStarColorHandler}
          >
            {" "}
          </StarBorderIcon>
          <StarBorderIcon
            id={1}
            className={starColor[1]}
            onClick={changeStarColorHandler}
          >
            {" "}
          </StarBorderIcon>
          <StarBorderIcon
            id={2}
            className={starColor[2]}
            onClick={changeStarColorHandler}
          >
            {" "}
          </StarBorderIcon>
          <StarBorderIcon
            id={3}
            className={starColor[3]}
            onClick={changeStarColorHandler}
          >
            {" "}
          </StarBorderIcon>
          <StarBorderIcon
            id={4}
            className={starColor[4]}
            onClick={changeStarColorHandler}
          >
            {" "}
          </StarBorderIcon>
          <div style={{ marginTop: 16, marginBottom: 16 }}>
            <Typography
              style={{ fontWeight: "bold" }}
              variant="subtitle1"
              component="h6"
            >
              Artists:
            </Typography>
          </div>
          <div>
            <GridList className="grid" cellHeight={200} cols={2}>
              {artists.map((art) => (
                <GridListTile key={art.first_name} cols={1}>
                  <img
                    src={art.profile_url}
                    key={art.first_name}
                    id="rightImage"
                    alt={art.first_name}
                  />
                  <GridListTileBar
                    title={art.first_name + " " + art.last_name}
                    className="gridTitle"
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
