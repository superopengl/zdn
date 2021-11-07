import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Space } from 'antd';
import {isEqual} from 'lodash';
import styled from 'styled-components';
import { getFileMeta, getFileMetaList, getPublicFileUrl } from 'services/fileService';
import { FileIcon } from './FileIcon';
import { saveAs } from 'file-saver';
import { AiOutlineUpload } from 'react-icons/ai';
import { Badge } from 'antd';
import { Popover } from 'antd';
import { TimeAgo } from './TimeAgo';
import { Typography, Button, Form, Input, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { UserAvatar } from './UserAvatar';

const { Dragger } = Upload;
const { Text } = Typography;

const Container = styled.div`
cursor: pointer;
position: relative;
padding: 8px;

.edit-text {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 9999999px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.1);
  color: rgba(255,255,255,0.75);
}

&:hover {
  .edit-text {
    background-color: rgba(0,0,0,0.3);
    color: rgba(255,255,255,0.85);
  }
}
`;



export const UserNameLabel = React.memo((props) => {
  const {userId, profile} = props;
  const { avatarFileId, email, givenName, surname, role } = profile;

  const name = `${givenName || ''} ${surname || ''}`.trim();

  return (
    <Space>
      <UserAvatar size={40} value={avatarFileId} userId={userId} givenName={givenName} surname={surname} />
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Text type={!role ? 'success' : null}><big>{name || email}</big></Text>
        <Text type="secondary">{email}</Text>
      </div>
    </Space>
  );
}, (prevProps, nextProps) => {
  const same = isEqual(prevProps, nextProps);
  return same;
});

UserNameLabel.propTypes = {
  userId: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    avatarFileId: PropTypes.string,
    email: PropTypes.string,
    givenName: PropTypes.string,
    surname: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

UserNameLabel.defaultProps = {
};
