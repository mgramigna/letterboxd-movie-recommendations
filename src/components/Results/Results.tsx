import React from 'react';
import { Divider, Grid, Tooltip, Typography } from '@material-ui/core';
import { APIResult, Movie } from '../../types/tmdb';

interface Props {
  results: APIResult;
}

const Results = ({ results }: Props) => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3">Most Common Recommendations</Typography>
      </Grid>
      {results.common.map(movie => (
        <Grid container key={movie.id} direction="row" justify="center">
          <Grid item xs={3}>
            <a href={`https://themoviedb.org/movie/${movie.id}`} rel="noopener noreferrer" target="_blank">
              <img alt={`${movie.title}-poster`} src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`} />
            </a>
          </Grid>
          <Grid item xs>
            <Typography variant="h5">{movie.title}</Typography>
            <Typography variant="body1">{movie.overview}</Typography>
          </Grid>
        </Grid>
      ))}
      <Grid container direction="row">
        <Grid item xs={2}>
          <Typography variant="h3">Movie</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h3">Recommended Movies</Typography>
        </Grid>
      </Grid>
      {results.recommendations.map(rec => (
        <Grid item key={rec.movie.id}>
          <Grid container direction="row">
            <Grid item xs={2}>
              <Tooltip title={rec.movie.title} placement="right">
                <a href={`https://themoviedb.org/movie/${rec.movie.id}`} rel="noopener noreferrer" target="_blank">
                  <img
                    alt={`${rec.movie.title}-poster`}
                    src={`https://image.tmdb.org/t/p/w154${rec.movie.poster_path}`}
                  />
                </a>
              </Tooltip>
              <Divider orientation="vertical" variant="middle" />
            </Grid>
            <Grid item xs>
              <Grid container direction="row">
                {rec.recommendations.map((m: Movie) => (
                  <Grid item key={m.id} xs={2}>
                    <Tooltip title={m.title} placement="right">
                      <a href={`https://themoviedb.org/movie/${m.id}`} rel="noopener noreferrer" target="_blank">
                        <img
                          key={m.id}
                          alt={`${m.title}-poster`}
                          src={`https://image.tmdb.org/t/p/w154${m.poster_path}`}
                        />
                      </a>
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Results;
