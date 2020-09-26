import React, { useCallback, useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import _ from 'lodash';
import FileUpload from './components/FileUpload';
import { APIResult, Movie } from './types/tmdb';
import { parseData } from './util/csv';
import TMBD from './util/tmdb';
import Results from './components/Results';
import { Button, Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';

const CSVDownloadLink = styled(CSVLink)`
  text-decoration: none;
  color: inherit;
`;

const App = () => {
  const [file, setFile] = useState<string | null>(null);
  const [csvData, setCSVData] = useState<string | null>(null);
  const [results, setResults] = useState<APIResult | null>(null);
  const [csvExport, setCSVExport] = useState<string[][]>([[]]);
  const [enableCSVDownload, setEnableCSVDownload] = useState<boolean>(false);

  const onDrop = useCallback(files => {
    const csv = files[0];
    setFile(csv.name);
    const reader = new FileReader();
    reader.onload = () => {
      setCSVData(reader.result as string);
    };
    reader.readAsText(csv);
  }, []);

  useEffect(() => {
    async function getData() {
      if (csvData !== null) {
        const csvJson = await parseData(csvData);
        const tmdb = new TMBD(csvJson);
        const apiResults = await tmdb.getRecommendations();
        setResults(apiResults);

        const recs = apiResults.recommendations.map(r => r.recommendations);

        const combined = apiResults.common.concat(_.flatten(recs));
        const uniqueCombined = _.uniqBy(combined, (m: Movie) => m.id);
        const updatedCSVExport = uniqueCombined.map(m => {
          return [m.release_date, m.title];
        });

        updatedCSVExport.unshift(['Date', 'Name']);
        setCSVExport(updatedCSVExport);
        setEnableCSVDownload(true);
      }
    }
    getData();
  }, [csvData]);

  const clear = () => {
    setFile(null);
    setResults(null);
    setCSVData(null);
    setEnableCSVDownload(false);
    setCSVExport([[]]);
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {file === null && <FileUpload onDrop={onDrop} />}
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
      {results && <Results results={results} />}
    </Grid>
  );
};

export default App;
