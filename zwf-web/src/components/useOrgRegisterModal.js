import React from 'react';
import { Typography } from 'antd';
import { Modal } from 'antd';
import OrgSignUpForm from 'pages/Org/OrgSignUpForm';

const { Text, Paragraph } = Typography;

export const useOrgRegisterModal = () => {
  const [modalForm, formContextHolder] = Modal.useModal();
  const [modalSuccess, successContextHolder] = Modal.useModal();

  const open = ({ onOk, onCancel } = {}) => {
    const handleFinish = (email) => {
      formModalInstance.destroy();
      
      modalSuccess.success({
        title: '🎉 Successfully signed up!',
        content: <>
          <Paragraph>
            Thank you very much for signing up ZeeWorkflow. We will send out the registration to <Text strong>{email}</Text>.
          </Paragraph>
          <Paragraph>
            If you cannot receieve the verification email within 30 minutes, please check your spam box, whether the email address is valid, or if the email address has been registered in ZeeWorkflow before, in which case, you may use forgot password to find back your credential.
          </Paragraph>
        </>,
        maskClosable: true,
        closable: true,
        destroyOnClose: true,
      })
      onOk?.();
    }

    const formModalInstance = modalForm.info({
      icon: null,
      title: 'Org Registration',
      content: <OrgSignUpForm onOk={handleFinish} />,
      maskClosable: true,
      closable: true,
      footer: null,
      destroyOnClose: true,
      onOk,
      onCancel,
    })
  }

  return [open, <>
    <div>{formContextHolder}</div>
    <div>{successContextHolder}</div>
  </>];

};

