import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TechSelectOption from "../techs/TechSelectOption";

import M from "materialize-css/dist/js/materialize.min.js";

import { updateLog } from "../../actions/logActions";

const EditLogModal = ({ current, updateLog }) => {
  const ref = useRef();

  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
      ref.current.select();
    }
  }, [current]);

  const onSubmit = () => {
    if (message === "" || tech === "") {
      M.toast({ html: "Пожалуйста заполните все поля!" });
    } else {
      const updateLogItem = {
        id: current.id,
        message,
        tech,
        attention,
        date: new Date()
      };

      updateLog(updateLogItem);

      M.toast({ html: `Пользователь ${tech} только что обновил запись!` });

      // Clear fields
      setMessage("");
      setTech("");
      setAttention(false);
    }
  };
  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Редактировать сообщение</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              ref={ref}
              name='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <label htmlFor='message' className='active'>
              Текст сообщения
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <select
              name='tech'
              value={tech}
              className='browser-default'
              onChange={e => setTech(e.target.value)}
            >
              <option value='' disabled>
                Выберите специалиста
              </option>
              <TechSelectOption />
            </select>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  value={attention}
                  onChange={e => setAttention(!attention)}
                />
                <span>Приоритетная</span>
              </label>
            </p>
          </div>
        </div>
      </div>

      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close blue waves-effect waves-green btn'
        >
          Изменить
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: "75%",
  height: "75%"
};

EditLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current: state.log.current
});

export default connect(
  mapStateToProps,
  { updateLog }
)(EditLogModal);
