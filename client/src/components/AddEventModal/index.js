import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

import AddEventForm from '../../containers/AddEventForm';
import './index.css';

const AddEventModal = ({ onClose, submitting, visible }) => (
  <Modal
    destroyOnClose
    footer={null}
    visible={visible}
    onCancel={onClose}
    confirmLoading={submitting}
    title="Adicionar Evento"
    wrapClassName="vertical-center-modal"
    cancelText="Cancelar"
    okText="Adicionar"
  >
    <AddEventForm />
  </Modal>
);

AddEventModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default AddEventModal;