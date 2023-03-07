import * as React from "react";
import dayjs from "dayjs";
import Paper from "@mui/material/Paper";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { scaleBand } from "@devexpress/dx-chart-core";
import {
  ArgumentScale,
  Animation,
  EventTracker,
} from "@devexpress/dx-react-chart";

export default function TransactionChart({ data }) {
  const charData = data.map((item) => {
    item.month = dayjs()
      .month(item._id - 1)
      .format("MMMM");
    return item;
  });

  return (
    <Paper sx={{ marginTop: 5 }}>
      <Chart data={charData}>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries valueField="totalExpenses" argumentField="month" />
        <Animation />
        <EventTracker />
        <Tooltip />
      </Chart>
    </Paper>
  );
}
