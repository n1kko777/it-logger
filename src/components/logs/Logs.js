import React, { useState, useEffect } from "react";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLogs = async () => {
    setLoading(true);
    const res = await fetch("/logs");
    const data = await res.json();

    setLogs(data);
    setLoading(false);
  };

  useEffect(() => {
    getLogs();
    //   eslint-disable-next-line
  }, []);

  if (loading) {
    return <h4>Загрузка...</h4>;
  }

  return (
    <div>
      <ul className='collection-with-header'>
        <li className='collection-header'>
          <h4 className='center'>Системный журнал</h4>
        </li>

        {!loading && logs.length === 0 ? (
          <p>Системный журнал пуст.</p>
        ) : (
          logs.map(log => <li>{log.message}</li>)
        )}
      </ul>
    </div>
  );
};

export default Logs;
