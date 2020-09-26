import React from 'react';
import { Divider, Grid, Tooltip, Typography } from '@material-ui/core';
import { APIResult, Movie } from '../../types/tmdb';

interface Props {
  results: APIResult;
}

const Results = ({ results }: Props) => {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h3">Most Common Recommendations</Typography>
        </Grid>
        <Grid item container direction="row" spacing={2}>
          {results.common.map(movie => (
            <Grid item key={movie.id} xs>
              <Typography variant="h5">{movie.title}</Typography>
              <a href={`https://themoviedb.org/movie/${movie.id}`} rel="noopener noreferrer" target="_blank">
                <img alt={`${movie.title}-poster`} src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`} />
              </a>
              <Typography variant="body1">{movie.overview}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Divider />
      {results.recommendations.map(rec => (
        <Grid item key={rec.movie.id}>
          <Typography variant="h5">
            Based on {rec.movie.title}
            {rec.movie.rating ? ` (${rec.movie.rating})` : ''}
          </Typography>
          <Grid container direction="row" justify="center" alignItems="center">
            {rec.recommendations.map((m: Movie) => (
              <Grid item key={m.id} xs>
                <Tooltip title={m.title} placement="right">
                  <a href={`https://themoviedb.org/movie/${m.id}`} rel="noopener noreferrer" target="_blank">
                    <img key={m.id} alt={`${m.title}-poster`} src={`https://image.tmdb.org/t/p/w154${m.poster_path}`} />
                  </a>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default Results;
