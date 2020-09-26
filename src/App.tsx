import React, { useCallback, useEffect, useState } from 'react';
import FileUpload from './components/FileUpload';
import { APIResult } from './types/tmdb';
import { parseData } from './util/csv';
import TMBD from './util/tmdb';
import Results from './components/Results';
import { Button, Grid, Typography } from '@material-ui/core';

const App = () => {
  const [file, setFile] = useState<string | null>(null);
  const [csvData, setCSVData] = useState<string | null>(null);
  const [results, setResults] = useState<APIResult | null>(null);

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
        console.log(apiResults);
        setResults(apiResults);
      }
    }
    getData();
  }, [csvData]);

  const clear = () => {
    setFile(null);
    setResults(null);
    setCSVData(null);
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {file === null && <FileUpload onDrop={onDrop} />}
      <Grid item>
        <Button onClick={clear}>clear</Button>
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
            <Typography variant="subtitle1">Upload "ratings.csv" by clicking the "Upload" button below</Typography>
          </li>
          <li>
            <Typography variant="subtitle1">
              Page will populate with recommendations based on your Letterboxd ratings!
            </Typography>
          </li>
        </ol>
      </Grid>
      {results && <Results results={results} />}
    </Grid>
  );
};

export default App;
