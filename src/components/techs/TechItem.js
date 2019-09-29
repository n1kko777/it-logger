import React from "react";
import { connect } from "react-redux";
import { deleteTech } from "../../actions/techAction";
import M from "materialize-css/dist/js/materialize.min.js";

import PropTypes from "prop-types";

const TechItem = ({ tech, deleteTech }) => {
  const { firstName, lastName, id } = tech;

  const onDeleteTech = e => {
    e.preventDefault();

    deleteTech(id);
    M.toast({ html: `Пользователь ${firstName} ${lastName} удален!` });
  };

  return (
    <li className='collection-item'>
      <div>
        {firstName} {lastName}
        <a onClick={onDeleteTech} href='#!' className='secondary-content'>
          <i className='material-icons grey-text'>delete</i>
        </a>
      </div>
    </li>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteTech }
)(TechItem);
