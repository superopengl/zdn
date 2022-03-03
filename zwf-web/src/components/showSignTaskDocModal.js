import React from 'react';

import { Modal, Typography, Space } from 'antd';
import Icon from '@ant-design/icons';
import { DocTemplatePreviewPanel } from 'components/DocTemplatePreviewPanel';
import { DocTemplateIcon } from './entityIcon';
import { FaFileSignature, FaSignature } from 'react-icons/fa';

const {Paragraph} = Typography;

export function showSignTaskDocModal(taskDoc, options = {}) {
  if (!taskDoc) {
    throw new Error('taskDoc is null');
  }
  const { onClose, allowTest, varBag, type } = options;
  const modalRef = Modal.info({
    title: <><DocTemplateIcon />{taskDoc.name}</>,
    content: <>
    <Paragraph>
      Please view and sign the document. Click below file to download or open it before signing.
    </Paragraph>
  
    </>,
    afterClose: () => {
      onClose?.();
    },
    icon: <Icon component={() => <FaFileSignature />} />,
    closable: true,
    maskClosable: true,
    destroyOnClose: true,
    footer: null,
    width: 700,
    style: { top: 20 },
    okButtonProps: {
      style: {
        display: 'none'
      }
    }
  });
  return modalRef;
}
