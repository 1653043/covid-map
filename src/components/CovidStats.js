import React, {useEffect, useState} from 'react';

const CovidStats = (props) => {
  const [VNStats, setVNStats] = useState([]);
  const [WorldStats, setWorldStats] = useState([]);

  useEffect(() => {
    fetch("https://td.fpt.ai/corona/corona-chart-vn.json")
      .then(res => res.json())  
      .then((result) => {
        setVNStats(result.data);
      });

    fetch("https://td.fpt.ai/corona/corona-total.json")
      .then(res => res.json())
      .then((result) => {
        setWorldStats(result.data);
      });
  });
}

export default CovidStats;