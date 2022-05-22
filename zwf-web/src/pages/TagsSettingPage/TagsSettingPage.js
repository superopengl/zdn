import React from 'react';

import { TagListPanel } from 'components/TagListPanel';
import styled from 'styled-components';
import { deleteTag$, listTags$, saveTag$ } from 'services/tagService';
import { Card, PageHeader, Space } from 'antd';
import { tap } from 'rxjs/operators';
import { GlobalContext } from 'contexts/GlobalContext';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;


  .ant-spin-nested-loading {
    width: 100%;
  }

  // .ant-divider {
  //   margin: 20px 0 8px;
  // }
`;

const TagsSettingPage = () => {

  const handleLoadTaskTags = () => listTags$()

  return (
    <Container>
      <PageHeader 
      backIcon={false}
      title="Tag Management"
      >

          <TagListPanel
            onLoadList={handleLoadTaskTags}
            onSave={saveTag$}
            onDelete={deleteTag$}
            showColor={true}
            />
            </PageHeader>
    </Container>
  );
};

TagsSettingPage.propTypes = {};

TagsSettingPage.defaultProps = {};

export default TagsSettingPage;
