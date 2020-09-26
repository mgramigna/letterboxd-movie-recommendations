import { Dialog, DialogTitle, Grid, IconButton, Typography } from '@material-ui/core';
import { Launch } from '@material-ui/icons';
import React from 'react';
import { Movie } from '../../types/tmdb';

interface Props {
  open: boolean;
  movie: Movie;
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
}

const DetailsModal = ({ movie, open, onClose }: Props) => {
  const releaseYear = new Date(movie.release_date).getFullYear();

  return (
    <Dialog open={open} onClose={onClose}>
      <Grid container direction="column" justify="center" alignItems="center" style={{ padding: '12px' }}>
        <Grid item xs>
          <DialogTitle>
            {`${movie.title} (${releaseYear})`}{' '}
            <IconButton href={`https://themoviedb.org/movie/${movie.id}`} rel="noopener noreferrer" target="_blank">
              <Launch />
            </IconButton>
          </DialogTitle>
        </Grid>
        <Grid item xs={12}>
          <img
            style={{ width: '100%' }}
            alt={`${movie.title}-poster`}
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{movie.overview}</Typography>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default DetailsModal;
