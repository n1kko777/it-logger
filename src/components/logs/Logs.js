import React, { useEffect } from "react";
import { connect } from "react-redux";
import Preloader from "../layout/Preloader";
import LogItem from "./LogItem";
import PropTypes from "prop-types";

import { getLogs } from "../../actions/logActions";

const Logs = ({ log: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (loading || logs === null) {
    return <Preloader />;
  }

  return (
    <div>
      <ul className='collection with-header'>
        <li className='collection-header'>
          <h4 className='center'>Системный журнал</h4>
        </li>

        {!loading && logs.length === 0 ? (
          <p className='center'>Системный журнал пуст.</p>
        ) : (
          logs.map(log => <LogItem key={log.id} log={log} />)
        )}
      </ul>
    </div>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(
  mapStateToProps,
  { getLogs }
)(Logs);
