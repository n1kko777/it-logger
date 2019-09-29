import React, { useEffect } from "react";
import TechItem from "./TechItem";
import { connect } from "react-redux";
import { getTechs } from "../../actions/techAction";
import PropTypes from "prop-types";

const TecListModal = ({ tech: { techs, loading }, getTechs }) => {
  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  return (
    <div id='tech-list-modal' className='modal'>
      <div className='modal-content'>
        <h4>Саисок специалистов</h4>
        <ul className='collection'>
          {!loading && techs !== null ? (
            techs.map(tech => <TechItem key={tech.id} tech={tech} />)
          ) : (
            <p className='center'>Список пользователей пуст.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

TecListModal.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tech: state.tech
});

export default connect(
  mapStateToProps,
  { getTechs }
)(TecListModal);
