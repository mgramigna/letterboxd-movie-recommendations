import React, { useCallback, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import _ from 'lodash';
import FileUpload from './components/FileUpload';
import { APIResult, Movie } from './types/tmdb';
import { parseData } from './util/csv';
import TMBD from './util/tmdb';
import Results from './components/Results';
import { Button, CircularProgress, Grid, IconButton, Slider, Tooltip, Typography } from '@material-ui/core';
import { Help } from '@material-ui/icons';
import styled from 'styled-components';
import DetailsModal from './components/DetailsModal';

const CSVDownloadLink = styled(CSVLink)`
  text-decoration: none;
  color: inherit;
`;

interface ModalState {
  isOpen: boolean;
  movie: Movie | null;
}

const App = () => {
  const [file, setFile] = useState<string | null>(null);
  const [csvData, setCSVData] = useState<string | null>(null);
  const [results, setResults] = useState<APIResult | null>(null);
  const [csvExport, setCSVExport] = useState<string[][]>([[]]);
  const [enableCSVDownload, setEnableCSVDownload] = useState<boolean>(false);
  const [ratingRange, setRatingRange] = useState<number[]>([4.5, 5.0]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalState, setModalState] = useState<ModalState>({ isOpen: false, movie: null });

  // Parse CSV content as text and set state accordingly
  const onDrop = useCallback(files => {
    const csv = files[0];
    setFile(csv.name);
    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setCSVData(reader.result as string);
    };
    reader.readAsText(csv);
  }, []);

  useEffect(() => {
    async function getData() {
      if (csvData !== null) {
        const csvJson = await parseData(csvData, ratingRange);
        const tmdb = new TMBD(csvJson);
        const apiResults = await tmdb.getRecommendations();

        setResults(apiResults);
        setLoading(false);

        // Flatten and dedupe recommendations for CSV export
        const recs = apiResults.recommendations.map(r => r.recommendations);
        const uniqueRecs = _.uniqBy(_.flatten(recs), (m: Movie) => m.id);

        const updatedCSVExport = uniqueRecs.map(m => {
          return [m.release_date, m.title];
        });

        updatedCSVExport.unshift(['Date', 'Name']);
        setCSVExport(updatedCSVExport);
        setEnableCSVDownload(true);
      }
    }
    getData();
  }, [csvData, ratingRange]);

  const clear = () => {
    setFile(null);
    setResults(null);
    setCSVData(null);
    setEnableCSVDownload(false);
    setCSVExport([[]]);
  };

  const openModal = (movie: Movie) => {
    setModalState({ isOpen: true, movie });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, movie: null });
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center" style={{ padding: '12px' }}>
      {modalState.movie !== null && (
        <DetailsModal open={modalState.isOpen} movie={modalState.movie} onClose={closeModal} />
      )}
      {file === null && <FileUpload onDrop={onDrop} />}
      <Grid item xs={12}>
        <Typography gutterBottom>
          Valid Rating Range (Your Ratings){' '}
          <Tooltip title="Set the min/max rating value to be considered for recommendations">
            <IconButton>
              <Help />
            </IconButton>
          </Tooltip>
        </Typography>
        <Slider
          value={ratingRange}
          valueLabelDisplay="auto"
          step={0.5}
          marks
          min={0.5}
          max={5.0}
          onChange={(e: any, newValue: number | number[]) => {
            setRatingRange(newValue as number[]);
          }}
          disabled={file !== null}
        />
      </Grid>
      <Grid item>
        <Button onClick={clear}>clear</Button>
      </Grid>
      <Grid item>
        <Button disabled={!enableCSVDownload}>
          <CSVDownloadLink filename="letterboxd-movie-recommendations.csv" data={csvExport}>
            Download Results CSV
          </CSVDownloadLink>
        </Button>
      </Grid>
      <Grid item xs={12}>
        <ol>
          <li>
            <Typography variant="subtitle1">
              Go to <a href="https://letterboxd.com/settings/data">letterboxd.com/settings/data</a> and click "Export
              your data"
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">Upload "ratings.csv" by clicking the "Upload" box above</Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              Page will populate with recommendations based on your Letterboxd ratings!
            </Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              You can download a CSV of all the recommended films and import them into a Letterboxd list or watchlist
            </Typography>
          </li>
        </ol>
      </Grid>
      {results && <Results results={results} openModal={openModal} />}
      {loading && <CircularProgress />}
    </Grid>
  );
};

export default App;
