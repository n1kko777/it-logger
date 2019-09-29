import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTech } from "../../actions/techAction";
import M from "materialize-css/dist/js/materialize.min.js";

const AddTechModal = ({ addTech }) => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

  const onSubmit = () => {
    if (firstName === "" || lastName === "") {
      M.toast({ html: "Пожалуйста заполните все поля!" });
    } else {
      addTech({ firstName, lastName });
      M.toast({ html: `Пользователь ${firstName} ${lastName} добавлен!` });

      // Clear fields
      setFirstname("");
      setLastname("");
    }
  };
  return (
    <div id='add-tech-modal' className='modal'>
      <div className='modal-content'>
        <h4>Новый пользователь</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='firstname'
              value={firstName}
              onChange={e => setFirstname(e.target.value)}
            />
            <label htmlFor='firstname' className='active'>
              Имя
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='lastname'
              value={lastName}
              onChange={e => setLastname(e.target.value)}
            />
            <label htmlFor='lastname' className='active'>
              Фавилия
            </label>
          </div>
        </div>
      </div>

      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close blue waves-effect waves-green btn'
        >
          Добавить
        </a>
      </div>
    </div>
  );
};

AddTechModal.propTypes = {
  addTech: PropTypes.func.isRequired
};

export default connect(
  null,
  { addTech }
)(AddTechModal);
